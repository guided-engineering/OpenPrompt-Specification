// Oracle self-check, with no agent involved. For every case:
//   - the untouched fixture must not pass (and the seeded state is what the case says);
//   - every hand-written reference outcome under reference/<variant>/ must receive
//     exactly the score, failed assertions and hard failures stated in its expected.json.
// Usage: node selfcheck.mjs [caseDirName ...]     (default: every case that has reference/)
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { STUDY, listFiles, manifest, readJson } from './lib.mjs';
import { scoreAttempt } from './score.mjs';

const casesDir = join(STUDY, 'cases');
const wanted = process.argv.slice(2);
const cases = readdirSync(casesDir).filter((c) => existsSync(join(casesDir, c, 'reference')) && (wanted.length === 0 || wanted.includes(c))).sort();

const toTrace = ({ calls, finalText }) => ({
  init: null,
  result: null,
  finalText,
  calls: calls.map((c, index) => ({
    index,
    id: `ref-${index}`,
    name: c.name,
    input: c.command ? { command: c.command } : c.file ? { file_path: c.file } : {},
    command: c.command ?? null,
    file: c.file ? `X:/study/workspace/${c.file}` : null,
    skill: c.skill ?? null,
    subagent: false,
    result: c.result ?? '',
    isError: Boolean(c.isError),
  })),
});

const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.log(`  FAIL ${msg}`);
};

for (const c of cases) {
  const caseDir = join(casesDir, c);
  const info = readJson(join(caseDir, 'case.json'));
  console.log(`${info.id} ${c}`);

  // Seeded state of the fixture.
  if (info.coreCheck) {
    const out = spawnSync(info.coreCheck.command, info.coreCheck.args, { cwd: join(caseDir, 'fixture', info.coreCheck.cwd), encoding: 'utf8' });
    if (out.status === 0) fail('the core check passes on the untouched fixture; the seeded failure is gone');
    else console.log(`  ok   seeded failure reproduces (core check exits ${out.status})`);
  }

  // The untouched fixture must not pass.
  const untouched = await scoreAttempt({ caseId: c, artifactsDir: null, changes: { added: [], modified: [], deleted: [] }, trace: toTrace({ calls: [], finalText: '' }) });
  if (untouched.passed) fail(`the untouched fixture passes with ${untouched.effectiveScore}`);
  else console.log(`  ok   untouched fixture: raw ${untouched.rawScore}, effective ${untouched.effectiveScore}, hard failures ${untouched.hardFailures.map((h) => h.code).join(', ') || 'none'}`);

  const initial = { ...manifest(join(caseDir, 'fixture')), ...manifest(join(STUDY, 'kit', 'files')), ...(existsSync(join(caseDir, 'uncommitted')) ? manifest(join(caseDir, 'uncommitted')) : {}) };
  for (const variant of readdirSync(join(caseDir, 'reference')).sort()) {
    const dir = join(caseDir, 'reference', variant);
    const expected = readJson(join(dir, 'expected.json'));
    const files = listFiles(join(dir, 'files'));
    const changes = { added: files.filter((f) => !(f in initial)), modified: files.filter((f) => f in initial), deleted: expected.deleted ?? [] };
    const got = await scoreAttempt({ caseId: c, artifactsDir: join(dir, 'files'), changes, trace: toTrace(readJson(join(dir, 'trace.json'))) });
    const failed = got.assertions.filter((a) => !a.pass).map((a) => a.id);
    const hard = got.hardFailures.map((h) => h.code);
    const ok = got.rawScore === expected.rawScore && got.effectiveScore === expected.effectiveScore && same(failed, expected.failed) && same(hard, expected.hardFailures);
    if (ok) console.log(`  ok   ${variant}: raw ${got.rawScore}, effective ${got.effectiveScore}`);
    else {
      fail(`${variant}: expected raw ${expected.rawScore} / effective ${expected.effectiveScore} / failed [${expected.failed}] / hard [${expected.hardFailures}]`);
      console.log(`       got      raw ${got.rawScore} / effective ${got.effectiveScore} / failed [${failed}] / hard [${hard}]`);
      for (const a of got.assertions.filter((x) => !x.pass)) console.log(`       ${a.id}: ${a.evidence}`);
    }
  }
}
console.log(failures ? `\n${failures} self-check failure(s)` : '\nall oracle self-checks pass');
process.exit(failures ? 1 : 0);
