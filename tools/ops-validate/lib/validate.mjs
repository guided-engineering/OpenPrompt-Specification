// Canonical validator for OPS artifacts: prompts, agent maps, worklog entries
// and ADR front matter. The JSON Schemas under .guides/schemas/ are the single
// source of truth for structure; this module adds the rules a schema cannot
// express. Normative text: .guides/ops-contract.md.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { parseAllDocuments } from 'yaml';

import promptSchema from '../../../.guides/schemas/prompt.schema.json' with { type: 'json' };
import agentsSchema from '../../../.guides/schemas/agents.schema.json' with { type: 'json' };
import worklogSchema from '../../../.guides/schemas/worklog.schema.json' with { type: 'json' };
import adrSchema from '../../../.guides/schemas/adr.schema.json' with { type: 'json' };

export const SCHEMAS = { prompt: promptSchema, agents: agentsSchema, worklog: worklogSchema, adr: adrSchema };
export const SCHEMA_FILES = {
  prompt: 'prompt.schema.json',
  agents: 'agents.schema.json',
  worklog: 'worklog.schema.json',
  adr: 'adr.schema.json',
};
export const KINDS = Object.keys(SCHEMAS);

/** The agent map of a repository that does not declare one. */
export const DEFAULT_AGENT_MAP = Object.freeze({
  apiVersion: 'guided-engineering/v1',
  agents: [
    Object.freeze({
      id: 'guided-engineer',
      description: 'Default engineering executor. Resolves to the current executor of the running agent host.',
    }),
  ],
});

// Fields of the earlier contract. Naming them turns a generic "unknown field"
// into a pointer to what replaced them.
const LEGACY = {
  prompt: {
    personaDetails: 'removed: executors are named by `agent` and described in the agent map, not inside a prompt',
    category: 'removed: classification has no execution meaning; keep it as a tag',
    difficulty: 'removed: it has no execution meaning',
    language: 'removed: state language requirements in `constraints` or in output `rules`',
    businessContext: 'removed: merge it into `context`',
    riskLevel: 'removed: state the risk in `context`',
    specId: 'removed: declare `requirements` in the prompt instead',
    specVersion: 'removed: declare `requirements` in the prompt instead',
    requirementIds: 'removed: declare `requirements` in the prompt and reference them from steps and checks',
    acceptanceCriteriaIds: 'removed: acceptance checks are the `verification` list',
    parentPromptId: 'removed: Git history records lineage',
    executedBy: 'removed from the definition: what ran belongs to a worklog entry (`executor`)',
    executedAt: 'removed from the definition: when it ran belongs to a worklog entry (`date`)',
    evidence: 'removed from the definition: evidence belongs to a worklog entry',
    approvals: 'removed from the definition: approvals are human decisions recorded in a worklog entry',
    deprecation: 'removed: retire a prompt by deleting it; Git history keeps it',
    supersededBy: 'removed: retire a prompt by deleting it; Git history keeps it',
  },
  step: {
    output: 'removed: declare artifacts once, in the top-level `output` list',
    timeout: 'removed: use `limits.timeBudgetMinutes` for the whole run',
    retries: 'removed: use `limits.repairAttempts` for the whole run',
    onFailure: 'removed: a failed check is diagnosed and repaired within `limits`, never skipped',
    if: 'removed: conditions are not evaluated; write the condition into the action text',
    description: 'removed: describe the work in `title` and `actions`',
    action: 'removed: use the `actions` list',
    expectedOutcome: 'removed: state expected outcomes as `verification` checks',
  },
  output: {
    language: 'removed: the file extension shows the format; put language requirements in `rules`',
  },
  agents: {
    type: 'removed: the file is an agent map, not a persona list',
    version: 'removed: Git history records revisions of the map',
    personas: 'removed: list `agents`; a persona catalogue is not an agent map',
  },
  agent: {
    title: 'removed: an agent entry is a mapping, not a role description',
    stack: 'removed: an agent entry is a mapping, not a role description',
    responsibilities: 'removed: an agent entry is a mapping, not a role description',
    role: 'removed: an agent entry is a mapping, not a role description',
    principles: 'removed: an agent entry is a mapping, not a role description',
  },
  worklog: {
    stage: 'removed: lifecycle stages are not part of the contract; use `mode` and `status`',
    specId: 'removed: name the prompt that was run in `prompt`',
    specVersion: 'removed: name the prompt that was run in `prompt`',
    requirementIds: 'removed: requirements are traced through the prompt and its checks',
    adrIds: 'removed: link ADRs from the Markdown body',
    conformanceResult: 'removed: report `status` and per-check results; there is no demonstration verdict',
    signOffs: 'removed: record human decisions in `approvals`; a role label cannot sign',
  },
};
const LEGACY_API_VERSIONS = new Set(['ops/v1', 'ops/v2', '1.0', 'v1']);

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);
const validators = Object.fromEntries(KINDS.map((kind) => [kind, ajv.compile(SCHEMAS[kind])]));

