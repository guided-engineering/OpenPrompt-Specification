// Aggregate the stored records into results/results.json and
// results/report.generated.md.
//
// What is compared is fixed by rule, not by outcome:
//   - one admissible observation per case and condition: the attempt stored at
//     runs/<condition>/<case>/ whose record is not marked inadmissible;
//   - an attempt whose oracle was repaired after it ran is inadmissible; its
//     original grade and the diagnostic replay are shown beside the comparison
//     and never enter it;
//   - a missing value is never a zero.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { STUDY, readJson, writeJson } from './lib.mjs';

const RESULTS = join(STUDY, 'results');
const CONDITIONS = ['WITHOUT_SKILLS', 'INITIAL_SKILLS', 'REFINED_SKILLS'];
// Label shown for the case that case.json calls "held-out". Its blinding could
// not be verified (amendments.md, "C5"), so it is not presented as a holdout.
const SPLIT_LABEL = { development: 'development', 'held-out': 'reserved regression' };

const cases = readdirSync(join(STUDY, 'cases'))
  .filter((c) => existsSync(join(STUDY, 'cases', c, 'case.json')))
  .map((c) => ({ dir: c, ...readJson(join(STUDY, 'cases', c, 'case.json')) }))
  .filter((c) => c.split !== 'infrastructure')
  .sort((a, b) => a.id.localeCompare(b.id));

/** Every stored attempt of a case under a condition, oldest first. */
function attemptsOf(condition, dir) {
  const base = join(RESULTS, 'runs', condition);
  if (!existsSync(base)) return [];
  return readdirSync(base)
    .filter((d) => d === dir || d.startsWith(`${dir}.attempt-`))
    .filter((d) => existsSync(join(base, d, 'record.json')))
    .map((d) => ({ location: `runs/${condition}/${d}`, current: d === dir, record: readJson(join(base, d, 'record.json')) }))
    .sort((a, b) => a.record.attempt - b.record.attempt);
}

const candidates = existsSync(join(RESULTS, 'candidates.json')) ? readJson(join(RESULTS, 'candidates.json')) : {};
const refined = Boolean(candidates.REFINED_SKILLS);
const retained = refined ? CONDITIONS : ['WITHOUT_SKILLS', 'INITIAL_SKILLS'];
const finalCondition = refined ? 'REFINED_SKILLS' : 'INITIAL_SKILLS';

const timeOf = (r) => r.metrics.durationMs ?? r.metrics.wallMs;
const tokensOf = (r) => r.metrics.tokens?.total ?? null;
const outputTokensOf = (r) => r.metrics.tokens?.output ?? null;

/** The admissible observation of a cell, or the reason there is none. */
function cell(condition, c) {
  const all = attemptsOf(condition, c.dir);
  const current = all.find((a) => a.current);
  if (!current) return { state: all.length ? 'RERUN_PENDING' : 'NOT_RUN' };
  const r = current.record;
  if (r.admissibleForFinalComparison === false) return { state: 'RERUN_PENDING', reason: r.inadmissibleReason };
  if (r.status === 'NOT_SCORED') return { state: 'NOT_SCORED', reason: r.statusReason, record: r, location: current.location };
  return { state: 'SCORED', status: r.status, raw: r.score.rawScore, effective: r.score.effectiveScore, passed: r.score.passed, hard: r.score.hardFailures.map((h) => h.code), record: r, location: current.location };
}
const table = Object.fromEntries(cases.map((c) => [c.id, Object.fromEntries(CONDITIONS.map((k) => [k, cell(k, c)]))]));

/** Attempts that do not enter the comparison, with their grades. */
const setAside = [];
for (const c of cases) for (const k of CONDITIONS) for (const a of attemptsOf(k, c.dir)) {
  const r = a.record;
  if (r.admissibleForFinalComparison !== false && r.status !== 'NOT_SCORED') continue;
  setAside.push({
    case: c.id, condition: k, attemptId: r.attemptId, location: a.location, status: r.status,
    reason: r.status === 'NOT_SCORED' ? r.statusReason : r.inadmissibleReason,
    originalGrade: r.score ? { raw: r.score.rawScore, effective: r.score.effectiveScore, failed: r.score.assertions.filter((x) => !x.pass).map((x) => x.id), oracle: r.scoring?.original?.oracleIdentity?.oracleSha256 ?? null } : null,
    diagnosticReplay: r.scoring?.diagnostic ? { raw: r.scoring.diagnostic.rawScore, effective: r.scoring.diagnostic.effectiveScore, failed: r.scoring.diagnostic.failed, oracle: r.scoring.diagnostic.oracleIdentity.oracleSha256 } : null,
  });
}

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
const median = (xs) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const round = (x, d = 1) => (x === null ? null : Math.round(x * 10 ** d) / 10 ** d);

