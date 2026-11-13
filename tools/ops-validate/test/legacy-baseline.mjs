// Baseline adapter: the validation that was canonical at commit ca82040,
// exposed through the same interface as the canonical validator so the
// contract tests can be run against it:
//
//   OPS_VALIDATOR_IMPL=./legacy-baseline.mjs node --test tools/ops-validate/test/
//
// It mirrors VALIDATION.md at that commit: parse YAML, validate with a draft-07
// validator against the schema files of that commit, strict mode off, no format
// assertions, no semantic checks. Schemas are read from Git history, so this
// keeps working after those files leave the active tree.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import { parse } from 'yaml';

const COMMIT = 'ca820409df0aebe2b4669aa168ebc82d6bcecd48';
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const schemaAt = (name) =>
  JSON.parse(execFileSync('git', ['show', `${COMMIT}:.guides/schemas/${name}`], { cwd: repo, encoding: 'utf8' }));

const SCHEMAS = {
  prompt: 'prompt.schema.v2.json',
  agents: 'persona.schema.json',
  worklog: 'worklog.schema.json',
  adr: 'adr.schema.json',
};

function kindOf(file) {
  const name = basename(file);
  if (/^(template\.)?prompt\./.test(name)) return 'prompt';
  if (/^(template\.)?agents\./.test(name)) return 'agents';
  if (/^(template\.)?worklog\./.test(name) || /[\\/]worklog[\\/]/.test(file)) return 'worklog';
  return 'adr';
}

export async function validateFile(file) {
  const kind = kindOf(file);
  const errors = [];
  try {
    let text = readFileSync(file, 'utf8');
    if (file.endsWith('.md')) {
      const m = /^---\r?\n([\s\S]*?)\r?\n---/m.exec(text);
      text = m ? m[1] : '';
    }
    const data = parse(text);
    const ajv = new Ajv({ strict: false, allErrors: true });
    const validate = ajv.compile(schemaAt(SCHEMAS[kind]));
    if (!validate(data)) {
      for (const e of validate.errors) errors.push({ code: 'legacy-validation', pointer: e.instancePath, message: e.message });
    }
  } catch (e) {
    errors.push({ code: 'legacy-validation', message: String(e.message).split('\n')[0] });
  }
  return { file, kind, valid: errors.length === 0, errors, notes: [], resolved: {} };
}

export async function validateSchemas() {
  const ajv = new Ajv({ strict: false });
  return Object.values(SCHEMAS).map((name) => {
    const valid = ajv.validateSchema(schemaAt(name));
    return { file: `${COMMIT.slice(0, 7)}:.guides/schemas/${name}`, valid, errors: ajv.errors ?? [] };
  });
}