// ------------------------------------------------------------------ helpers
const err = (code, message, pointer) => (pointer === undefined ? { code, message } : { code, message, pointer });
const isDir = (p) => existsSync(p) && statSync(p).isDirectory();
const isFile = (p) => existsSync(p) && statSync(p).isFile();
const within = (parent, child) => {
  const rel = relative(parent, child);
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
};
const toPosix = (p) => p.split(sep).join('/');

/** Infer the artifact kind from the file name; null when it cannot be told. */
export function kindOf(file) {
  const name = basename(file).toLowerCase();
  const path = toPosix(file).toLowerCase();
  if (/^(template\.)?prompt(\..*)?\.ya?ml$/.test(name)) return 'prompt';
  if (/^(template\.)?agents(\..*)?\.ya?ml$/.test(name)) return 'agents';
  if (name.endsWith('.md')) {
    if (/^(template\.)?worklog\./.test(name) || path.includes('/worklog/')) return 'worklog';
    if (/^(template\.)?adr\./.test(name) || /^\d{4}-/.test(name) || path.includes('/adr/')) return 'adr';
  }
  if (/\.ya?ml$/.test(name) && path.includes('/.guides/prompts/')) return 'prompt';
  return null;
}

/**
 * Repository root of an artifact: the explicit option, else the nearest
 * ancestor directory that contains `.guides/`, else the nearest one that
 * contains `.git`, else the artifact's own directory.
 */
export function findRoot(file, explicit) {
  if (explicit) return resolve(explicit);
  const start = dirname(resolve(file));
  for (const marker of ['.guides', '.git']) {
    for (let dir = start; ; dir = dirname(dir)) {
      if (existsSync(join(dir, marker))) return dir;
      if (dirname(dir) === dir) break;
    }
  }
  return start;
}

function parseYaml(text) {
  const errors = [];
  const notes = [];
  const docs = parseAllDocuments(text, { uniqueKeys: true, strict: true, version: '1.2', prettyErrors: true });
  // An empty stream yields no document at all.
  if (docs.length === 0) return { data: undefined, errors: [err('yaml-parse', 'the YAML stream is empty')], notes };
  for (const doc of docs) {
    for (const e of doc.errors) {
      const code = e.code === 'DUPLICATE_KEY' ? 'yaml-duplicate-key' : 'yaml-parse';
      errors.push(err(code, e.message.split('\n')[0].replace(/:$/, '')));
    }
    for (const w of doc.warnings) notes.push(`YAML warning: ${w.message.split('\n')[0]}`);
  }
  if (docs.length > 1) errors.push(err('yaml-multi-document', `expected one YAML document, found ${docs.length}`));
  if (errors.length) return { data: undefined, errors, notes };
  return { data: docs[0].toJS(), errors, notes };
}

function frontMatter(text) {
  const m = /^﻿?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(text);
  return m ? m[1] : null;
}

function legacyHint(kind, pointer, property) {
  const segs = pointer.split('/').filter(Boolean);
  if (kind === 'prompt') {
    if (segs.length === 0) return LEGACY.prompt[property];
    if (segs[0] === 'steps' && segs.length === 2) return LEGACY.step[property];
    if (segs[0] === 'output' && segs.length === 2) return LEGACY.output[property];
  }
  if (kind === 'agents') {
    if (segs.length === 0) return LEGACY.agents[property];
    if (segs[0] === 'agents' && segs.length === 2) return LEGACY.agent[property];
  }
  if (kind === 'worklog' && segs.length === 0) return LEGACY.worklog[property];
  return undefined;
}

