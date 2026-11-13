// Referential integrity of the active tree:
//   1. relative Markdown links resolve to files that exist;
//   2. every `npm run <script>` mentioned in a document exists in package.json;
//   3. retired file names and the operational `persona` appear only where the
//      repository documents its own history;
//   4. no active YAML uses a retired key.
// Exit code 1 lists every problem. `--report` also lists the allowed historical
// occurrences, so that they are classified rather than hidden.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tracked = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: root, encoding: 'utf8' })
  .split('\n').filter(Boolean).filter((f) => existsSync(resolve(root, f)));

// Not part of the active, maintained text of the repository.
const EXCLUDED = [
  /^dist\//, /^package-lock\.json$/, /^node_modules\//,
  /^examples\/invalid\//,                       // invalid on purpose
  /^examples\/conversion\/[^/]+\/legacy\.yaml$/, // historical input, verbatim
  /^\.guides\/product\/refoundation-request\.md$/, // the request, verbatim
  /^\.guides\/assessment\/(baseline|references)\//, // captured evidence and research notes
  /^\.guides\/testing\/contract\//,              // captured test output
  /^\.guides\/testing\/skills-study\/(results|cases\/[^/]+\/fixture)\//, // captured runs; fixtures are test data
  /^\.guides\/architecture\/adr\/0001-/,          // accepted ADR, not rewritten
];
// Files that describe the earlier contract on purpose.
const HISTORY = [
  /^\.guides\/conversion\.md$/, /^\.guides\/assessment\/refoundation-assessment\.md$/,
  /^\.guides\/architecture\/adr\/0002-/, /^\.guides\/ops-contract\.md$/, /^\.guides\/practice\.md$/,
  /^\.guides\/prompts\/prompt\.refoundation\.yaml$/, /^\.guides\/traceability\//,
  /^\.guides\/testing\/skills-study\//, /^\.guides\/operation\/worklog\//,
  /^examples\/conversion\/[^/]+\/report\.md$/, /^examples\/README\.md$/,
  /^tools\//, /^AGENTS\.md$/, /^VALIDATION\.md$/, /^ROADMAP(\.pt-br)?\.md$/, /^README(\.pt-br)?\.md$/, /^docs\//,
];
const RETIRED_NAMES = /prompt\.schema\.v\d|persona\.schema|personas\.ya?ml|sdd-process|spec\.schema\.json|requirement\.schema|acceptance-criterion\.schema|test-cases\.schema|traceability\.schema|template\.persona/;
const RETIRED_KEYS = /^\s*(-\s+)?(persona|personas|personaDetails|signOffs|conformanceResult)\s*:/;

const active = tracked.filter((f) => !EXCLUDED.some((re) => re.test(f)));
const isHistory = (f) => HISTORY.some((re) => re.test(f));
const scripts = Object.keys(JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).scripts ?? {});
const builtin = new Set(['test', 'ci', 'install', 'start']);

const problems = [];
const allowed = [];
let links = 0;

for (const file of active) {
  if (!/\.(md|ya?ml|json|mjs|html)$/.test(file)) continue;
  const text = readFileSync(resolve(root, file), 'utf8');
  const lines = text.split(/\r?\n/);

  if (file.endsWith('.md')) {
    for (const [i, line] of lines.entries()) {
      for (const m of line.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
        const target = m[1];
        if (/^([a-z][a-z0-9+.-]*:|#|<)/i.test(target)) continue;
        links += 1;
        const path = decodeURIComponent(target.split('#')[0]);
        if (path && !existsSync(resolve(root, dirname(file), path))) problems.push(`${file}:${i + 1}: link to missing file ${target}`);
      }
    }
  }

  for (const [i, line] of lines.entries()) {
    for (const m of line.matchAll(/npm run ([a-z][a-z0-9:_-]*)/g)) {
      if (!scripts.includes(m[1]) && !builtin.has(m[1])) problems.push(`${file}:${i + 1}: \`npm run ${m[1]}\` is not a script of package.json`);
    }
    if (RETIRED_NAMES.test(line)) {
      (isHistory(file) ? allowed : problems).push(`${file}:${i + 1}: retired file name: ${line.trim().slice(0, 120)}`);
    }
    if (/\.ya?ml$/.test(file) && RETIRED_KEYS.test(line)) problems.push(`${file}:${i + 1}: retired key in an active YAML file: ${line.trim()}`);
    if (/persona/i.test(line) && !RETIRED_NAMES.test(line)) {
      const productResearch = /user persona/i.test(line);
      if (isHistory(file) || productResearch) allowed.push(`${file}:${i + 1}: persona (${productResearch ? 'product research' : 'history'}): ${line.trim().slice(0, 100)}`);
      else problems.push(`${file}:${i + 1}: \`persona\` outside the documents that describe history: ${line.trim().slice(0, 120)}`);
    }
  }
}

if (process.argv.includes('--report')) {
  console.log(`Allowed occurrences (${allowed.length}), by file:`);
  const byFile = new Map();
  for (const a of allowed) {
    const f = a.split(':')[0];
    byFile.set(f, (byFile.get(f) ?? 0) + 1);
  }
  for (const [f, n] of [...byFile].sort()) console.log(`  ${String(n).padStart(3)}  ${f}`);
}
console.log(`${active.length} active files, ${links} relative links checked, ${allowed.length} historical or product-research mentions allowed`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('references are clean');
