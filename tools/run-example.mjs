// Run the end-to-end example in examples/project and fail if any part of it
// does not hold on the committed state:
//   1. the prompt, the agent map and every worklog entry validate;
//   2. every verification command of the prompt exits 0 in its workspace;
//   3. the execution entry is `completed` and names the same checks as passed.
// The example is illustrative. It is not one of the measured study cases.
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { validateAll, validateFile } from './ops-validate/lib/validate.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const project = join(root, 'examples', 'project');
const promptFile = join(project, '.guides', 'prompts', 'prompt.slug.clean-separators.yaml');
let failed = false;
const report = (ok, text) => {
  if (!ok) failed = true;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${text}`);
};

const all = await validateAll(project);
for (const r of all.results) report(r.valid, `${r.kind} ${r.file.slice(project.length + 1).replace(/\\/g, '/')}${r.valid ? '' : `: ${r.errors.map((e) => e.code).join(', ')}`}`);

const resolved = (await validateFile(promptFile)).resolved;
const prompt = parse(readFileSync(promptFile, 'utf8'));
for (const check of prompt.verification) {
  if (!check.run) {
    console.log(`     ${check.id}: observed, not a command (${check.expect})`);
    continue;
  }
  const out = spawnSync(check.run, { cwd: resolved.workspace, shell: true, encoding: 'utf8' });
  report(out.status === 0, `check ${check.id}: \`${check.run}\` exits ${out.status} in ${resolved.workspace.slice(root.length + 1).replace(/\\/g, '/')}`);
}

const worklogDir = join(project, '.guides', 'operation', 'worklog');
let entries = [];
try {
  entries = readdirSync(worklogDir).filter((f) => f.endsWith('.md'));
} catch {
  // reported below
}
const frontMatter = (file) => parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(join(worklogDir, file), 'utf8'))[1]);
const execution = entries.map((f) => ({ file: f, fm: frontMatter(f) })).find((e) => e.fm.mode === 'execute' && e.fm.prompt?.id === prompt.id);
report(Boolean(execution), 'an execution entry for the prompt exists');
if (execution) {
  report(execution.fm.status === 'completed', `${execution.file} is completed`);
  for (const check of prompt.verification) {
    const recorded = (execution.fm.checks ?? []).find((c) => c.id === check.id);
    report(recorded?.result === 'pass', `${execution.file} records check ${check.id} as pass`);
  }
}
process.exit(failed ? 1 : 0);