const PATH_POINTER = /^\/(workspace|inputs\/\d+|output\/\d+\/file|agents\/\d+\/profiles\/[^/]+)$/;

/** Translate JSON Schema violations into stable contract error codes. */
function schemaErrors(kind, data, ajvErrors) {
  const out = [];
  const seen = new Set();
  const push = (e) => {
    const key = `${e.code}|${e.pointer}|${e.message}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(e);
    }
  };
  for (const e of ajvErrors) {
    const pointer = e.instancePath;
    if (e.keyword === 'additionalProperties') {
      const property = e.params.additionalProperty;
      const at = `${pointer}/${property}`;
      if (property === 'persona' && pointer === '' && kind !== 'adr') {
        if (data && typeof data === 'object' && 'agent' in data) {
          push(err('actor-conflict', '`persona` and `agent` are both declared; the validator does not choose between them. Remove `persona` after confirming which agent should run the task.', at));
        } else {
          push(err('legacy-persona', '`persona` belongs to the earlier contract. Name an executor profile with `agent` and convert the document (see .guides/conversion.md).', at));
        }
        continue;
      }
      const hint = legacyHint(kind, pointer, property);
      if (hint) push(err('legacy-field', `\`${property}\` belongs to the earlier contract - ${hint}`, at));
      else push(err('unknown-field', `\`${property}\` is not defined by the contract; unknown fields are rejected, not ignored`, at));
      continue;
    }
    if (e.keyword === 'required') {
      const property = e.params.missingProperty;
      if (kind === 'prompt' && pointer === '' && property === 'agent') {
        push(err('agent-missing', '`agent` is required: name the execution profile this task is written for', ''));
      } else if (kind === 'prompt' && pointer === '' && property === 'verification') {
        push(err('verification-missing', '`verification` is required: a task without a check cannot be completed', ''));
      } else if (kind === 'worklog' && pointer === '' && property === 'agent' && data && typeof data === 'object' && 'persona' in data) {
        // already reported as legacy-persona
      } else {
        push(err('schema', `missing required property \`${property}\``, pointer));
      }
      continue;
    }
    if (kind === 'prompt' && pointer === '/verification' && e.keyword === 'minItems') {
      push(err('verification-missing', '`verification` lists no check: a task without a check cannot be completed', pointer));
      continue;
    }
    if (e.keyword === 'const' && pointer === '/apiVersion') {
      const value = data?.apiVersion;
      if (LEGACY_API_VERSIONS.has(String(value))) {
        push(err('legacy-api-version', `apiVersion \`${value}\` identifies an earlier contract; the canonical value is \`guided-engineering/v1\` and the document must be converted, not relabelled`, pointer));
      } else {
        push(err('schema', 'apiVersion must be `guided-engineering/v1`', pointer));
      }
      continue;
    }
    if (e.keyword === 'pattern' && PATH_POINTER.test(pointer)) {
      const what = pointer === '/workspace'
        ? '`workspace` must be relative to the repository root, start with `./`, and stay inside it'
        : 'paths are relative, use `/`, and may not contain `..` or leave their base directory';
      push(err('path-invalid', what, pointer));
      continue;
    }
    if (e.keyword === 'propertyNames') continue; // the nested pattern error already says what is wrong
    if (e.keyword === 'type' && e.params.type === 'string') {
      // The most common YAML accident: unquoted text containing ": " is a mapping, not a string.
      const value = pointer.split('/').slice(1).reduce((v, k) => (v == null ? v : v[k.replace(/~1/g, '/').replace(/~0/g, '~')]), data);
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        push(err('schema', 'must be a string, but YAML read it as a mapping: the text contains `: `, so wrap the whole value in quotes', pointer));
        continue;
      }
    }
    push(err('schema', e.message ?? 'schema violation', pointer));
  }
  return out;
}

