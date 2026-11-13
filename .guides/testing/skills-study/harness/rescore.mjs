// Re-score stored attempts from their stored evidence, after an oracle defect
// was fixed (protocol, "Oracle defects"). No agent runs. Every attempt of the
// named case, in every condition, is re-scored with the current oracle; the
// previous score is kept in the record's scoreHistory with the amendment id.
//
//   node rescore.mjs --case <caseDir> --amendment <n>
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { STUDY, parseTrace, readJson, writeJson } from './lib.mjs';
import { scoreAttempt } from './score.mjs';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? null : process.argv[i + 1];
};
const caseId = arg('case');
const amendment = Number(arg('amendment'));
if (!caseId || !Number.isInteger(amendment)) {
  console.error('usage: node rescore.mjs --case <caseDir> --amendment <n>');
  process.exit(2);
}

const runs = join(STUDY, 'results', 'runs');
for (const condition of readdirSync(runs).sort()) {
  const dir = join(runs, condition, caseId);
  if (!existsSync(join(dir, 'record.json'))) continue;
  const record = readJson(join(dir, 'record.json'));
  if (record.status === 'NOT_SCORED') {
    console.log(`${condition} ${record.case}: NOT_SCORED, left as is`);
    continue;
  }
  const events = gunzipSync(readFileSync(join(dir, 'trace.jsonl.gz'))).toString('utf8').split('\n').filter((l) => l.trim()).flatMap((l) => {
    try {
      return [JSON.parse(l)];
    } catch {
      return [];
    }
  });
  const score = await scoreAttempt({ caseId, artifactsDir: join(dir, 'artifacts'), changes: record.changes, trace: parseTrace(events), run: { timedOut: record.exit.timedOut, exitCode: record.exit.code } });
  const before = record.score;
  const changed = before.rawScore !== score.rawScore || before.effectiveScore !== score.effectiveScore
    || JSON.stringify(before.assertions.map((a) => a.pass)) !== JSON.stringify(score.assertions.map((a) => a.pass));
  record.scoreHistory = [...(record.scoreHistory ?? []), { supersededByAmendment: amendment, rawScore: before.rawScore, effectiveScore: before.effectiveScore, failed: before.assertions.filter((a) => !a.pass).map((a) => a.id), hardFailures: before.hardFailures.map((h) => h.code) }];
  record.score = score;
  writeJson(join(dir, 'record.json'), record);
  console.log(`${condition} ${record.case}: raw ${before.rawScore} -> ${score.rawScore}, effective ${before.effectiveScore} -> ${score.effectiveScore}${changed ? '' : ' (unchanged)'}`);
}
