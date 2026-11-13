// Aggregate the stored records into results/results.json and results/report.md.
// The analysis is fixed here before any scored run exists: which numbers are
// compared, how the thresholds are applied, and how missing data is reported.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { STUDY, readJson, writeJson } from './lib.mjs';

const RESULTS = join(STUDY, 'results');
const CONDITIONS = ['WITHOUT_SKILLS', 'INITIAL_SKILLS', 'REFINED_SKILLS'];
const TRACKS = { authoring: 'H1', execution: 'H2' };

const cases = readdirSync(join(STUDY, 'cases'))
  .filter((c) => existsSync(join(STUDY, 'cases', c, 'case.json')))
  .map((c) => ({ dir: c, ...readJson(join(STUDY, 'cases', c, 'case.json')) }))
  .filter((c) => c.split !== 'infrastructure')
  .sort((a, b) => a.id.localeCompare(b.id));

const record = (condition, dir) => {
  const file = join(RESULTS, 'runs', condition, dir, 'record.json');
  return existsSync(file) ? readJson(file) : null;
};
const candidates = existsSync(join(RESULTS, 'candidates.json')) ? readJson(join(RESULTS, 'candidates.json')) : {};
const refined = Boolean(candidates.REFINED_SKILLS);
const retained = refined ? CONDITIONS : ['WITHOUT_SKILLS', 'INITIAL_SKILLS'];
const finalCondition = refined ? 'REFINED_SKILLS' : 'INITIAL_SKILLS';

// A cell is NOT_RUN, NOT_SCORED, or a scored observation. A missing value is never a zero.
const cell = (condition, c) => {
  const r = record(condition, c.dir);
  if (!r) return { state: 'NOT_RUN' };
  if (r.status === 'NOT_SCORED') return { state: 'NOT_SCORED', reason: r.statusReason, record: r };
  return { state: 'SCORED', status: r.status, raw: r.score.rawScore, effective: r.score.effectiveScore, passed: r.score.passed, hard: r.score.hardFailures.map((h) => h.code), record: r };
};
const table = Object.fromEntries(cases.map((c) => [c.id, Object.fromEntries(CONDITIONS.map((k) => [k, cell(k, c)]))]));

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
  const complete = pairs.every((p) => p.base.state === 'SCORED' && p.treat.state === 'SCORED');
  if (!set.length) return { cases: [], complete: false, verdict: 'inconclusive', why: 'no case in this set' };
  if (!complete) {
    const missing = pairs.filter((p) => p.base.state !== 'SCORED' || p.treat.state !== 'SCORED').map((p) => `${p.id} (${p.base.state}/${p.treat.state})`);
    return { cases: set.map((c) => c.id), complete: false, verdict: 'inconclusive', why: `missing or unscored pairs: ${missing.join(', ')}` };
  }
  const deltas = pairs.map((p) => ({ id: p.id, baseline: p.base.effective, withSkills: p.treat.effective, delta: p.treat.effective - p.base.effective, rawDelta: p.treat.raw - p.base.raw }));
  const meanBaseline = mean(deltas.map((d) => d.baseline));
  const meanWith = mean(deltas.map((d) => d.withSkills));
  const worstLoss = Math.min(...deltas.map((d) => d.delta));
  const improved = meanWith - meanBaseline >= 10 && worstLoss >= -10;
  return {
    cases: set.map((c) => c.id), complete: true, deltas,
    meanBaseline: round(meanBaseline), meanWithSkills: round(meanWith), meanDelta: round(meanWith - meanBaseline), largestLoss: worstLoss < 0 ? -worstLoss : 0,
    verdict: improved ? 'supported' : 'unsupported',
    why: improved ? 'mean gain of at least 10 points and no case lost more than 10' : meanWith - meanBaseline < 10 ? 'mean gain below 10 points' : 'a case lost more than 10 points',
  };
}

/** Median relative overhead of a metric over matched pairs with observed values and a positive baseline. */
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
const timeOf = (r) => r.metrics.durationMs ?? r.metrics.wallMs;
const tokensOf = (r) => r.metrics.tokens?.total ?? null;
const outputTokensOf = (r) => r.metrics.tokens?.output ?? null;

const byTrack = (track, split) => cases.filter((c) => c.track === track && (!split || c.split === split));
const quality = {};
for (const condition of retained.filter((k) => k !== 'WITHOUT_SKILLS')) {
  quality[condition] = {
    authoring: compare(byTrack('authoring'), condition),
    execution: compare(byTrack('execution'), condition),
    executionDevelopmentOnly: compare(byTrack('execution', 'development'), condition),
    heldOut: compare(cases.filter((c) => c.split === 'held-out'), condition),
  };
}
const efficiency = {};
for (const condition of retained.filter((k) => k !== 'WITHOUT_SKILLS')) {
  efficiency[condition] = { elapsedTime: overhead(timeOf, condition), tokensProcessed: overhead(tokensOf, condition), outputTokens: overhead(outputTokensOf, condition) };
}