function checkSchemaReference(kind, data, file, errors) {
  const ref = data?.$schema;
  if (typeof ref !== 'string') return;
  const canonical = SCHEMAS[kind];
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(ref)) {
    if (ref !== canonical.$id) {
      errors.push(err('schema-path', `\`$schema\` is \`${ref}\` but the canonical ${kind} schema is \`${canonical.$id}\``, '/$schema'));
    }
    return;
  }
  const target = resolve(dirname(file), ref);
  if (!isFile(target)) {
    errors.push(err('schema-path', `\`$schema\` resolves to ${toPosix(target)}, which does not exist. Paths are relative to the document's own directory.`, '/$schema'));
    return;
  }
  let local;
  try {
    local = JSON.parse(readFileSync(target, 'utf8'));
  } catch {
    errors.push(err('schema-path', `\`$schema\` resolves to ${toPosix(target)}, which is not valid JSON`, '/$schema'));
    return;
  }
  if (!isDeepStrictEqual(local, canonical)) {
    errors.push(err('schema-path', `\`$schema\` resolves to ${toPosix(target)}, which is not the canonical ${kind} schema (${SCHEMA_FILES[kind]}). Validating against another schema does not make a document conformant.`, '/$schema'));
  }
}

function duplicates(values) {
  const seen = new Set();
  const dup = new Set();
  for (const v of values) (seen.has(v) ? dup : seen).add(v);
  return [...dup];
}

/** Load the agent map of a repository root, or the built-in default. */
export function loadAgentMap(root) {
  for (const name of ['agents.yaml', 'agents.yml']) {
    const file = join(root, '.guides', 'agents', name);
    if (!isFile(file)) continue;
    const parsed = parseYaml(readFileSync(file, 'utf8'));
    if (parsed.errors.length) return { source: file, map: null, errors: parsed.errors };
    const errors = validators.agents(parsed.data) ? [] : schemaErrors('agents', parsed.data, validators.agents.errors);
    return { source: file, map: errors.length ? null : parsed.data, errors };
  }
  return { source: 'built-in', map: DEFAULT_AGENT_MAP, errors: [] };
}

function resolveAgent(id, root, host) {
  const loaded = loadAgentMap(root);
  if (!loaded.map) {
    return { error: err('agent-map-invalid', `the agent map ${toPosix(loaded.source)} is invalid (${loaded.errors.map((e) => e.code).join(', ')}); no agent can be resolved against it`, '/agent') };
  }
  const entry = loaded.map.agents.find((a) => a.id === id);
  if (!entry) {
    const known = loaded.map.agents.map((a) => `\`${a.id}\``).join(', ');
    const where = loaded.source === 'built-in' ? 'the built-in agent map (this repository has no .guides/agents/agents.yaml)' : toPosix(loaded.source);
    return { error: err('agent-unresolved', `agent \`${id}\` is not declared in ${where}. Declared: ${known}.`, '/agent') };
  }
  const profiles = Object.fromEntries(Object.entries(entry.profiles ?? {}).map(([h, p]) => [h, resolve(root, p)]));
  const profile = host && profiles[host] ? profiles[host] : null;
  return {
    agent: {
      id,
      source: loaded.source,
      executor: profile ? 'native-profile' : 'current-executor',
      profile,
      profiles,
    },
  };
}

function findPrompt(root, id) {
  const dir = join(root, '.guides', 'prompts');
  if (!isDir(dir)) return null;
  for (const name of readdirSync(dir).sort()) {
    if (!/\.ya?ml$/i.test(name)) continue;
    const file = join(dir, name);
    const parsed = parseYaml(readFileSync(file, 'utf8'));
    if (parsed.data && typeof parsed.data === 'object' && parsed.data.id === id) return { file, data: parsed.data };
  }
  return null;
}

