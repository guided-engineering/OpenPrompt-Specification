// Assemble (or with --check, verify) the contract kit: the files every fixture
// receives in every condition. The kit is copied mechanically from the
// canonical sources of this repository and then frozen. After the freeze,
// `--check` must keep passing; if a canonical source changes, the affected
// comparisons are invalid (protocol, "Changes after the freeze").
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { OPS_ROOT, STUDY, manifest, readJson, sha256, treeHash, writeJson } from './lib.mjs';

const KIT = join(STUDY, 'kit');
const FILES = join(KIT, 'files');

// fixture path  <-  canonical source in this repository
const SOURCES = {
  '.guides/ops-contract.md': '.guides/ops-contract.md',
  '.guides/conversion.md': '.guides/conversion.md',
  '.guides/schemas/prompt.schema.json': '.guides/schemas/prompt.schema.json',
  '.guides/schemas/agents.schema.json': '.guides/schemas/agents.schema.json',
  '.guides/schemas/worklog.schema.json': '.guides/schemas/worklog.schema.json',
  '.guides/tools/ops-validate.mjs': 'dist/ops-validate.mjs',
};

// The only file written for the kit itself: a neutral pointer, no procedure.
const README = `# OPS in this project

This project uses OPS prompts: validated task contracts for work that an agent
carries out.

| What | Where |
|---|---|
| The contract (normative) | \`.guides/ops-contract.md\` |
| Converting documents of the earlier contract | \`.guides/conversion.md\` |
| Schemas | \`.guides/schemas/\` |
| Prompts | \`.guides/prompts/prompt.<name>.yaml\` |
| Worklog entries | \`.guides/operation/worklog/<entryId>.md\` |

Validate a prompt or a worklog entry:

\`\`\`
node .guides/tools/ops-validate.mjs <file>
node .guides/tools/ops-validate.mjs --resolve <prompt>
node .guides/tools/ops-validate.mjs --help
\`\`\`

\`.guides/tools/ops-validate.mjs\` is a generated bundle. Run it; do not open it.
`;

const norm = (text) => text.replace(/\r\n/g, '\n');
const expected = { '.guides/README.md': README };
for (const [target, source] of Object.entries(SOURCES)) expected[target] = norm(readFileSync(join(OPS_ROOT, source), 'utf8'));
const expectedHashes = Object.fromEntries(Object.entries(expected).map(([f, text]) => [f, sha256(text)]).sort());

if (process.argv.includes('--check')) {
  const frozen = readJson(join(KIT, 'manifest.json'));
  const onDisk = manifest(FILES);
  const problems = [];
  for (const [f, h] of Object.entries(frozen.files)) {
    if (onDisk[f] !== h) problems.push(`kit file changed after the freeze: ${f}`);
    if (expectedHashes[f] !== h) problems.push(`canonical source differs from the frozen kit: ${f}`);
  }
  for (const f of Object.keys(onDisk)) if (!(f in frozen.files)) problems.push(`file added to the kit after the freeze: ${f}`);
  if (problems.length) {
    console.error(problems.join('\n'));
    console.error('\nThe frozen kit and the canonical contract no longer agree. Comparisons made with the frozen kit do not describe the changed bytes.');
    process.exit(1);
  }
  console.log(`contract kit is intact and matches its canonical sources (${frozen.treeHash})`);
} else {
  if (existsSync(join(KIT, 'manifest.json')) && !process.argv.includes('--refreeze')) {
    console.error('The kit is already frozen. Use --check, or --refreeze before any scored run exists.');
    process.exit(1);
  }
  rmSync(FILES, { recursive: true, force: true });
  for (const [target, text] of Object.entries(expected)) {
    mkdirSync(dirname(join(FILES, target)), { recursive: true });
    writeFileSync(join(FILES, target), text);
  }
  const files = manifest(FILES);
  writeJson(join(KIT, 'manifest.json'), { description: 'Contract kit overlaid on every study fixture in every condition.', sources: { '.guides/README.md': '(written by build-kit.mjs)', ...SOURCES }, files, treeHash: treeHash(files) });
  console.log(`froze ${Object.keys(files).length} kit files (${treeHash(files)})`);
}