// Hypotheses are judged on the final candidate.
const fq = quality[finalCondition];
const fe = efficiency[finalCondition];
const anyGain = fq && ['authoring', 'execution'].some((t) => fq[t].verdict === 'supported');
let h3;
if (!fe || fe.elapsedTime.eligiblePairs < 3 || fe.tokensProcessed.eligiblePairs < 3) h3 = { verdict: 'inconclusive', why: 'fewer than three matched pairs have both time and token measurements' };
else if (!anyGain) h3 = { verdict: 'inconclusive', why: 'no quality gain reached the improvement threshold, so there is no gain whose cost could be judged; the measured overhead is reported as is' };
else if (fe.elapsedTime.medianOverhead <= 0.5 && fe.tokensProcessed.medianOverhead <= 0.5) h3 = { verdict: 'supported', why: 'median overhead is at most 50% for elapsed time and for tokens' };
else h3 = { verdict: 'unsupported', why: 'median overhead exceeds 50% for elapsed time or tokens; the gain is a tradeoff' };
const hypotheses = {
  H1: fq ? { statement: 'ops-author improves intent preservation, contract validity and actionable verification in authored prompts', ...fq.authoring } : { verdict: 'inconclusive', why: 'no Skills condition has been run' },
  H2: fq ? { statement: 'ops-execute improves correct planning, scoped implementation and closure of the verify-repair loop', ...fq.execution } : { verdict: 'inconclusive', why: 'no Skills condition has been run' },
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

// Attempts and budget.
const attempts = existsSync(join(RESULTS, 'attempts.jsonl'))
  ? readFileSync(join(RESULTS, 'attempts.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
  : [];
const probes = existsSync(join(RESULTS, 'probes', 'activation.json')) ? readJson(join(RESULTS, 'probes', 'activation.json')) : null;
const evaluated = attempts.filter((a) => a.kind !== 'infrastructure-check');
const budget = { attempts: evaluated.length, attemptLimit: 24, evaluatedMinutes: round(evaluated.reduce((s, a) => s + (a.wallMs ?? 0), 0) / 60000), minuteLimit: 120, byKind: {} };
for (const a of attempts) budget.byKind[a.kind] = (budget.byKind[a.kind] ?? 0) + 1;

const requiredCells = cases.flatMap((c) => retained.map((k) => table[c.id][k].state));
const studyComplete = requiredCells.every((s) => s === 'SCORED');
const results = {
  generatedAt: new Date().toISOString(),
  finalCondition, refined, retainedConditions: retained, studyComplete,
  cases: cases.map((c) => ({ id: c.id, dir: c.dir, title: c.title, complexity: c.complexity, split: c.split, track: c.track })),
  scores: Object.fromEntries(cases.map((c) => [c.id, Object.fromEntries(CONDITIONS.map((k) => {
    const x = table[c.id][k];
    return [k, x.state === 'SCORED' ? { state: x.state, status: x.status, raw: x.raw, effective: x.effective, passed: x.passed, hardFailures: x.hard,
      failedAssertions: x.record.score.assertions.filter((a) => !a.pass).map((a) => a.id), elapsedSeconds: round(timeOf(x.record) / 1000), tokensProcessed: tokensOf(x.record), outputTokens: outputTokensOf(x.record),
      toolCalls: x.record.metrics.toolCalls, skillsInvoked: x.record.skillsInvoked, record: `runs/${k}/${c.dir}/record.json` } : { state: x.state, reason: x.reason ?? null }];
  }))])),
  quality, efficiency, hypotheses, readiness, activationProbes: probes, budget, candidates, attempts,
};
writeJson(join(RESULTS, 'results.json'), results);

// ------------------------------------------------------------------ Markdown
const show = (x) => (x.state === 'SCORED' ? `${x.effective}${x.raw !== x.effective ? ` (raw ${x.raw})` : ''}${x.status === 'TIMEOUT' ? ' ⏱' : ''}` : x.state);
const pct = (x) => (x === null ? 'n/a' : `${x >= 0 ? '+' : ''}${Math.round(x * 100)}%`);
const md = [];
md.push('# Local study of the OPS Skills: results', '', `Generated by \`npm run study:report\` from the records under \`results/runs/\`. Protocol: [\`../protocol.md\`](../protocol.md).`, '');
md.push(studyComplete ? 'Every required run exists and was scored.' : '**The study is not complete:** at least one required run is `NOT_RUN` or `NOT_SCORED`. Nothing below is a final result.', '');
md.push('## Scores', '', 'Effective score out of 100 (raw score in brackets when a hard failure set the effective score to zero). A case passes at 80 or more without a hard failure.', '');
md.push(`| Case | Track | Split | ${CONDITIONS.join(' | ')} | Δ final − baseline |`, `|---|---|---|${CONDITIONS.map(() => '---:').join('|')}|---:|`);
for (const c of cases) {
  const b = table[c.id].WITHOUT_SKILLS;
  const f = table[c.id][finalCondition];
  const delta = b.state === 'SCORED' && f.state === 'SCORED' ? `${f.effective - b.effective >= 0 ? '+' : ''}${f.effective - b.effective}` : 'n/a';
  md.push(`| ${c.id} ${c.title} | ${c.track} | ${c.split} | ${CONDITIONS.map((k) => show(table[c.id][k])).join(' | ')} | ${delta} |`);
}
md.push('', `Final candidate: \`${finalCondition}\`. ${refined ? 'One refinement was made.' : 'No refinement was made.'}`, '');
md.push('## Hard failures and failed assertions', '');
for (const c of cases) for (const k of CONDITIONS) {
  const x = table[c.id][k];
  if (x.state !== 'SCORED') continue;
  const failed = x.record.score.assertions.filter((a) => !a.pass);
  if (!failed.length && !x.hard.length) continue;
  md.push(`- **${c.id} ${k}**${x.hard.length ? `: hard failure ${x.hard.join(', ')}` : ''}`);
  for (const h of x.record.score.hardFailures) md.push(`  - ${h.code}: ${h.evidence}`);
  for (const a of failed) md.push(`  - ${a.id} (${a.dimension}, ${a.kind}): ${a.evidence}`);
}
md.push('', '## Quality by track', '');
for (const [condition, q] of Object.entries(quality)) {
  md.push(`### ${condition} against WITHOUT_SKILLS`, '', '| Set | Cases | Baseline mean | With Skills mean | Mean Δ | Largest loss | Threshold (≥ +10, no loss > 10) |', '|---|---|---:|---:|---:|---:|---|');
  for (const [name, x] of Object.entries(q)) md.push(`| ${name} | ${x.cases.join(', ') || '—'} | ${x.meanBaseline ?? 'n/a'} | ${x.meanWithSkills ?? 'n/a'} | ${x.meanDelta ?? 'n/a'} | ${x.largestLoss ?? 'n/a'} | ${x.complete ? (x.verdict === 'supported' ? 'met' : 'not met') : 'inconclusive'}: ${x.why} |`);
  md.push('');
}
md.push('## Efficiency', '', 'Relative overhead of the Skills condition over the baseline, per matched pair with observed values. Target: median at most +50%. Token counts are the client\'s own usage record (input, output, cache creation and cache read); cost figures reported by the client are estimates, not charges.', '');
for (const [condition, e] of Object.entries(efficiency)) {
  md.push(`### ${condition}`, '', '| Metric | Eligible pairs | Median overhead | Per case |', '|---|---:|---:|---|');
  for (const [name, x] of Object.entries(e)) md.push(`| ${name} | ${x.eligiblePairs} | ${pct(x.medianOverhead)} | ${x.pairs.map((p) => `${p.id} ${pct(p.overhead)}`).join(', ') || '—'} |`);
  md.push('');
}
md.push('## Hypotheses', '', `Judged on \`${finalCondition}\`, within this sample only.`, '', '| | Hypothesis | Verdict | Basis |', '|---|---|---|---|');
for (const [id, h] of Object.entries(hypotheses)) md.push(`| ${id} | ${h.statement} | **${h.verdict}** | ${h.why} |`);
md.push('', '## Readiness', '', `All five cases pass: ${readiness.allCasesPass}. Mean: ${readiness.mean ?? 'n/a'} (threshold 85). Hard failures: ${readiness.hardFailures.length}. **${readiness.complete ? (readiness.ready ? 'Ready' : 'Not ready') : 'Not determined'}** by the local thresholds.`, '');
md.push('## Activation probes', '');
if (probes) {
  md.push('| Skill | Probe | Expected | Observed | Result |', '|---|---|---|---|---|');
  for (const p of probes.probes) md.push(`| ${p.skill} | ${p.kind} | ${p.expectActivation ? 'activates' : 'stays inactive'} | ${p.status === 'OBSERVED' ? (p.activated ? 'activated' : 'not activated') : p.status} | ${p.outcome} |`);
  md.push('', `Correct ${probes.summary.correct}, missed ${probes.summary.missed}, unwanted ${probes.summary.unwanted}, not observed ${probes.summary.notObserved}. Probes are not scored cases.`, '');
} else md.push('`NOT_RUN`', '');
md.push('## Attempts and budget', '', `Evaluation attempts: ${budget.attempts} of ${budget.attemptLimit}. Evaluated run time: ${budget.evaluatedMinutes} of ${budget.minuteLimit} minutes. By kind: ${Object.entries(budget.byKind).map(([k, n]) => `${k} ${n}`).join(', ') || 'none'}.`, '');
writeFileSync(join(RESULTS, 'report.generated.md'), `${md.join('\n')}\n`);
console.log(`wrote results.json and report.generated.md (${studyComplete ? 'complete' : 'incomplete'}; final condition ${finalCondition})`);