// ------------------------------------------------------------------ per-kind rules
function checkPrompt(data, file, root, opts, result) {
  const { errors } = result;
  const resolved = { root };

  for (const [what, list] of [['step', data.steps], ['verification check', data.verification], ['requirement', data.requirements]]) {
    if (!Array.isArray(list)) continue;
    for (const id of duplicates(list.map((x) => x?.id).filter((x) => typeof x === 'string'))) {
      errors.push(err('duplicate-id', `${what} id \`${id}\` is used more than once`));
    }
  }

  if (Array.isArray(data.requirements)) {
    const declared = new Set(data.requirements.map((r) => r?.id));
    const covered = new Set();
    for (const [field, list] of [['steps', data.steps], ['verification', data.verification]]) {
      if (!Array.isArray(list)) continue;
      list.forEach((item, i) => {
        for (const ref of Array.isArray(item?.requirements) ? item.requirements : []) {
          if (!declared.has(ref)) errors.push(err('requirement-unknown', `requirement \`${ref}\` is referenced but not declared in \`requirements\``, `/${field}/${i}/requirements`));
          else if (field === 'verification') covered.add(ref);
        }
      });
    }
    for (const id of declared) {
      if (!covered.has(id)) errors.push(err('requirement-unverified', `requirement \`${id}\` is not covered by any verification check`, '/requirements'));
    }
  } else {
    for (const [field, list] of [['steps', data.steps], ['verification', data.verification]]) {
      if (!Array.isArray(list)) continue;
      list.forEach((item, i) => {
        if (Array.isArray(item?.requirements)) errors.push(err('requirement-unknown', 'requirements are referenced but the prompt declares no `requirements`', `/${field}/${i}/requirements`));
      });
    }
  }

  if (Array.isArray(data.output)) {
    const norm = (p) => p.replace(/^(\.\/)+/, '').replace(/\/+$/, '');
    for (const dup of duplicates(data.output.map((o) => o?.file).filter((f) => typeof f === 'string').map(norm))) {
      errors.push(err('output-duplicate', `output \`${dup}\` is declared more than once`, '/output'));
    }
  }

  // Workspace, inputs, outputs.
  const workspaceValue = data.workspace ?? './';
  const pathErrors = errors.some((e) => e.code === 'path-invalid');
  if (typeof workspaceValue === 'string' && !errors.some((e) => e.pointer === '/workspace')) {
    const workspace = resolve(root, workspaceValue);
    if (!within(root, workspace)) {
      errors.push(err('path-invalid', '`workspace` resolves outside the repository root', '/workspace'));
    } else if (!isDir(workspace)) {
      errors.push(err('workspace-not-found', `workspace \`${workspaceValue}\` resolves to ${toPosix(workspace)}, which is not a directory`, '/workspace'));
    } else {
      resolved.workspace = workspace;
      if (Array.isArray(data.inputs) && !pathErrors) {
        resolved.inputs = [];
        data.inputs.forEach((input, i) => {
          if (typeof input !== 'string') return;
          const target = resolve(workspace, input);
          if (!existsSync(target)) errors.push(err('input-not-found', `input \`${input}\` resolves to ${toPosix(target)}, which does not exist`, `/inputs/${i}`));
          else resolved.inputs.push(target);
        });
      }
      if (Array.isArray(data.output) && !pathErrors) {
        resolved.outputs = data.output.filter((o) => typeof o?.file === 'string').map((o) => resolve(workspace, o.file));
      }
    }
  }

  // Agent.
  if (typeof data.agent === 'string' && !errors.some((e) => e.pointer === '/agent')) {
    const { agent, error } = resolveAgent(data.agent, root, opts.host);
    if (error) errors.push(error);
    else {
      for (const [host, profile] of Object.entries(agent.profiles)) {
        if (!isFile(profile)) errors.push(err('agent-profile-missing', `agent \`${agent.id}\` declares a ${host} profile at ${toPosix(profile)}, which does not exist`, '/agent'));
      }
      resolved.agent = agent;
    }
  }
  result.resolved = resolved;
}

function checkAgents(data, file, root, opts, result) {
  if (!Array.isArray(data.agents)) return;
  for (const id of duplicates(data.agents.map((a) => a?.id).filter((x) => typeof x === 'string'))) {
    result.errors.push(err('duplicate-id', `agent id \`${id}\` is declared more than once; two definitions of one id contradict each other`, '/agents'));
  }
  data.agents.forEach((agent, i) => {
    for (const [host, profile] of Object.entries(agent?.profiles ?? {})) {
      if (typeof profile !== 'string') continue;
      const target = resolve(root, profile);
      if (!within(root, target) || !isFile(target)) {
        result.errors.push(err('agent-profile-missing', `agent \`${agent.id}\` declares a ${host} profile at ${toPosix(target)}, which does not exist`, `/agents/${i}/profiles/${host}`));
      }
    }
  });
  result.resolved = { root };
}

