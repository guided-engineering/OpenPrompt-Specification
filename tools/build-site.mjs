// Build the static website into docs/ (served by GitHub Pages from the /docs
// folder). Content comes from the canonical documents, the end-to-end example
// and the study result data; nothing is typed twice. The build is
// deterministic, so `--check` can prove that docs/ matches its sources.
//
//   node tools/build-site.mjs           write docs/
//   node tools/build-site.mjs --check   fail if docs/ is out of date
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'docs');
const REPO = 'https://github.com/guided-engineering/OpenPrompt-Specification';
const SKILLS_REPO = 'https://github.com/guided-engineering/skills';
const read = (rel) => readFileSync(join(root, rel), 'utf8').replace(/\r\n/g, '\n');
const exists = (rel) => existsSync(join(root, rel));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Canonical documents that are rendered as pages. A link to one of them from
// any rendered document becomes a link to its page; any other repository path
// becomes a link to the file on GitHub.
const PAGES = [
  { file: 'index.html', nav: 'Overview', title: 'Guided Engineering', source: 'site/index.md' },
  { file: 'practice.html', nav: 'Practice', title: 'The practice', source: '.guides/practice.md' },
  { file: 'quick-start.html', nav: 'Quick start', title: 'Quick start', source: 'site/quick-start.md' },
  { file: 'example.html', nav: 'Example', title: 'An OPS example, end to end', source: 'site/example.md' },
  { file: 'skills.html', nav: 'Skills and agents', title: 'Skills and agents', source: 'site/skills.md' },
  { file: 'results.html', nav: 'Results', title: 'Local study results', source: 'site/results.md' },
  { file: 'contract.html', nav: 'Specification', title: 'The OPS prompt contract', source: '.guides/ops-contract.md' },
  { file: 'conversion.html', nav: null, title: 'Converting from the earlier contract', source: '.guides/conversion.md' },
  { file: 'contribute.html', nav: 'Contribute', title: 'Specification sources and contribution', source: 'site/contribute.md' },
];
const pageOf = new Map(PAGES.map((p) => [posix.normalize(p.source), p.file]));

// Files the site serves besides its pages; a link to one of them stays as written.
const ASSETS = new Set([
  ...readdirSync(join(root, '.guides', 'schemas')).filter((f) => f.endsWith('.json')).map((f) => `schemas/${f}`),
  'ops-validate.mjs', 'ops-validate.licenses.txt', 'data/study-results.json',
]);

function rewriteLink(href, fromSource) {
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(href)) return href;
  const [path, hash] = href.split('#');
  if (path.endsWith('.html') || ASSETS.has(posix.normalize(path))) return href;
  const target = posix.normalize(posix.join(posix.dirname(fromSource), path));
  if (pageOf.has(target)) return `${pageOf.get(target)}${hash ? `#${hash}` : ''}`;
  if (target.startsWith('..')) return href;
  const isDir = existsSync(join(root, target)) && statSync(join(root, target)).isDirectory();
  return `${REPO}/${isDir ? 'tree' : 'blob'}/main/${target}${hash ? `#${hash}` : ''}`;
}

function renderMarkdown(markdown, source) {
  const used = new Map();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        let id = slug(html) || 'section';
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const url = rewriteLink(href, source);
        const external = /^https?:/.test(url);
        return `<a href="${esc(url)}"${title ? ` title="${esc(title)}"` : ''}${external ? ' rel="noopener"' : ''}>${text}</a>`;
      },
      table(token) {
        const head = token.header.map((c) => `<th scope="col"${c.align ? ` class="${c.align}"` : ''}>${this.parser.parseInline(c.tokens)}</th>`).join('');
        const rows = token.rows.map((r) => `<tr>${r.map((c) => `<td${c.align ? ` class="${c.align}"` : ''}>${this.parser.parseInline(c.tokens)}</td>`).join('')}</tr>`).join('\n');
        return `<div class="table-wrap" tabindex="0" role="region" aria-label="Table">\n<table>\n<thead><tr>${head}</tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>\n</div>\n`;
      },
      code({ text, lang }) {
        return `<pre${lang ? ` data-lang="${esc(lang)}"` : ''}><code>${esc(text)}</code></pre>\n`;
      },
    },
  });
  return marked.parse(markdown);
}

// ------------------------------------------------------------------ includes
// A site source may pull in generated blocks with {{name}} or {{file:path}}.
const fence = (text, lang) => `\n\`\`\`${lang}\n${text.replace(/\n+$/, '')}\n\`\`\`\n`;
const stripFrontMatter = (text) => text.replace(/^---\n[\s\S]*?\n---\n+/, '');

