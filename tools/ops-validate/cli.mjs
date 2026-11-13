#!/usr/bin/env node
// Command line for the canonical OPS validator. Exit codes: 0 every artifact is
// valid, 1 at least one is invalid, 2 the command itself could not run.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { KINDS, SCHEMAS, SCHEMA_FILES, traceMarkdown, validateAll, validateFile } from './lib/validate.mjs';

const BUILD = typeof __OPS_BUILD__ === 'undefined' ? null : __OPS_BUILD__;

const USAGE = `Validate OPS artifacts: prompts, agent maps, worklog entries, ADR front matter.

Usage:
  ops-validate [options] <file>...
  ops-validate --all [--root <dir>]

Options:
  --all            validate every active artifact of the repository, found by convention
  --root <dir>     repository root (default: nearest ancestor that contains .guides/, then .git)
  --kind <kind>    ${KINDS.join(' | ')} (default: inferred from the file name)
  --host <id>      resolve agents for this agent host, for example claude-code
  --resolve        also print how root, workspace, agent, inputs and outputs resolved
  --trace          print the requirement map of each valid prompt as Markdown, and nothing else
  --json           print one JSON report instead of text
  --version        print the identity of the contract this validator enforces
  --help           print this text

Exit codes: 0 valid, 1 invalid, 2 usage or I/O error.`;

function fail(message) {
  process.stderr.write(`ops-validate: ${message}\n\n${USAGE}\n`);
  process.exit(2);
}

function contractIdentity() {
  const schemas = Object.fromEntries(
    KINDS.map((kind) => [SCHEMA_FILES[kind], createHash('sha256').update(JSON.stringify(SCHEMAS[kind])).digest('hex')]),
  );
  return { validator: 'ops-validate', build: BUILD ?? { source: 'working tree' }, schemas };
}

const args = process.argv.slice(2);
const opts = { files: [], all: false, json: false, resolve: false };
for (let i = 0; i < args.length; i += 1) {
  const a = args[i];
  const value = () => {
    i += 1;
    if (i >= args.length) fail(`${a} needs a value`);
    return args[i];
  };
  if (a === '--help' || a === '-h') {
    process.stdout.write(`${USAGE}\n`);
    process.exit(0);
  } else if (a === '--version') {
    process.stdout.write(`${JSON.stringify(contractIdentity(), null, 2)}\n`);
    process.exit(0);
  } else if (a === '--all') opts.all = true;
  else if (a === '--json') opts.json = true;
  else if (a === '--resolve') opts.resolve = true;
  else if (a === '--trace') opts.trace = true;
  else if (a === '--root') opts.root = value();
  else if (a === '--kind') opts.kind = value();
  else if (a === '--host') opts.host = value();
  else if (a.startsWith('-')) fail(`unknown option ${a}`);
  else opts.files.push(a);
}
if (opts.kind && !KINDS.includes(opts.kind)) fail(`unknown kind ${opts.kind}`);
if (opts.all && opts.files.length) fail('--all takes no file arguments');
if (!opts.all && opts.files.length === 0) fail('no file given');
if (opts.root && !existsSync(opts.root)) fail(`root ${opts.root} does not exist`);
for (const f of opts.files) if (!existsSync(f)) fail(`${f} does not exist`);

const cwd = process.cwd();
const show = (p) => (p && p !== 'built-in' ? relative(cwd, p).replace(/\\/g, '/') || '.' : p);

let results;
let schemas = [];
if (opts.all) {
  const all = await validateAll(opts.root ?? cwd, { host: opts.host });
  results = all.results;
  schemas = all.schemas;
} else {
  results = [];
  for (const f of opts.files) results.push(await validateFile(resolve(f), { root: opts.root, kind: opts.kind, host: opts.host }));
}

const invalid = results.filter((r) => !r.valid).length + schemas.filter((s) => !s.valid).length;

if (opts.trace) {
  const bad = results.filter((r) => !r.valid || r.kind !== 'prompt');
  if (bad.length) {
    for (const r of bad) process.stderr.write(`${show(r.file)}: not a valid prompt; no requirement map\n`);
    process.exit(1);
  }
  const maps = results.map((r) => traceMarkdown(r.file) ?? `## ${show(r.file)}\n\nThis prompt declares no requirements.\n`);
  process.stdout.write(maps.join('\n'));
  process.exit(0);
} else if (opts.json) {
  process.stdout.write(`${JSON.stringify({ contract: contractIdentity(), results, schemas, summary: { checked: results.length + schemas.length, invalid } }, null, 2)}\n`);
} else {
  const lines = [];
  for (const s of schemas) {
    lines.push(`${s.file}: ${s.valid ? 'valid (schema)' : 'INVALID (schema)'}`);
    for (const e of s.errors) lines.push(`  ${e.code}: ${e.message}`);
  }
  for (const r of results) {
    lines.push(`${show(r.file)}: ${r.valid ? 'valid' : 'INVALID'} (${r.kind ?? 'unknown kind'})`);
    for (const e of r.errors) lines.push(`  ${e.code}: ${e.message}${e.pointer ? ` [at ${e.pointer}]` : ''}`);
    for (const n of r.notes) lines.push(`  note: ${n}`);
    if (opts.resolve && r.valid && r.kind === 'prompt') {
      const x = r.resolved;
      lines.push(`  root: ${show(x.root)}`);
      lines.push(`  workspace: ${show(x.workspace)}`);
      lines.push(`  agent: ${x.agent.id} -> ${x.agent.executor}${x.agent.profile ? ` (${show(x.agent.profile)})` : ''} [map: ${show(x.agent.source)}]`);
      for (const p of x.inputs ?? []) lines.push(`  input: ${show(p)}`);
      for (const p of x.outputs ?? []) lines.push(`  output: ${show(p)}`);
    }
  }
  const checked = results.length + schemas.length;
  lines.push(`${checked} checked, ${checked - invalid} valid, ${invalid} invalid`);
  process.stdout.write(`${lines.join('\n')}\n`);
}
process.exit(invalid ? 1 : 0);