function checkWorklog(data, file, root, opts, result) {
  const { errors, notes } = result;
  const loaded = loadAgentMap(root);
  const agentIds = new Set((loaded.map ?? DEFAULT_AGENT_MAP).agents.map((a) => a.id));

  let prompt = null;
  if (data.prompt && typeof data.prompt.id === 'string') {
    prompt = findPrompt(root, data.prompt.id);
    if (!prompt) notes.push(`prompt \`${data.prompt.id}\` was not found under ${toPosix(join(root, '.guides', 'prompts'))}; cross-checks against it were skipped`);
    else if (prompt.data.version !== data.prompt.version) {
      notes.push(`the entry ran version ${data.prompt.version} of \`${data.prompt.id}\`; the repository holds version ${prompt.data.version}; cross-checks against it were skipped`);
      prompt = null;
    }
  }

  if (typeof data.agent === 'string') {
    if (prompt && typeof prompt.data.agent === 'string' && prompt.data.agent !== data.agent) {
      errors.push(err('actor-conflict', `the entry says agent \`${data.agent}\` ran prompt \`${data.prompt.id}\`, whose agent is \`${prompt.data.agent}\``, '/agent'));
    } else if (!loaded.map) {
      errors.push(err('agent-map-invalid', `the agent map ${toPosix(loaded.source)} is invalid; \`${data.agent}\` cannot be resolved against it`, '/agent'));
    } else if (!agentIds.has(data.agent)) {
      errors.push(err('agent-unresolved', `agent \`${data.agent}\` is not declared in the agent map`, '/agent'));
    }
  }

  const steps = Array.isArray(data.steps) ? data.steps : [];
  const checks = Array.isArray(data.checks) ? data.checks : [];
  for (const id of duplicates(steps.map((s) => s?.id))) errors.push(err('duplicate-id', `step \`${id}\` is reported more than once`, '/steps'));
  for (const id of duplicates(checks.map((c) => c?.id))) errors.push(err('duplicate-id', `check \`${id}\` is reported more than once`, '/checks'));

  if (prompt) {
    const stepIds = new Set((prompt.data.steps ?? []).map((s) => s.id));
    const checkIds = new Set((prompt.data.verification ?? []).map((c) => c.id));
    steps.forEach((s, i) => {
      if (!stepIds.has(s?.id)) errors.push(err('record-unknown-step', `step \`${s?.id}\` is not defined by prompt \`${data.prompt.id}\``, `/steps/${i}`));
    });
    checks.forEach((c, i) => {
      if (!checkIds.has(c?.id)) errors.push(err('record-unknown-check', `check \`${c?.id}\` is not defined by prompt \`${data.prompt.id}\``, `/checks/${i}`));
    });
  }

  if (data.status === 'completed' && data.mode === 'execute') {
    const reasons = [];
    const notDone = steps.filter((s) => s?.status !== 'done').map((s) => s?.id);
    if (notDone.length) reasons.push(`steps not done: ${notDone.join(', ')}`);
    if (checks.length === 0) reasons.push('no check result is recorded');
    const notPassed = checks.filter((c) => c?.result !== 'pass').map((c) => `${c?.id} (${c?.result})`);
    if (notPassed.length) reasons.push(`checks not passed: ${notPassed.join(', ')}`);
    if (prompt) {
      const reportedSteps = new Set(steps.map((s) => s?.id));
      const missingSteps = (prompt.data.steps ?? []).map((s) => s.id).filter((id) => !reportedSteps.has(id));
      if (missingSteps.length) reasons.push(`prompt steps not reported: ${missingSteps.join(', ')}`);
      const reportedChecks = new Set(checks.map((c) => c?.id));
      const missingChecks = (prompt.data.verification ?? []).map((c) => c.id).filter((id) => !reportedChecks.has(id));
      if (missingChecks.length) reasons.push(`prompt checks not reported: ${missingChecks.join(', ')}`);
    }
    if (reasons.length) {
      errors.push(err('completed-without-proof', `an executed run is \`completed\` only when every step is done and every check passed: ${reasons.join('; ')}`, '/status'));
    }
  }

  if (data.mode === 'plan' || data.mode === 'interpret') {
    const acted = [
      ...steps.filter((s) => s?.status === 'done' || s?.status === 'in-progress').map((s) => `step ${s.id} is ${s.status}`),
      ...checks.filter((c) => c?.result === 'pass' || c?.result === 'fail').map((c) => `check ${c.id} is ${c.result}`),
    ];
    if (acted.length) {
      errors.push(err('plan-claims-execution', `an entry with mode \`${data.mode}\` executes nothing, yet it reports: ${acted.join('; ')}`, '/mode'));
    }
  }

  (Array.isArray(data.approvals) ? data.approvals : []).forEach((a, i) => {
    const by = typeof a?.by === 'string' ? a.by.trim().toLowerCase() : null;
    if (by === null) return;
    const machine = new Set([...agentIds, data.agent, data.executor?.host, data.executor?.model, data.executor?.profile]
      .filter((x) => typeof x === 'string').map((x) => x.toLowerCase()));
    machine.delete('human');
    if (machine.has(by)) {
      errors.push(err('approval-by-agent', `approval ${i + 1} is attributed to \`${a.by}\`, which is the agent or its host. Only a human can approve; an agent records a human's approval with a reference to where it was given.`, `/approvals/${i}/by`));
    }
  });
  result.resolved = { root };
}

