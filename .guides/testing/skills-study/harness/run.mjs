// Run one case under one condition, once, and store the evidence and the score.
//
//   node run.mjs --case <caseDir> --condition WITHOUT_SKILLS|INITIAL_SKILLS|REFINED_SKILLS
//                [--infra-retry "<reason>"] [--corrective "<reason>"]
//
// A second run of the same case and condition is refused, with two exceptions.
// --infra-retry: the first run was an infrastructure failure (NOT_SCORED).
// --corrective: a frozen evaluated input of the case (its oracle) was repaired
// after the first run, which invalidates that observation; the case is run again
// under the repaired, re-frozen inputs. The earlier attempt is kept beside it.
// A wrong answer or an exhausted time limit is an observed outcome, never a
// reason to run again, and the higher of two scores is never chosen.
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { CONFIG, RUNS_ROOT, STUDY, changes as diffState, clientArgs, clientVersion, kitIdentity, manifest, materialize, metrics, parseTrace, readJson, runAgent, sha256, treeHash, writeJson } from './lib.mjs';
import { scoreAttempt } from './score.mjs';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? null : process.argv[i + 1];
};
const caseId = arg('case');
const condition = arg('condition');
const retryReason = arg('infra-retry');
const correctiveReason = arg('corrective');
const CONDITIONS = ['WITHOUT_SKILLS', 'INITIAL_SKILLS', 'REFINED_SKILLS'];
if (!caseId || !CONDITIONS.includes(condition)) {
  console.error('usage: node run.mjs --case <caseDir> --condition WITHOUT_SKILLS|INITIAL_SKILLS|REFINED_SKILLS [--infra-retry "<reason>"] [--corrective "<reason>"]');
  process.exit(2);
}

const caseDir = join(STUDY, 'cases', caseId);
const info = readJson(join(caseDir, 'case.json'));
const outDir = join(STUDY, 'results', 'runs', condition, caseId);
const attemptsLog = join(STUDY, 'results', 'attempts.jsonl');

// One run per case and condition.
let attempt = 1;
if (existsSync(join(outDir, 'record.json'))) {
  const previous = readJson(join(outDir, 'record.json'));
  const infraRetry = previous.status === 'NOT_SCORED' && retryReason;
  const corrective = previous.status !== 'NOT_SCORED' && correctiveReason && previous.admissibleForFinalComparison === false;
  if (!infraRetry && !corrective) {
    console.error(`${condition} ${info.id} already has a record with status ${previous.status}. A scored attempt is never repeated; a corrective rerun needs --corrective and a record marked inadmissible in amendments.md.`);
    process.exit(2);
  }
  attempt = previous.attempt + 1;
  renameSync(outDir, `${outDir}.attempt-${previous.attempt}`);
}

// Candidate Skills for this condition, by frozen commit.
let skills = null;
if (condition !== 'WITHOUT_SKILLS') {
  const candidates = readJson(join(STUDY, 'results', 'candidates.json'));
  if (!candidates[condition]) {
    console.error(`no frozen candidate is recorded for ${condition} in results/candidates.json`);
    process.exit(2);
  }
  skills = { commit: candidates[condition].commit, names: CONFIG.skills };
}

const runId = `${condition}.${caseId}.a${attempt}`;
const task = readFileSync(join(caseDir, 'task.md'), 'utf8').replace(/\r\n/g, '\n');
const kit = kitIdentity();
const frozenKit = readJson(join(STUDY, 'kit', 'manifest.json'));
if (kit.treeHash !== frozenKit.treeHash) {
  console.error('the contract kit on disk differs from the frozen manifest; refusing to run');
  process.exit(2);
}
const fixtureHash = treeHash({ ...manifest(join(caseDir, 'fixture')), ...Object.fromEntries(Object.entries(manifest(join(caseDir, 'uncommitted'))).map(([f, h]) => [`(uncommitted) ${f}`, h])) });
const { workspace, initial, initialTreeHash, skills: installed } = materialize({ caseId, runId, skills });

console.log(`${runId}: starting (limit ${info.timeLimitSeconds}s)`);
const run = await runAgent({ cwd: workspace, prompt: task, timeoutMs: info.timeLimitSeconds * 1000 });
const trace = parseTrace(run.events);
const diff = diffState(initial, workspace);

// Evidence: raw trace, final report, and every file the attempt added or changed.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, 'artifacts'), { recursive: true });
writeFileSync(join(outDir, 'trace.jsonl.gz'), gzipSync(run.stdout));
if (run.stderr.trim()) writeFileSync(join(outDir, 'stderr.txt'), run.stderr);
writeFileSync(join(outDir, 'final-report.md'), `${trace.finalText}\n`);
for (const f of [...diff.added, ...diff.modified]) {
  mkdirSync(dirname(join(outDir, 'artifacts', f)), { recursive: true });
  writeFileSync(join(outDir, 'artifacts', f), readFileSync(join(workspace, f)));
}
const changeSet = { added: diff.added, modified: diff.modified, deleted: diff.deleted };