/** Quality comparison of one set of cases between the baseline and a Skills condition. */
function compare(set, condition) {
  const pairs = set.map((c) => ({ id: c.id, base: table[c.id].WITHOUT_SKILLS, treat: table[c.id][condition] }));
  if (!set.length) return { cases: [], complete: false, verdict: 'inconclusive', why: 'no case in this set' };
  const complete = pairs.every((p) => p.base.state === 'SCORED' && p.treat.state === 'SCORED');
  if (!complete) {
    const missing = pairs.filter((p) => p.base.state !== 'SCORED' || p.treat.state !== 'SCORED').map((p) => `${p.id} (${p.base.state}/${p.treat.state})`);
    return { cases: set.map((c) => c.id), complete: false, verdict: 'inconclusive', why: `missing or unscored pairs: ${missing.join(', ')}` };
  }
  const deltas = pairs.map((p) => ({ id: p.id, baseline: p.base.effective, withSkills: p.treat.effective, delta: p.treat.effective - p.base.effective, rawDelta: p.treat.raw - p.base.raw }));
  const meanBaseline = mean(deltas.map((d) => d.baseline));
  const meanWith = mean(deltas.map((d) => d.withSkills));
  const worstLoss = Math.min(...deltas.map((d) => d.delta));
  const improved = meanWith - meanBaseline >= 10 && worstLoss >= -10;
  const headroom = 100 - meanBaseline;
  return {
    cases: set.map((c) => c.id), complete: true, deltas,
    meanBaseline: round(meanBaseline), meanWithSkills: round(meanWith), meanDelta: round(meanWith - meanBaseline), largestLoss: worstLoss < 0 ? -worstLoss : 0,
    headroom: round(headroom),
    verdict: improved ? 'supported' : 'unsupported',
    why: improved ? 'mean gain of at least 10 points and no case lost more than 10'
      : headroom < 10 ? `the baseline mean is ${round(meanBaseline)}, so a gain of 10 points was not possible on these cases; observed change ${round(meanWith - meanBaseline)}`
        : meanWith - meanBaseline < 10 ? `mean gain below 10 points (observed ${round(meanWith - meanBaseline)})` : 'a case lost more than 10 points',
  };
}

/** Median relative overhead of a metric over matched admissible pairs with observed values and a positive baseline. */
function overhead(metric, condition) {
  const eligible = [];
  for (const c of cases) {
    const b = table[c.id].WITHOUT_SKILLS;
    const t = table[c.id][condition];
    if (b.state !== 'SCORED' || t.state !== 'SCORED') continue;
    const bv = metric(b.record);
    const tv = metric(t.record);
    if (typeof bv !== 'number' || typeof tv !== 'number' || !(bv > 0)) continue;
    eligible.push({ id: c.id, baseline: bv, withSkills: tv, overhead: (tv - bv) / bv });
  }
  return { eligiblePairs: eligible.length, pairs: eligible.map((e) => ({ ...e, overhead: round(e.overhead, 3) })), medianOverhead: eligible.length ? round(median(eligible.map((e) => e.overhead)), 3) : null };
}

const byTrack = (track, split) => cases.filter((c) => c.track === track && (!split || c.split === split));
const quality = {};
const efficiency = {};
for (const condition of retained.filter((k) => k !== 'WITHOUT_SKILLS')) {
  quality[condition] = {
    authoring: compare(byTrack('authoring'), condition),
    execution: compare(byTrack('execution'), condition),
    executionDevelopmentOnly: compare(byTrack('execution', 'development'), condition),
    reservedRegression: compare(cases.filter((c) => c.split === 'held-out'), condition),
  };
  efficiency[condition] = { elapsedTime: overhead(timeOf, condition), tokensProcessed: overhead(tokensOf, condition), outputTokens: overhead(outputTokensOf, condition) };
}

