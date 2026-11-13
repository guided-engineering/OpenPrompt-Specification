// Bundle the validator into one dependency-free file: dist/ops-validate.mjs.
//
// The bundle is what travels: it is copied into consumer projects and into the
// Skills, where `npm install` is not available. It embeds the canonical schemas,
// so it is rebuilt whenever a schema or the validator changes. The build is
// deterministic (no timestamps), which lets `--check` prove that the committed
// bundle matches the sources.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, version as esbuildVersion } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const out = resolve(root, 'dist', 'ops-validate.mjs');
const depVersion = (name) => JSON.parse(readFileSync(require.resolve(`${name}/package.json`), 'utf8')).version;

const buildInfo = {
  bundle: 'dist/ops-validate.mjs',
  source: 'https://github.com/guided-engineering/OpenPrompt-Specification/tree/main/tools/ops-validate',
  dependencies: { ajv: depVersion('ajv'), 'ajv-formats': depVersion('ajv-formats'), yaml: depVersion('yaml') },
  esbuild: esbuildVersion,
};

const banner = `#!/usr/bin/env node
// ops-validate: validator for OPS prompts, agent maps, worklog entries and ADRs.
// GENERATED FILE - do not edit. Built from tools/ops-validate/ of
// https://github.com/guided-engineering/OpenPrompt-Specification with \`npm run build\`.
// Bundles ajv ${buildInfo.dependencies.ajv} (MIT), ajv-formats ${buildInfo.dependencies['ajv-formats']} (MIT) and yaml ${buildInfo.dependencies.yaml} (ISC).
// Run it; do not read it:  node ops-validate.mjs --help
import { createRequire as __opsCreateRequire } from 'node:module';
const require = __opsCreateRequire(import.meta.url);`;

const result = await build({
  entryPoints: [resolve(root, 'tools', 'ops-validate', 'cli.mjs')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  minify: true,
  legalComments: 'none',
  write: false,
  banner: { js: banner },
  define: { __OPS_BUILD__: JSON.stringify(buildInfo) },
  logLevel: 'warning',
});

// cli.mjs carries its own shebang; keep exactly one, at the top.
const code = result.outputFiles[0].text.replace(/\r\n/g, '\n').replace(/\n#!\/usr\/bin\/env node\n/, '\n');
const sha256 = createHash('sha256').update(code).digest('hex');

if (process.argv.includes('--check')) {
  let committed = '';
  try {
    committed = readFileSync(out, 'utf8').replace(/\r\n/g, '\n');
  } catch {
    // reported below as a mismatch
  }
  if (committed !== code) {
    console.error('dist/ops-validate.mjs does not match the sources. Run `npm run build` and commit the result.');
    process.exit(1);
  }
  console.log(`dist/ops-validate.mjs matches the sources (sha256 ${sha256})`);
} else {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, code);
  console.log(`wrote dist/ops-validate.mjs (${code.length} bytes, sha256 ${sha256})`);
}