function resultsBlock() {
  const file = '.guides/testing/skills-study/results/results.json';
  if (!exists(file)) return '> The study has not been run yet. This page is generated from its result data and will show the scores once they exist.\n';
  const r = JSON.parse(read(file));
  const conditions = r.retainedConditions;
  const label = { WITHOUT_SKILLS: 'Without Skills', INITIAL_SKILLS: 'With Skills (first version)', REFINED_SKILLS: 'With Skills (refined)' };
  const cell = (x) => (x.state === 'SCORED' ? `${x.effective}${x.raw !== x.effective ? ` (raw ${x.raw}; ${x.hardFailures.join(', ')})` : ''}${x.status === 'TIMEOUT' ? ' — stopped at the time limit' : ''}` : x.state.replace('_', ' ').toLowerCase());
  const out = [];
  out.push(r.studyComplete ? '' : '> **Incomplete.** At least one required run is missing or could not be scored. Nothing on this page is a final result.\n');
  out.push(`| Case | What it tests | ${conditions.map((c) => label[c]).join(' | ')} | Change |`, `|---|---|${conditions.map(() => '---:').join('|')}|---:|`);
  for (const c of r.cases) {
    const s = r.scores[c.id];
    const b = s.WITHOUT_SKILLS;
    const f = s[r.finalCondition];
    const delta = b.state === 'SCORED' && f.state === 'SCORED' ? `${f.effective - b.effective > 0 ? '+' : ''}${f.effective - b.effective}` : 'n/a';
    out.push(`| **${c.id}** ${c.split === 'held-out' ? '(held out)' : ''} | ${c.title} | ${conditions.map((k) => cell(s[k])).join(' | ')} | ${delta} |`);
  }
  out.push('', 'Scores are out of 100. A case passes at 80 or more with no hard failure; a hard failure sets the score to 0 and the raw score is shown in brackets.', '');
  out.push('### Hypotheses', '', '| | Hypothesis | Verdict in this sample | Basis |', '|---|---|---|---|');
  for (const [id, h] of Object.entries(r.hypotheses)) out.push(`| ${id} | ${h.statement} | **${h.verdict}** | ${h.why}${h.meanDelta !== undefined && h.meanDelta !== null ? ` (baseline mean ${h.meanBaseline}, with Skills ${h.meanWithSkills})` : ''} |`);
  const e = r.efficiency[r.finalCondition];
  if (e) {
    const pct = (x) => (x === null ? 'not available' : `${x >= 0 ? '+' : ''}${Math.round(x * 100)}%`);
    out.push('', '### Cost of using the Skills', '', '| Measure | Matched pairs | Median change against the baseline |', '|---|---:|---:|');
    out.push(`| Elapsed time | ${e.elapsedTime.eligiblePairs} | ${pct(e.elapsedTime.medianOverhead)} |`, `| Tokens processed | ${e.tokensProcessed.eligiblePairs} | ${pct(e.tokensProcessed.medianOverhead)} |`, `| Output tokens | ${e.outputTokens.eligiblePairs} | ${pct(e.outputTokens.medianOverhead)} |`);
  }
  const rd = r.readiness;
  out.push('', '### Readiness by the local thresholds', '', `All five cases pass: **${rd.allCasesPass ? 'yes' : 'no'}**. Mean score: **${rd.mean ?? 'n/a'}** (threshold 85). Hard failures: **${rd.hardFailures.length}**. Verdict: **${rd.complete ? (rd.ready ? 'ready' : 'not ready') : 'not determined'}**.`);
  if (r.activationProbes) {
    const p = r.activationProbes;
    out.push('', '### Does the right Skill load?', '', '| Skill | Request | Expected | Observed |', '|---|---|---|---|');
    for (const x of p.probes) out.push(`| \`${x.skill}\` | ${x.kind} | ${x.expectActivation ? 'loads' : 'stays out'} | ${x.outcome} |`);
  }
  out.push('', `### Attempts`, '', `${r.budget.attempts} evaluation attempts of at most ${r.budget.attemptLimit}; ${r.budget.evaluatedMinutes} minutes of evaluated run time of at most ${r.budget.minuteLimit}.`);
  return `${out.join('\n')}\n`;
}

function include(markdown) {
  return markdown.replace(/^\{\{([a-z]+)(?::([^}]+))?\}\}$/gm, (_, kind, arg) => {
    if (kind === 'results') return resultsBlock();
    if (kind === 'file') {
      const [path, lang] = arg.split('|');
      if (!exists(path)) return `> \`${path}\` does not exist yet.\n`;
      return fence(read(path), lang ?? '');
    }
    if (kind === 'body') return exists(arg) ? stripFrontMatter(read(arg)) : `> \`${arg}\` does not exist yet.\n`;
    if (kind === 'frontmatter') return exists(arg) ? fence(/^---\n([\s\S]*?)\n---/.exec(read(arg))?.[1] ?? '', 'yaml') : `> \`${arg}\` does not exist yet.\n`;
    throw new Error(`unknown include {{${kind}}}`);
  });
}

