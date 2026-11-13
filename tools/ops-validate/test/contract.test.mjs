// Contract tests for the canonical OPS artifacts.
//
// The implementation under test is selected with OPS_VALIDATOR_IMPL (a module
// path relative to this directory). The default is the canonical validator.
// `OPS_VALIDATOR_IMPL=./legacy-baseline.mjs` runs the same expectations against
// the validation that was canonical at commit ca82040, which is how the
// "failing before, passing after" evidence in .guides/testing/ was produced.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..', '..', '..');
const implPath = process.env.OPS_VALIDATOR_IMPL ?? '../lib/validate.mjs';
const impl = await import(implPath);
const cli = process.env.OPS_VALIDATOR_CLI ? resolve(repo, process.env.OPS_VALIDATOR_CLI) : resolve(here, '..', 'cli.mjs');

const posix = (p) => p.replace(/\\/g, '/');
const codes = (result) => result.errors.map((e) => e.code);
const describeErrors = (result) => JSON.stringify(result.errors, null, 2);

// ----------------------------------------------------------------- schemas
test('every canonical schema is a valid draft-07 schema and compiles in strict mode', async () => {
  const results = await impl.validateSchemas();
  assert.ok(results.length >= 3, 'expected at least the prompt, agents and worklog schemas');
  for (const r of results) assert.equal(r.valid, true, `${r.file}: ${JSON.stringify(r.errors)}`);
});

// ----------------------------------------------------------------- valid examples
const VALID = [
  'examples/valid/prompt.minimal.yaml',
  'examples/valid/worklog.blocked-run.md',
  'examples/valid/worklog.completed-run.md',
  'examples/project/.guides/agents/agents.yaml',
  'examples/project/.guides/prompts/prompt.slug.clean-separators.yaml',
  'examples/invalid/.guides/agents/agents.yaml',
  'examples/invalid/.guides/prompts/prompt.contract-fixture.yaml',
  '.guides/agents/agents.yaml',
  '.guides/architecture/adr/0001-choose-spec-format.md',
];
for (const file of VALID) {
  test(`valid: ${file}`, async () => {
    const result = await impl.validateFile(join(repo, file));
    assert.deepEqual(codes(result), [], describeErrors(result));
    assert.equal(result.valid, true);
  });
}

// ----------------------------------------------------------------- invalid examples
const invalidDir = join(repo, 'examples', 'invalid');
const expected = JSON.parse(readFileSync(join(invalidDir, 'expected.json'), 'utf8'));
for (const [file, expectedCodes] of Object.entries(expected)) {
  test(`invalid: ${file} is rejected with ${expectedCodes.join(', ')}`, async () => {
    const result = await impl.validateFile(join(invalidDir, file));
    assert.equal(result.valid, false, 'the fixture was accepted');
    for (const code of expectedCodes) {
      assert.ok(codes(result).includes(code), `missing ${code}; got ${describeErrors(result)}`);
    }
  });
}

// ----------------------------------------------------------------- conversion examples
test('conversion example: the legacy prompt is rejected and its conversion is accepted', async () => {
  const dir = join(repo, 'examples', 'conversion', 'onboarding');
  const legacy = await impl.validateFile(join(dir, 'legacy.yaml'), { kind: 'prompt' });
  assert.equal(legacy.valid, false);
  for (const code of ['legacy-api-version', 'legacy-persona', 'legacy-field', 'agent-missing', 'verification-missing']) {
    assert.ok(codes(legacy).includes(code), `missing ${code}; got ${describeErrors(legacy)}`);
  }
  const canonical = await impl.validateFile(join(dir, '.guides', 'prompts', 'prompt.onboarding.yaml'));
  assert.deepEqual(codes(canonical), [], describeErrors(canonical));
  assert.equal(canonical.resolved.agent.source, 'built-in');
});

test('every invalid fixture has an expectation', () => {
  const onDisk = readdirSync(invalidDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name !== 'expected.json')
    .map((e) => e.name)
    .sort();
  assert.deepEqual(onDisk, Object.keys(expected).sort());
});