// Hypotheses are judged on the final candidate, on admissible matched pairs only.
const fq = quality[finalCondition];
const fe = efficiency[finalCondition];
const anyGain = fq && ['authoring', 'execution'].some((t) => fq[t].verdict === 'supported');
let h3;
if (!fe || fe.elapsedTime.eligiblePairs < 3 || fe.tokensProcessed.eligiblePairs < 3) h3 = { verdict: 'inconclusive', why: 'fewer than three matched pairs have both time and token measurements' };
else if (!anyGain) h3 = { verdict: 'inconclusive', why: 'no quality gain reached the improvement threshold, so there is no gain whose cost could be judged; the measured overhead is reported as it is' };
else if (fe.elapsedTime.medianOverhead <= 0.5 && fe.tokensProcessed.medianOverhead <= 0.5) h3 = { verdict: 'supported', why: 'median overhead stayed within the 50% tolerance for elapsed time and for tokens; this is a tolerance, not a saving' };
else h3 = { verdict: 'unsupported', why: 'median overhead exceeds 50% for elapsed time or tokens; the gain is a tradeoff' };
const none = { verdict: 'inconclusive', why: 'no Skills condition has been run' };
const hypotheses = {
  H1: { statement: 'ops-author improves intent preservation, contract validity and actionable verification in authored prompts', ...(fq ? fq.authoring : none) },
  H2: { statement: 'ops-execute improves correct planning, scoped implementation and closure of the verify-repair loop', ...(fq ? fq.execution : none) },
  H3: { statement: 'any observed quality gain has an acceptable cost in time, tokens, tool calls and human intervention', ...h3 },
};

// Readiness of the final candidate.
const finals = cases.map((c) => table[c.id][finalCondition]);
const allScored = finals.every((f) => f.state === 'SCORED');
const readiness = {
  condition: finalCondition,
  complete: allScored,
  allCasesPass: allScored && finals.every((f) => f.passed),
  mean: allScored ? round(mean(finals.map((f) => f.effective))) : null,
  hardFailures: finals.filter((f) => f.state === 'SCORED').flatMap((f) => f.hard),
};
readiness.ready = readiness.complete && readiness.allCasesPass && readiness.mean >= 85 && readiness.hardFailures.length === 0;