// ------------------------------------------------------------------ pages
const CSS = read('site/site.css');
const SCRIPT = `document.querySelectorAll('pre').forEach(function (pre) {
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'copy'; b.textContent = 'Copy';
  b.addEventListener('click', function () {
    navigator.clipboard.writeText(pre.querySelector('code').textContent).then(function () {
      b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1500);
    });
  });
  pre.appendChild(b);
});`;

function page(p, body) {
  const nav = PAGES.filter((x) => x.nav).map((x) => `<li><a href="${x.file}"${x.file === p.file ? ' aria-current="page"' : ''}>${esc(x.nav)}</a></li>`).join('\n        ');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)}${p.file === 'index.html' ? '' : ' · Guided Engineering'}</title>
  <meta name="description" content="Guided Engineering: a practice for working with coding agents through validated task contracts (OPS prompts), portable Skills and evidence.">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <div class="wrap">
      <a class="brand" href="index.html">Guided Engineering</a>
      <nav aria-label="Main">
        <ul>
        ${nav}
        </ul>
      </nav>
    </div>
  </header>
  <main id="main" class="wrap">
${body}
  </main>
  <footer>
    <div class="wrap">
      <p>Source: <a href="${REPO}" rel="noopener">OpenPrompt-Specification</a> · Skills: <a href="${SKILLS_REPO}" rel="noopener">guided-engineering/skills</a> · MIT License</p>
      <p>This site is generated from the repository by <code>npm run site</code>. Page source: <a href="${REPO}/blob/main/${p.source}" rel="noopener"><code>${esc(p.source)}</code></a></p>
    </div>
  </footer>
  <script src="assets/site.js"></script>
</body>
</html>
`;
}

const files = new Map();
for (const p of PAGES) {
  if (!exists(p.source)) throw new Error(`site source missing: ${p.source}`);
  files.set(p.file, page(p, renderMarkdown(include(read(p.source)), p.source)));
}
files.set('assets/site.css', CSS);
files.set('assets/site.js', `${SCRIPT}\n`);
files.set('.nojekyll', '');
// The schemas are served at the URLs their $id names, and the validator beside them.
for (const name of readdirSync(join(root, '.guides', 'schemas')).filter((f) => f.endsWith('.json')).sort()) files.set(`schemas/${name}`, read(`.guides/schemas/${name}`));
files.set('ops-validate.mjs', read('dist/ops-validate.mjs'));
files.set('ops-validate.licenses.txt', read('dist/ops-validate.licenses.txt'));
if (exists('.guides/testing/skills-study/results/results.json')) files.set('data/study-results.json', read('.guides/testing/skills-study/results/results.json'));

// Every internal link must resolve inside the generated site.
const problems = [];
for (const [name, html] of files) {
  if (!name.endsWith('.html')) continue;
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
    const [path, hash] = href.split('#');
    const target = path === '' ? name : posix.normalize(posix.join(posix.dirname(name), path));
    if (!files.has(target)) problems.push(`${name}: link to ${href} does not resolve in the site`);
    else if (hash && target.endsWith('.html')) {
      const targetIds = target === name ? ids : new Set([...files.get(target).matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]));
      if (!targetIds.has(hash)) problems.push(`${name}: anchor #${hash} does not exist in ${target}`);
    }
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

const walk = (dir, base = dir) => (existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name), base) : [relative(base, join(dir, e.name)).replace(/\\/g, '/')])) : []);
if (process.argv.includes('--check')) {
  const onDisk = walk(OUT).sort();
  const expected = [...files.keys()].sort();
  const stale = expected.filter((f) => !onDisk.includes(f) || readFileSync(join(OUT, f), 'utf8').replace(/\r\n/g, '\n') !== files.get(f));
  const extra = onDisk.filter((f) => !expected.includes(f));
  if (stale.length || extra.length) {
    console.error(`docs/ is out of date. Run \`npm run site\`.\n${[...stale.map((f) => `  stale: ${f}`), ...extra.map((f) => `  not generated: ${f}`)].join('\n')}`);
    process.exit(1);
  }
  console.log(`docs/ matches its sources (${expected.length} files)`);
} else {
  rmSync(OUT, { recursive: true, force: true });
  for (const [name, text] of files) {
    mkdirSync(dirname(join(OUT, name)), { recursive: true });
    writeFileSync(join(OUT, name), text);
  }
  console.log(`wrote ${files.size} files to docs/`);
}