const RULES = { prompt: checkPrompt, agents: checkAgents, worklog: checkWorklog, adr: () => {} };

// ------------------------------------------------------------------ public API
/**
 * Validate one artifact.
 * @param {string} file
 * @param {{root?: string, kind?: string, host?: string}} [opts]
 */
export async function validateFile(file, opts = {}) {
  const path = resolve(file);
  const kind = opts.kind ?? kindOf(path);
  const result = { file: path, kind, valid: false, errors: [], notes: [], resolved: {} };
  if (!kind || !KINDS.includes(kind)) {
    result.errors.push(err('kind-unknown', `cannot tell what kind of artifact this is from its name; pass --kind (${KINDS.join(' | ')})`));
    return result;
  }
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch (e) {
    result.errors.push(err('file-unreadable', e.message));
    return result;
  }
  if (path.toLowerCase().endsWith('.md')) {
    text = frontMatter(text);
    if (text === null) {
      result.errors.push(err('front-matter-missing', 'the file must begin with a YAML front-matter block between two `---` lines'));
      return result;
    }
  }
  const parsed = parseYaml(text);
  result.notes.push(...parsed.notes);
  if (parsed.errors.length) {
    result.errors.push(...parsed.errors);
    return result;
  }
  const data = parsed.data;
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    result.errors.push(err('schema', 'the document must be a YAML mapping'));
    return result;
  }
  const root = findRoot(path, opts.root);
  const validate = validators[kind];
  if (!validate(data)) result.errors.push(...schemaErrors(kind, data, validate.errors));
  checkSchemaReference(kind, data, path, result.errors);
  RULES[kind](data, path, root, opts, result);
  result.valid = result.errors.length === 0;
  return result;
}

/** Check that every canonical schema is itself a valid draft-07 schema. */
export async function validateSchemas() {
  return KINDS.map((kind) => {
    const strict = new Ajv({ allErrors: true, strict: true });
    addFormats(strict);
    const errors = [];
    if (SCHEMAS[kind].$schema !== 'http://json-schema.org/draft-07/schema#') {
      errors.push(err('schema', 'the schema must declare the draft-07 dialect in `$schema`'));
    }
    if (!strict.validateSchema(SCHEMAS[kind])) {
      for (const e of strict.errors) errors.push(err('schema', `${e.instancePath} ${e.message}`));
    } else {
      try {
        strict.compile(SCHEMAS[kind]);
      } catch (e) {
        errors.push(err('schema', e.message));
      }
    }
    return { file: `.guides/schemas/${SCHEMA_FILES[kind]}`, kind, valid: errors.length === 0, errors };
  });
}

/**
 * Requirement map of one valid prompt, as Markdown: every requirement with the
 * steps that work on it and the checks that prove it. Derived, never edited.
 */