// One ledger of everything that was attempted. Kinds that are evaluation
// attempts count against the ceiling; preparation is listed and counted apart,
// as the protocol classified it before the first scored run.
const EVALUATION = new Set(['scored-task', 'corrective-rerun', 'activation-probe', 'smoke-check', 'infrastructure-retry', 'model-regrading']);
const ledger = existsSync(join(RESULTS, 'attempts.jsonl'))
  ? readFileSync(join(RESULTS, 'attempts.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
  : [];
const byKind = {};
for (const a of ledger) byKind[a.kind] = (byKind[a.kind] ?? 0) + 1;
const evaluation = ledger.filter((a) => EVALUATION.has(a.kind));
const preparationAgentSessions = ledger.filter((a) => !EVALUATION.has(a.kind) && a.agentSession !== false);
const budget = {
  ceiling: refined ? 24 : 19,
  ceilingBasis: refined ? 'a refinement was made' : 'no refinement was made',
  evaluationAttempts: evaluation.length,
  evaluatedMinutes: round(evaluation.reduce((s, a) => s + (a.wallMs ?? 0), 0) / 60000),
  minuteLimit: 120,
  preparationAgentSessions: preparationAgentSessions.length,
  ifPreparationWereCounted: evaluation.length + preparationAgentSessions.length,
  byKind,
};

const probes = existsSync(join(RESULTS, 'probes', 'activation.json')) ? readJson(join(RESULTS, 'probes', 'activation.json')) : null;
const requiredCells = cases.flatMap((c) => retained.map((k) => table[c.id][k].state));
const studyComplete = requiredCells.every((s) => s === 'SCORED');
const results = {
  generatedAt: new Date().toISOString(),
  finalCondition, refined, retainedConditions: retained, studyComplete,
  cases: cases.map((c) => ({ id: c.id, dir: c.dir, title: c.title, complexity: c.complexity, split: c.split, splitLabel: SPLIT_LABEL[c.split] ?? c.split, track: c.track })),
  scores: Object.fromEntries(cases.map((c) => [c.id, Object.fromEntries(CONDITIONS.map((k) => {
    const x = table[c.id][k];
    return [k, x.state === 'SCORED' ? { state: x.state, status: x.status, attemptId: x.record.attemptId, raw: x.raw, effective: x.effective, passed: x.passed, hardFailures: x.hard,
      failedAssertions: x.record.score.assertions.filter((a) => !a.pass).map((a) => a.id), elapsedSeconds: round(timeOf(x.record) / 1000), tokensProcessed: tokensOf(x.record), outputTokens: outputTokensOf(x.record),
      toolCalls: x.record.metrics.toolCalls, skillsInvoked: x.record.skillsInvoked, oracleSha256: x.record.identities?.oracle?.oracleSha256 ?? x.record.scoring?.original?.oracleIdentity?.oracleSha256 ?? null,
      correctiveRerun: Boolean(x.record.correctiveRerun), record: `${x.location}/record.json` } : { state: x.state, reason: x.reason ?? null }];
  }))])),
  setAside, quality, efficiency, hypotheses, readiness, activationProbes: probes, budget, candidates, ledger,
};
writeJson(join(RESULTS, 'results.json'), results);

// ------------------------------------------------------------------ Markdown
const STATE = { NOT_RUN: 'not run', NOT_SCORED: 'not scored', RERUN_PENDING: 'rerun pending' };
const show = (x) => (x.state === 'SCORED' ? `${x.effective}${x.raw !== x.effective ? ` (raw ${x.raw})` : ''}${x.status === 'TIMEOUT' ? ' ⏱' : ''}${x.record.correctiveRerun ? ' ↻' : ''}` : STATE[x.state]);
const pct = (x) => (x === null ? 'n/a' : `${x >= 0 ? '+' : ''}${Math.round(x * 100)}%`);
const md = [];
md.push('# Local study of the OPS Skills: generated tables', '', 'Generated by `npm run study:report` from the records under `results/runs/`. Protocol: [`../protocol.md`](../protocol.md). Amendments: [`../amendments.md`](../amendments.md).', '');
md.push(studyComplete ? 'Every required comparison has an admissible, scored observation in both conditions.' : '**The study is not complete:** at least one required observation is missing, pending a rerun, or could not be scored. Nothing below is a final result.', '');
md.push('## Admissible observations', '', 'Effective score out of 100 (raw score in brackets when a hard failure set the effective score to zero). A case passes at 80 or more without a hard failure. ↻ marks a corrective rerun: the case was executed again after its oracle was repaired. ⏱ marks a run stopped at its time limit.', '');
md.push(`| Case | Track | Kind | ${retained.join(' | ')} | Δ final − baseline |`, `|---|---|---|${retained.map(() => '---:').join('|')}|---:|`);
for (const c of cases) {
  const b = table[c.id].WITHOUT_SKILLS;
  const f = table[c.id][finalCondition];
  const delta = b.state === 'SCORED' && f.state === 'SCORED' ? `${f.effective - b.effective > 0 ? '+' : ''}${f.effective - b.effective}` : 'n/a';
  md.push(`| ${c.id} ${c.title} | ${c.track} | ${SPLIT_LABEL[c.split] ?? c.split} | ${retained.map((k) => show(table[c.id][k])).join(' | ')} | ${delta} |`);
}
md.push('', `Final candidate: \`${finalCondition}\`. ${refined ? 'One refinement was made.' : 'No refinement was made.'}`, '');
md.push('## Attempts set aside', '', 'These attempts are kept and are not part of the comparison. "Original grade" is the grade under the oracle frozen before the run. "Diagnostic replay" is the same stored evidence scored with the repaired oracle; it is not an agent run and not an observation.', '');
if (setAside.length) {
  md.push('| Attempt | Original grade | Diagnostic replay | Why it is set aside |', '|---|---:|---:|---|');
  for (const s of setAside) md.push(`| \`${s.attemptId}\` | ${s.originalGrade ? `${s.originalGrade.effective} (failed ${s.originalGrade.failed.join(', ') || 'none'})` : s.status} | ${s.diagnosticReplay ? s.diagnosticReplay.effective : '—'} | ${String(s.reason ?? '').split('. ')[0]}. |`);
} else md.push('None.');
md.push('', '## Failed assertions and hard failures in admissible observations', '');
let anyFailure = false;
for (const c of cases) for (const k of retained) {
  const x = table[c.id][k];
  if (x.state !== 'SCORED') continue;
  const failed = x.record.score.assertions.filter((a) => !a.pass);
  if (!failed.length && !x.hard.length) continue;
  anyFailure = true;
  md.push(`- **${c.id} ${k}** (\`${x.record.attemptId}\`)${x.hard.length ? `: hard failure ${x.hard.join(', ')}` : ''}`);
  for (const h of x.record.score.hardFailures) md.push(`  - ${h.code}: ${h.evidence}`);
  for (const a of failed) md.push(`  - ${a.id} (${a.dimension}, ${a.kind}): ${a.evidence}`);
}
if (!anyFailure) md.push('None.');
md.push('', '## Quality by track', '');
for (const [condition, q] of Object.entries(quality)) {
  md.push(`### ${condition} against WITHOUT_SKILLS`, '', '| Set | Cases | Baseline mean | With Skills mean | Mean Δ | Largest loss | Improvement threshold (≥ +10, no loss > 10) |', '|---|---|---:|---:|---:|---:|---|');
  for (const [name, x] of Object.entries(q)) md.push(`| ${name} | ${x.cases.join(', ') || '—'} | ${x.meanBaseline ?? 'n/a'} | ${x.meanWithSkills ?? 'n/a'} | ${x.meanDelta ?? 'n/a'} | ${x.largestLoss ?? 'n/a'} | ${x.complete ? (x.verdict === 'supported' ? 'met' : 'not met') : 'inconclusive'}: ${x.why} |`);
  md.push('');
}
md.push('## Cost', '', 'Relative change of the Skills condition against the baseline, per matched admissible pair with observed values. The tolerance was a median of at most +50%. Staying inside the tolerance is not a saving. Token counts are the client\'s usage record (input, output, cache creation and cache read); cost figures in the records are the client\'s list-price estimate, not a charge.', '');
for (const [condition, e] of Object.entries(efficiency)) {
  md.push(`### ${condition}`, '', '| Measure | Eligible pairs | Median change | Per case |', '|---|---:|---:|---|');
  for (const [name, x] of Object.entries(e)) md.push(`| ${name} | ${x.eligiblePairs} | ${pct(x.medianOverhead)} | ${x.pairs.map((p) => `${p.id} ${pct(p.overhead)}`).join(', ') || '—'} |`);
  md.push('');
}
md.push('## Hypotheses', '', `Judged on \`${finalCondition}\`, on admissible matched pairs, within this sample only.`, '', '| | Hypothesis | Verdict | Basis |', '|---|---|---|---|');
for (const [id, h] of Object.entries(hypotheses)) md.push(`| ${id} | ${h.statement} | **${h.verdict}** | ${h.why} |`);
md.push('', '## Readiness', '', `All five cases pass: ${readiness.allCasesPass}. Mean: ${readiness.mean ?? 'n/a'} (threshold 85). Hard failures: ${readiness.hardFailures.length}. **${readiness.complete ? (readiness.ready ? 'Ready' : 'Not ready') : 'Not determined'}** by the local thresholds.`, '');
md.push('## Activation probes', '');
if (probes) {
  md.push('| Skill | Probe | Expected | Observed |', '|---|---|---|---|');
  for (const p of probes.probes) md.push(`| ${p.skill} | ${p.kind} | ${p.expectActivation ? 'activates' : 'stays inactive'} | ${p.outcome}${p.timedOutAtLimit ? ' (stopped at the limit)' : ''} |`);
  md.push('', `Correct ${probes.summary.correct}, missed ${probes.summary.missed}, unwanted ${probes.summary.unwanted}, not observed ${probes.summary.notObserved}. Probes are not scored cases.`, '');
} else md.push('`NOT_RUN`', '');
md.push('## Ledger', '', `Evaluation attempts: **${budget.evaluationAttempts} of ${budget.ceiling}** (ceiling applies because ${budget.ceilingBasis}). Evaluated run time: ${budget.evaluatedMinutes} of ${budget.minuteLimit} minutes. Preparation agent sessions, recorded and counted apart: ${budget.preparationAgentSessions}; if they were counted as well, the total would be ${budget.ifPreparationWereCounted}.`, '');
md.push('| # | Kind | What | Condition | Status | Seconds | Counts against the ceiling |', '|---:|---|---|---|---|---:|---|');
ledger.forEach((a, i) => md.push(`| ${i + 1} | ${a.kind} | ${a.attemptId ?? a.what ?? ''}${a.note ? ` — ${a.note}` : ''} | ${a.condition ?? '—'} | ${a.status ?? '—'} | ${typeof a.wallMs === 'number' ? Math.round(a.wallMs / 1000) : 'unknown'} | ${EVALUATION.has(a.kind) ? 'yes' : a.agentSession === false ? 'no (not an agent run)' : 'no (preparation)'} |`));
writeFileSync(join(RESULTS, 'report.generated.md'), `${md.join('\n')}\n`);
console.log(`wrote results.json and report.generated.md (${studyComplete ? 'complete' : 'incomplete'}; final condition ${finalCondition}; evaluation attempts ${budget.evaluationAttempts}/${budget.ceiling})`);