// Status. An infrastructure failure is not scored; everything else is an observed outcome.
const init = trace.init ?? {};
const available = Array.isArray(init.skills) ? init.skills : null;
const candidatesListed = available ? CONFIG.skills.filter((s) => available.includes(s)) : null;
const expectedListed = skills ? CONFIG.skills : [];
const isolationOk = candidatesListed !== null && JSON.stringify(candidatesListed) === JSON.stringify(expectedListed);
let status = 'COMPLETED';
let statusReason = null;
if (run.spawnError) [status, statusReason] = ['NOT_SCORED', `client could not be started: ${run.spawnError}`];
else if (!trace.init) [status, statusReason] = ['NOT_SCORED', 'the client produced no init record'];
else if (!isolationOk) [status, statusReason] = ['NOT_SCORED', `Skill isolation failed: expected candidates [${expectedListed}] in the client listing, found [${candidatesListed}]`];
else if (run.timedOut) [status, statusReason] = ['TIMEOUT', `stopped at the ${info.timeLimitSeconds}s limit; scored on the state it left`];
else if (!trace.result) [status, statusReason] = ['NOT_SCORED', `the client exited with code ${run.exitCode} and no result record`];
else if (trace.result.is_error && trace.result.api_error_status) [status, statusReason] = ['NOT_SCORED', `API error ${trace.result.api_error_status}`];
else if (trace.result.is_error) statusReason = `the client reported an error result (${trace.result.subtype})`;

const score = status === 'NOT_SCORED' ? null : await scoreAttempt({ caseId, artifactsDir: join(outDir, 'artifacts'), changes: changeSet, trace, run });
const m = metrics(trace, run);
const invoked = trace.calls.filter((c) => c.name === 'Skill' && !c.subagent).map((c) => c.skill);

const record = {
  attemptId: runId,
  attempt,
  retryOfInfrastructureFailure: retryReason,
  correctiveRerun: correctiveReason ? { reason: correctiveReason, earlierAttempt: `${caseId}.attempt-${attempt - 1}` } : null,
  admissibleForFinalComparison: status !== 'NOT_SCORED',
  case: info.id,
  caseDir: caseId,
  title: info.title,
  split: info.split,
  track: info.track,
  complexity: info.complexity,
  requestedMode: info.requestedMode,
  condition,
  status,
  statusReason,
  startedAt: run.startedAt.toISOString(),
  endedAt: run.endedAt.toISOString(),
  identities: {
    task: { file: `cases/${caseId}/task.md`, sha256: sha256(task) },
    fixture: { dir: `cases/${caseId}/fixture`, treeHash: fixtureHash },
    oracle: {
      oracleSha256: sha256(readFileSync(join(caseDir, 'oracle.mjs'), 'utf8').replace(/\r\n/g, '\n')),
      scorerSha256: sha256(readFileSync(join(STUDY, 'harness', 'score.mjs'), 'utf8').replace(/\r\n/g, '\n')),
    },
    contractKit: { treeHash: kit.treeHash, promptSchemaSha256: kit.files['.guides/schemas/prompt.schema.json'], validatorSha256: kit.files['.guides/tools/ops-validate.mjs'] },
    initialWorkspace: { treeHash: initialTreeHash },
    agent: { id: 'guided-engineer', resolvesTo: 'current executor', nativeProfile: null },
    skills: installed,
  },
  client: {
    command: CONFIG.client.command,
    version: clientVersion(),
    versionReportedInTrace: init.claude_code_version ?? 'UNKNOWN',
    modelRequested: CONFIG.client.model,
    modelReportedInTrace: init.model ?? 'UNKNOWN',
    effortRequested: CONFIG.client.effort,
    permissionMode: init.permissionMode ?? 'UNKNOWN',
    arguments: clientArgs(),
    tools: init.tools ?? 'UNKNOWN',
    plugins: Array.isArray(init.plugins) ? init.plugins.map((p) => p.name) : 'UNKNOWN',
    mcpServers: init.mcp_servers ?? 'UNKNOWN',
    environment: 'variables named CLAUDE*, ANTHROPIC* and MCP_* removed',
  },
  skillsAvailable: { candidates: candidatesListed, allListedByClient: available ?? 'UNKNOWN', isolation: 'enforced: settings sources exclude the user level; the workspace is its own Git repository outside both project repositories; verified from the client listing' },
  skillsInvoked: invoked,
  exit: { code: run.exitCode, timedOut: run.timedOut },
  score,
  metrics: m,
  commands: trace.calls.filter((c) => c.command && !c.subagent).map((c) => ({ index: c.index, tool: c.name, command: c.command, isError: c.isError, resultHead: (c.result ?? '').slice(0, 200) })),
  changes: changeSet,
  evidence: { trace: 'trace.jsonl.gz', finalReport: 'final-report.md', artifacts: 'artifacts/', workspaceDuringRun: join(RUNS_ROOT, runId, 'workspace') },
};
writeJson(join(outDir, 'record.json'), record);
mkdirSync(dirname(attemptsLog), { recursive: true });
const kind = info.split === 'infrastructure' ? 'infrastructure-check' : retryReason ? 'infrastructure-retry' : correctiveReason ? 'corrective-rerun' : 'scored-task';
writeFileSync(attemptsLog, `${JSON.stringify({ attemptId: runId, kind, case: info.id, condition, status, startedAt: record.startedAt, wallMs: m.wallMs, retryReason, correctiveReason })}\n`, { flag: 'a' });

const s = score ? `raw ${score.rawScore}, effective ${score.effectiveScore}, hard failures ${score.hardFailures.map((h) => h.code).join(',') || 'none'}` : 'not scored';
console.log(`${runId}: ${status}${statusReason ? ` (${statusReason})` : ''}; ${s}; ${Math.round(m.wallMs / 1000)}s; tools ${m.toolCalls}; tokens ${m.tokens?.total ?? 'UNKNOWN'}; skills invoked [${invoked}]`);