export function traceMarkdown(file) {
  const parsed = parseYaml(readFileSync(file, 'utf8'));
  const data = parsed.data;
  if (!data || !Array.isArray(data.requirements)) return null;
  const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
  const refs = (list, id) => (list ?? []).filter((x) => (x.requirements ?? []).includes(id)).map((x) => `\`${x.id}\``).join(', ');
  const lines = [
    `## \`${data.id}\` (version ${data.version})`,
    '',
    `${data.requirements.length} requirements, ${data.steps.length} steps, ${data.verification.length} checks.`,
    '',
    '| Requirement | Text | Steps | Checks |',
    '|---|---|---|---|',
  ];
  for (const r of data.requirements) {
    lines.push(`| \`${r.id}\` | ${cell(r.text)} | ${refs(data.steps, r.id) || '—'} | ${refs(data.verification, r.id) || '**none**'} |`);
  }
  lines.push('', '| Step | Title | Requirements |', '|---|---|---|');
  for (const s of data.steps) lines.push(`| \`${s.id}\` | ${cell(s.title)} | ${(s.requirements ?? []).map((x) => `\`${x}\``).join(', ') || '—'} |`);
  lines.push('', '| Check | Command | Requirements |', '|---|---|---|');
  for (const c of data.verification) lines.push(`| \`${c.id}\` | ${c.run ? `\`${cell(c.run)}\`` : 'observed'} | ${(c.requirements ?? []).map((x) => `\`${x}\``).join(', ') || '—'} |`);
  return `${lines.join('\n')}\n`;
}

const listFiles = (dir, test) => (isDir(dir) ? readdirSync(dir).filter(test).sort().map((n) => join(dir, n)) : []);

/** The active artifacts of a repository, found by convention. */
export function discover(root) {
  const g = join(root, '.guides');
  const yaml = (n) => /\.ya?ml$/i.test(n);
  const md = (n) => /\.md$/i.test(n);
  const files = [
    ...listFiles(join(g, 'agents'), (n) => /^agents\.ya?ml$/i.test(n)),
    ...listFiles(join(g, 'prompts'), yaml),
    ...listFiles(join(g, 'operation', 'worklog'), md),
    ...listFiles(join(g, 'architecture', 'adr'), md),
    ...listFiles(join(root, 'templates'), (n) => /^template\.(prompt|agents)\.ya?ml$/i.test(n) || /^template\.(worklog|adr)\.md$/i.test(n)),
    ...listFiles(join(root, 'examples', 'valid'), (n) => yaml(n) || md(n)),
  ];
  // Example projects are repository roots of their own, nested under examples/.
  const walk = (dir, depth) => {
    if (depth > 3 || !isDir(dir)) return;
    for (const name of readdirSync(dir).sort()) {
      const sub = join(dir, name);
      if (name === 'invalid' || name === 'node_modules' || name.startsWith('.') || !isDir(sub)) continue;
      if (isDir(join(sub, '.guides'))) files.push(...discover(sub));
      else walk(sub, depth + 1);
    }
  };
  walk(join(root, 'examples'), 1);
  return files;
}

/** Validate every active artifact of a repository, plus the canonical schemas. */
export async function validateAll(rootOption, opts = {}) {
  const root = resolve(rootOption ?? process.cwd());
  const results = [];
  for (const file of discover(root)) results.push(await validateFile(file, { host: opts.host }));

  // Prompt ids are unique within a prompts directory.
  const byDir = new Map();
  for (const r of results) {
    if (r.kind !== 'prompt' || !toPosix(r.file).includes('/.guides/prompts/')) continue;
    const parsed = parseYaml(readFileSync(r.file, 'utf8'));
    const id = parsed.data?.id;
    if (typeof id !== 'string') continue;
    const key = `${dirname(r.file)}|${id}`;
    if (byDir.has(key)) {
      r.errors.push(err('prompt-id-duplicate', `prompt id \`${id}\` is also used by ${toPosix(byDir.get(key))}`, '/id'));
      r.valid = false;
    } else byDir.set(key, r.file);
  }

  // Schema files on disk must be the canonical ones this validator embeds.
  const schemaDir = join(root, '.guides', 'schemas');
  const schemaResults = await validateSchemas();
  for (const s of schemaResults) {
    const onDisk = join(schemaDir, SCHEMA_FILES[s.kind]);
    if (isFile(onDisk)) {
      try {
        if (!isDeepStrictEqual(JSON.parse(readFileSync(onDisk, 'utf8')), SCHEMAS[s.kind])) {
          s.errors.push(err('schema-path', `${toPosix(onDisk)} differs from the canonical ${s.kind} schema`));
          s.valid = false;
        }
      } catch (e) {
        s.errors.push(err('schema', `${toPosix(onDisk)} is not valid JSON: ${e.message}`));
        s.valid = false;
      }
    }
  }
  return { root, results, schemas: schemaResults };
}
