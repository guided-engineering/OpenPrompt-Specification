// Activation probes for the final Skill candidate. Six short sessions, each in
// a clean workspace with both Skills installed: for each Skill an explicit
// request, an implicit paraphrase, and an adjacent request that should leave
// it inactive. Activation is read from the trace (a `Skill` tool call naming
// the Skill), never inferred from the answer. Probes are not scored cases.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONFIG, STUDY, materialize, parseTrace, readJson, runAgent, writeJson } from './lib.mjs';

const spec = readJson(join(STUDY, 'cases', 'p0-activation', 'probes.json'));
const candidates = readJson(join(STUDY, 'results', 'candidates.json'));
const finalCondition = candidates.REFINED_SKILLS ? 'REFINED_SKILLS' : 'INITIAL_SKILLS';
const commit = candidates[finalCondition].commit;
const limitMs = CONFIG.timeLimitsSeconds.probe * 1000;

const probes = [];
for (const p of spec.probes) {
  const { workspace, skills } = materialize({ caseId: spec.fixtureFrom, runId: `probe.${p.id}`, skills: { commit, names: CONFIG.skills } });
  const run = await runAgent({ cwd: workspace, prompt: p.prompt, timeoutMs: limitMs });
  const trace = parseTrace(run.events);
  const listed = Array.isArray(trace.init?.skills) ? CONFIG.skills.filter((s) => trace.init.skills.includes(s)) : null;
  const invoked = trace.calls.filter((c) => c.name === 'Skill' && !c.subagent).map((c) => c.skill);
  const observed = Boolean(trace.init) && listed?.length === CONFIG.skills.length;
  const activated = invoked.includes(p.skill);
  const outcome = !observed ? 'not observed'
    : p.expectActivation ? (activated ? 'correct activation' : 'missed activation')
    : activated ? 'unwanted activation' : 'correct non-activation';
  probes.push({ id: p.id, skill: p.skill, kind: p.kind, expectActivation: p.expectActivation, prompt: p.prompt, status: observed ? 'OBSERVED' : 'NOT_OBSERVED',
    activated, skillsInvoked: invoked, candidatesListedByClient: listed, timedOutAtLimit: run.timedOut, wallMs: run.endedAt - run.startedAt, outcome, skills });
  writeFileSync(join(STUDY, 'results', 'attempts.jsonl'), `${JSON.stringify({ attemptId: `probe.${p.id}`, kind: 'activation-probe', case: p.id, condition: finalCondition, status: observed ? 'OBSERVED' : 'NOT_OBSERVED', startedAt: run.startedAt.toISOString(), wallMs: run.endedAt - run.startedAt })}\n`, { flag: 'a' });
  console.log(`${p.id}: ${outcome} (invoked: [${invoked}]${run.timedOut ? ', stopped at the limit' : ''})`);
}
const count = (o) => probes.filter((p) => p.outcome === o).length;
writeJson(join(STUDY, 'results', 'probes', 'activation.json'), {
  condition: finalCondition, commit, limitSeconds: CONFIG.timeLimitsSeconds.probe, probes,
  summary: { correct: count('correct activation') + count('correct non-activation'), missed: count('missed activation'), unwanted: count('unwanted activation'), notObserved: count('not observed') },
});