// ----------------------------------------------------------------- resolution
test('workspace, inputs, outputs and agent resolve against the repository root', async () => {
  const root = join(repo, 'examples', 'project');
  const result = await impl.validateFile(join(root, '.guides', 'prompts', 'prompt.slug.clean-separators.yaml'));
  assert.equal(result.valid, true, describeErrors(result));
  const r = result.resolved;
  assert.equal(posix(r.root), posix(root));
  assert.equal(posix(r.workspace), posix(join(root, 'packages', 'slug')));
  assert.deepEqual(r.inputs.map(posix), [
    posix(join(root, 'packages', 'slug', 'src', 'slug.mjs')),
    posix(join(root, 'packages', 'slug', 'test', 'slug.test.mjs')),
  ]);
  assert.deepEqual(r.outputs.map(posix), [posix(join(root, 'packages', 'slug', 'src', 'slug.mjs'))]);
  assert.equal(r.agent.id, 'guided-engineer');
  assert.equal(posix(r.agent.source), posix(join(root, '.guides', 'agents', 'agents.yaml')));
  assert.equal(r.agent.executor, 'current-executor');
});

function scratchRoot() {
  const dir = mkdtempSync(join(tmpdir(), 'ops-contract-'));
  mkdirSync(join(dir, '.guides', 'prompts'), { recursive: true });
  return dir;
}
const minimal = readFileSync(join(repo, 'examples', 'valid', 'prompt.minimal.yaml'), 'utf8');

