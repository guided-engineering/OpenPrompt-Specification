// Deterministic replay: score a stored attempt again from its stored evidence
// (trace and artifacts) with the oracle and scorer of a given study tree.
//
// A replay is NOT an agent run and is never an observation for the final
// comparison. It explains a grade: what the oracle frozen before the run gave
// (`original`), and what a repaired oracle would have given (`diagnostic`).
// A changed oracle invalidates the affected comparison; the affected case is
// run again (run.mjs --corrective). See amendments.md.
//
//   node replay.mjs --attempt <dir> [--study <study dir>] [--record-as original|diagnostic --label "<text>"]
//                   [--restore-observed-score]
//
// --study                 the study tree whose harness/score.mjs and cases/*/oracle.mjs are used
//                         (default: this one). Point it at a checkout of another commit to replay
//                         with the oracle of that commit.
// --record-as             store the replay in the attempt's record.json under scoring.<name>
// --restore-observed-score   set record.score to this replay. Used once, for attempts whose
//                         record.score had been overwritten by a re-scoring.
import { existsSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { STUDY, readJson, sha256, writeJson } from './lib.mjs';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? null : process.argv[i + 1];
};
const attemptDir = resolve(arg('attempt') ?? '');
const study = resolve(arg('study') ?? STUDY);
const recordAs = arg('record-as');
if (!existsSync(join(attemptDir, 'record.json')) || (recordAs && !['original', 'diagnostic'].includes(recordAs))) {
  console.error('usage: node replay.mjs --attempt <dir> [--study <study dir>] [--record-as original|diagnostic --label "<text>"] [--restore-observed-score]');
  process.exit(2);
}

const record = readJson(join(attemptDir, 'record.json'));
const { scoreAttempt } = await import(pathToFileURL(join(study, 'harness', 'score.mjs')).href);
const { parseTrace } = await import(pathToFileURL(join(study, 'harness', 'lib.mjs')).href);
const lf = (file) => sha256(readFileSync(file, 'utf8').replace(/\r\n/g, '\n'));
const events = gunzipSync(readFileSync(join(attemptDir, 'trace.jsonl.gz'))).toString('utf8').split('\n').filter((l) => l.trim()).flatMap((l) => {
  try {
    return [JSON.parse(l)];
  } catch {
    return [];
  }
});
const score = await scoreAttempt({ caseId: record.caseDir, artifactsDir: join(attemptDir, 'artifacts'), changes: record.changes, trace: parseTrace(events), run: { timedOut: record.exit.timedOut, exitCode: record.exit.code } });
const replay = {
  kind: 'deterministic replay of stored evidence; not an agent run',
  label: arg('label') ?? null,
  oracleIdentity: {
    oracleSha256: lf(join(study, 'cases', record.caseDir, 'oracle.mjs')),
    scorerSha256: lf(join(study, 'harness', 'score.mjs')),
    studyTree: study === STUDY ? 'working tree' : basename(study),
  },
  rawScore: score.rawScore,
  effectiveScore: score.effectiveScore,
  passed: score.passed,
  failed: score.assertions.filter((a) => !a.pass).map((a) => a.id),
  hardFailures: score.hardFailures.map((h) => h.code),
  assertions: score.assertions,
};
if (recordAs) {
  record.scoring = { ...(record.scoring ?? {}), [recordAs]: replay };
  if (process.argv.includes('--restore-observed-score')) {
    record.score = score;
    delete record.scoreHistory;
  }
  writeJson(join(attemptDir, 'record.json'), record);
}
console.log(`${record.attemptId} [${recordAs ?? 'not recorded'}] oracle ${replay.oracleIdentity.oracleSha256.slice(0, 12)} scorer ${replay.oracleIdentity.scorerSha256.slice(0, 12)}: raw ${replay.rawScore}, effective ${replay.effectiveScore}, failed [${replay.failed}], hard [${replay.hardFailures}]`);
