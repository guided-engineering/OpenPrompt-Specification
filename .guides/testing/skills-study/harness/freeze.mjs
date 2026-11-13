// Freeze the study definition (or with --check, verify it): the protocol, the
// configuration, the contract kit, every case with its oracle, and the
// harness. The hashes are written to frozen.json before the first scored run.
// The files are hashed, not interpreted: the held-out case is frozen without
// being opened by whoever runs this.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { STUDY, listFiles, readJson, sha256, treeHash, writeJson } from './lib.mjs';

const FROZEN = join(STUDY, 'frozen.json');
const HELD_OUT = 'cases/c5-resume-heldout/';
const included = (f) => !f.startsWith('results/') && f !== 'frozen.json' && f !== 'amendments.md';
// Hash text with LF line endings so that a checkout on another platform agrees.
const hashOf = (f) => sha256(readFileSync(join(STUDY, f)).toString('latin1').replace(/\r\n/g, '\n'));
const current = () => Object.fromEntries(listFiles(STUDY).filter(included).map((f) => [f, hashOf(f)]));

if (process.argv.includes('--check')) {
  if (!existsSync(FROZEN)) {
    console.error('frozen.json does not exist: the study is not frozen yet');
    process.exit(1);
  }
  const frozen = readJson(FROZEN).files;
  const now = current();
  const diff = [
    ...Object.keys(frozen).filter((f) => !(f in now)).map((f) => `removed after the freeze: ${f}`),
    ...Object.keys(now).filter((f) => !(f in frozen)).map((f) => `added after the freeze: ${f}`),
    ...Object.keys(now).filter((f) => f in frozen && now[f] !== frozen[f]).map((f) => `changed after the freeze: ${f}`),
  ];
  if (diff.length) {
    console.error(diff.join('\n'));
    console.error('\nEvery difference must be explained in amendments.md.');
    process.exit(1);
  }
  console.log(`study definition matches frozen.json (${Object.keys(frozen).length} files)`);
} else if (process.argv.includes('--add-held-out')) {
  // Second moment of the freeze: the held-out case arrives. Everything frozen
  // earlier must be unchanged; only files of the held-out case are added.
  const frozen = readJson(FROZEN);
  const now = current();
  const changed = Object.keys(frozen.files).filter((f) => now[f] !== frozen.files[f]);
  const stray = Object.keys(now).filter((f) => !(f in frozen.files) && !f.startsWith(HELD_OUT));
  const added = Object.keys(now).filter((f) => f.startsWith(HELD_OUT));
  if (changed.length || stray.length || !added.length || Object.keys(frozen.files).some((f) => f.startsWith(HELD_OUT))) {
    console.error(['cannot add the held-out case:', ...changed.map((f) => `  changed since the freeze: ${f}`), ...stray.map((f) => `  unexpected new file: ${f}`), added.length ? '' : '  the held-out case has no files'].join('\n'));
    process.exit(1);
  }
  const files = Object.fromEntries(Object.entries({ ...frozen.files, ...Object.fromEntries(added.map((f) => [f, now[f]])) }).sort());
  writeJson(FROZEN, { ...frozen, heldOutAddedAt: new Date().toISOString(), heldOutFiles: added.length, treeHash: treeHash(files), files });
  console.log(`added ${added.length} held-out files; ${Object.keys(files).length} files frozen (${treeHash(files)})`);
} else {
  if (existsSync(FROZEN) && !process.argv.includes('--amend')) {
    console.error('frozen.json exists. Use --check, or --amend together with an entry in amendments.md.');
    process.exit(1);
  }
  const files = Object.fromEntries(Object.entries(current()).filter(([f]) => process.argv.includes('--amend') || !f.startsWith(HELD_OUT)));
  const previous = existsSync(FROZEN) ? readJson(FROZEN) : null;
  writeJson(FROZEN, {
    description: 'Hashes of the study definition. Created before the first scored run; amended only as recorded in amendments.md.',
    frozenAt: previous?.frozenAt ?? new Date().toISOString(),
    amendedAt: previous ? new Date().toISOString() : null,
    contractKit: readJson(join(STUDY, 'kit', 'manifest.json')).treeHash,
    treeHash: treeHash(files),
    files,
  });
  console.log(`${previous ? 'amended' : 'froze'} ${Object.keys(files).length} files (${treeHash(files)})`);
}