test('without an agent map, the built-in map resolves only `guided-engineer`', async () => {
  const dir = scratchRoot();
  try {
    const ok = join(dir, '.guides', 'prompts', 'prompt.ok.yaml');
    writeFileSync(ok, minimal);
    const okResult = await impl.validateFile(ok);
    assert.equal(okResult.valid, true, describeErrors(okResult));
    assert.equal(okResult.resolved.agent.source, 'built-in');

    const other = join(dir, '.guides', 'prompts', 'prompt.other.yaml');
    writeFileSync(other, minimal.replace('agent: guided-engineer', 'agent: reviewer'));
    const otherResult = await impl.validateFile(other);
    assert.ok(codes(otherResult).includes('agent-unresolved'), describeErrors(otherResult));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a declared native profile resolves for its host and to the current executor elsewhere', async () => {
  const dir = scratchRoot();
  try {
    mkdirSync(join(dir, '.guides', 'agents'), { recursive: true });
    mkdirSync(join(dir, '.claude', 'agents'), { recursive: true });
    writeFileSync(join(dir, '.claude', 'agents', 'guided-engineer.md'), '---\nname: guided-engineer\ndescription: test\n---\n');
    writeFileSync(
      join(dir, '.guides', 'agents', 'agents.yaml'),
      'apiVersion: guided-engineering/v1\nagents:\n  - id: guided-engineer\n    description: Default executor.\n    profiles:\n      claude-code: .claude/agents/guided-engineer.md\n',
    );
    const file = join(dir, '.guides', 'prompts', 'prompt.ok.yaml');
    writeFileSync(file, minimal);

    const onClaude = await impl.validateFile(file, { host: 'claude-code' });
    assert.equal(onClaude.valid, true, describeErrors(onClaude));
    assert.equal(onClaude.resolved.agent.executor, 'native-profile');
    assert.equal(posix(onClaude.resolved.agent.profile), posix(join(dir, '.claude', 'agents', 'guided-engineer.md')));

    const onCodex = await impl.validateFile(file, { host: 'codex' });
    assert.equal(onCodex.valid, true, describeErrors(onCodex));
    assert.equal(onCodex.resolved.agent.executor, 'current-executor');
    assert.equal(onCodex.resolved.agent.profile, null);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('`$schema` must lead to the canonical prompt schema', async () => {
  const dir = scratchRoot();
  try {
    mkdirSync(join(dir, '.guides', 'schemas'), { recursive: true });
    cpSync(join(repo, '.guides', 'schemas', 'prompt.schema.json'), join(dir, '.guides', 'schemas', 'prompt.schema.json'));
    const canonical = JSON.parse(readFileSync(join(repo, '.guides', 'schemas', 'prompt.schema.json'), 'utf8'));

    const relative = join(dir, '.guides', 'prompts', 'prompt.relative.yaml');
    writeFileSync(relative, `$schema: ../schemas/prompt.schema.json\n${minimal}`);
    assert.equal((await impl.validateFile(relative)).valid, true);

    const byId = join(dir, '.guides', 'prompts', 'prompt.by-id.yaml');
    writeFileSync(byId, `$schema: ${canonical.$id}\n${minimal}`);
    assert.equal((await impl.validateFile(byId)).valid, true);

    const elsewhere = join(dir, '.guides', 'prompts', 'prompt.elsewhere.yaml');
    writeFileSync(elsewhere, `$schema: https://example.com/some-other.schema.json\n${minimal}`);
    assert.ok(codes(await impl.validateFile(elsewhere)).includes('schema-path'));

    // A local copy that drifted from the canonical schema is not the canonical schema.
    writeFileSync(join(dir, '.guides', 'schemas', 'prompt.schema.json'), JSON.stringify({ ...canonical, title: 'Drifted copy' }));
    assert.ok(codes(await impl.validateFile(relative)).includes('schema-path'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ----------------------------------------------------------------- command line
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd: repo, encoding: 'utf8' });

test('CLI exits 0 for a valid file, 1 for an invalid file, 2 for a usage error', () => {
  assert.equal(run('examples/valid/prompt.minimal.yaml').status, 0);
  const invalid = run('examples/invalid/prompt.unresolved-agent.yaml');
  assert.equal(invalid.status, 1);
  assert.match(invalid.stdout + invalid.stderr, /agent-unresolved/);
  assert.equal(run('examples/valid/does-not-exist.yaml').status, 2);
  assert.equal(run().status, 2);
});

test('CLI --json reports machine-readable results', () => {
  const out = run('--json', 'examples/valid/prompt.minimal.yaml', 'examples/invalid/prompt.duplicate-key.yaml');
  assert.equal(out.status, 1);
  const report = JSON.parse(out.stdout);
  assert.equal(report.results.length, 2);
  assert.equal(report.results[0].valid, true);
  assert.equal(report.results[1].errors[0].code, 'yaml-duplicate-key');
});

test('CLI --all validates every active artifact of this repository', () => {
  const out = run('--all');
  assert.equal(out.status, 0, out.stdout + out.stderr);
});

// ----------------------------------------------------------------- bundle
const bundle = join(repo, 'dist', 'ops-validate.mjs');

test('the committed bundle is built from the current sources', () => {
  const out = spawnSync(process.execPath, [join(repo, 'tools', 'build-validator.mjs'), '--check'], { cwd: repo, encoding: 'utf8' });
  assert.equal(out.status, 0, out.stdout + out.stderr);
});

test('the bundle reports the same result as the sources for every example', async () => {
  const files = [...VALID.map((f) => join(repo, f)), ...Object.keys(expected).map((f) => join(invalidDir, f))];
  const out = spawnSync(process.execPath, [bundle, '--json', ...files], { cwd: repo, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  assert.ok(out.status === 0 || out.status === 1, out.stderr);
  const report = JSON.parse(out.stdout);
  assert.equal(report.results.length, files.length);
  for (const [i, file] of files.entries()) {
    const fromSource = await impl.validateFile(file);
    assert.equal(report.results[i].valid, fromSource.valid, file);
    assert.deepEqual(report.results[i].errors, fromSource.errors, file);
  }
});

test('the bundle runs from a directory that has no node_modules', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ops-bundle-'));
  try {
    cpSync(bundle, join(dir, 'ops-validate.mjs'));
    mkdirSync(join(dir, '.guides', 'prompts'), { recursive: true });
    writeFileSync(join(dir, '.guides', 'prompts', 'prompt.ok.yaml'), minimal);
    const out = spawnSync(process.execPath, ['ops-validate.mjs', '.guides/prompts/prompt.ok.yaml'], { cwd: dir, encoding: 'utf8' });
    assert.equal(out.status, 0, out.stdout + out.stderr);
    assert.match(out.stdout, /valid \(prompt\)/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
