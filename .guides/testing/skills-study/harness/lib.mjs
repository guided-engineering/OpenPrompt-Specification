// Shared pieces of the study harness: locations, hashing, workspace
// materialization, the agent runner and trace parsing. No scoring logic here.
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const STUDY = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const OPS_ROOT = resolve(STUDY, '..', '..', '..');
export const RUNS_ROOT = resolve(process.env.GE_STUDY_RUNS ?? join(OPS_ROOT, '..', 'study-runs'));
export const SKILLS_ROOT = resolve(process.env.GE_SKILLS_ROOT ?? join(OPS_ROOT, '..', 'guided-engineering-skills'));
export const CONFIG = JSON.parse(readFileSync(join(STUDY, 'study.config.json'), 'utf8'));

export const posix = (p) => p.split(sep).join('/');
export const sha256 = (data) => createHash('sha256').update(data).digest('hex');
export const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
export const writeJson = (file, value) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
};

/** Files below `dir`, as sorted POSIX paths relative to it. `.git` is never listed. */
export function listFiles(dir, base = dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, base));
    else if (entry.isFile()) out.push(posix(relative(base, full)));
  }
  return out.sort();
}

/** { 'path': sha256 } for every file below `dir`. */
export function manifest(dir) {
  return Object.fromEntries(listFiles(dir).map((f) => [f, sha256(readFileSync(join(dir, f)))]));
}

/** One hash for a whole tree: paths and content. */
export const treeHash = (m) => sha256(Object.entries(m).map(([f, h]) => `${h}  ${f}`).join('\n'));

/** What differs between an initial manifest and the current state of a directory. */
export function changes(initial, dir) {
  const now = manifest(dir);
  const added = Object.keys(now).filter((f) => !(f in initial));
  const deleted = Object.keys(initial).filter((f) => !(f in now));
  const modified = Object.keys(now).filter((f) => f in initial && now[f] !== initial[f]);
  return { added, modified, deleted, all: [...added, ...modified, ...deleted].sort(), now };
}

const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

/** Identity of the frozen contract kit that every fixture receives. */
export function kitIdentity() {
  const files = manifest(join(STUDY, 'kit', 'files'));
  return { files, treeHash: treeHash(files) };
}

/**
 * Skill directories at a commit of the Skills repository, written to
 * `<workspace>/.claude/skills/<name>`. Returns their identities.
 */
export function installSkills(workspace, commit, names) {
  const installed = [];
  for (const name of names) {
    const prefix = `skills/${name}/`;
    const files = git(SKILLS_ROOT, 'ls-tree', '-r', '--name-only', commit, prefix).split('\n').filter(Boolean);
    if (files.length === 0) throw new Error(`skill ${name} does not exist at ${commit}`);
    for (const file of files) {
      const target = join(workspace, '.claude', 'skills', name, file.slice(prefix.length));
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, execFileSync('git', ['show', `${commit}:${file}`], { cwd: SKILLS_ROOT }));
    }
    const m = manifest(join(workspace, '.claude', 'skills', name));
    installed.push({ name, commit: git(SKILLS_ROOT, 'rev-parse', commit).trim(), files: Object.keys(m).length, treeHash: treeHash(m) });
  }
  return installed;
}

/**
 * Build a clean workspace for one run: fixture, then the frozen kit, then (for
 * a Skills condition) the candidate Skills. The result is its own Git
 * repository with one commit, so no parent directory can contribute files.
 */
export function materialize({ caseId, runId, skills }) {
  const caseDir = join(STUDY, 'cases', caseId);
  const runDir = join(RUNS_ROOT, runId);
  const workspace = join(runDir, 'workspace');
  rmSync(runDir, { recursive: true, force: true });
  mkdirSync(workspace, { recursive: true });
  cpSync(join(caseDir, 'fixture'), workspace, { recursive: true });
  cpSync(join(STUDY, 'kit', 'files'), workspace, { recursive: true });
  const installed = skills ? installSkills(workspace, skills.commit, skills.names) : [];
  git(workspace, 'init', '-q', '-b', 'main');
  git(workspace, 'config', 'user.name', 'study');
  git(workspace, 'config', 'user.email', 'study@example.invalid');
  git(workspace, 'config', 'core.autocrlf', 'false');
  git(workspace, 'add', '-A');
  git(workspace, 'commit', '-q', '-m', 'initial state');
  // Optional: edits that exist in the working tree but were never committed,
  // as a user would leave them. They are part of the initial state.
  if (existsSync(join(caseDir, 'uncommitted'))) cpSync(join(caseDir, 'uncommitted'), workspace, { recursive: true });
  const initial = manifest(workspace);
  return { runDir, workspace, initial, initialTreeHash: treeHash(initial), skills: installed };
}

/** The environment of a nested session: this session's own client variables removed. */
export function cleanEnv() {
  const env = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (!/^(CLAUDE|ANTHROPIC|MCP_)/i.test(k)) env[k] = v;
  }
  return env;
}

export function clientVersion() {
  const out = spawnSync(CONFIG.client.command, ['--version'], { encoding: 'utf8', env: cleanEnv() });
  return (out.stdout ?? '').trim() || 'UNKNOWN';
}

/** Arguments that are identical for every scored run and probe. */
export function clientArgs() {
  return [
    '-p',
    '--output-format', 'stream-json',
    '--verbose',
    '--model', CONFIG.client.model,
    '--effort', CONFIG.client.effort,
    '--setting-sources', CONFIG.client.settingSources,
    '--strict-mcp-config',
    '--permission-mode', CONFIG.client.permissionMode,
    '--no-session-persistence',
    '--allowedTools', ...CONFIG.client.allowedTools,
  ];
}

/**
 * Start one fresh agent session in `cwd`, give it `prompt` on stdin, and
 * collect the stream-json events. The process tree is killed at `timeoutMs`.
 */
export function runAgent({ cwd, prompt, timeoutMs, args = clientArgs() }) {
  return new Promise((resolvePromise) => {
    const startedAt = new Date();
    const child = spawn(CONFIG.client.command, args, { cwd, env: cleanEnv(), stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { stderr += d; });
    const timer = setTimeout(() => {
      timedOut = true;
      if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F']);
      else child.kill('SIGKILL');
    }, timeoutMs);
    child.on('error', (error) => {
      clearTimeout(timer);
      resolvePromise({ events: [], stdout, stderr: `${stderr}\n${error.message}`, exitCode: null, timedOut, startedAt, endedAt: new Date(), spawnError: error.message });
    });
    child.on('close', (exitCode) => {
      clearTimeout(timer);
      const events = [];
      for (const line of stdout.split('\n')) {
        if (!line.trim()) continue;
        try {
          events.push(JSON.parse(line));
        } catch {
          // a partial last line after a kill; ignored
        }
      }
      resolvePromise({ events, stdout, stderr, exitCode, timedOut, startedAt, endedAt: new Date() });
    });
    child.stdin.end(prompt);
  });
}

const blockText = (content) => {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.map((b) => (typeof b === 'string' ? b : b?.text ?? '')).join('\n');
};

/**
 * Reduce stream-json events to what the oracles need: the init record, the
 * ordered tool calls of the main conversation with their results, the final
 * text and the result record.
 */
export function parseTrace(events) {
  const init = events.find((e) => e.type === 'system' && e.subtype === 'init') ?? null;
  const result = [...events].reverse().find((e) => e.type === 'result') ?? null;
  const calls = [];
  const byId = new Map();
  const texts = [];
  for (const e of events) {
    if (e.type === 'assistant' && Array.isArray(e.message?.content)) {
      for (const b of e.message.content) {
        if (b.type === 'text' && !e.parent_tool_use_id) texts.push(b.text);
        if (b.type === 'tool_use') {
          const input = b.input ?? {};
          const call = {
            index: calls.length,
            id: b.id,
            name: b.name,
            input,
            command: typeof input.command === 'string' ? input.command : null,
            file: typeof input.file_path === 'string' ? posix(input.file_path) : null,
            skill: b.name === 'Skill' ? input.skill ?? null : null,
            subagent: Boolean(e.parent_tool_use_id),
            result: null,
            isError: null,
          };
          calls.push(call);
          byId.set(b.id, call);
        }
      }
    }
    if (e.type === 'user' && Array.isArray(e.message?.content)) {
      for (const b of e.message.content) {
        if (b.type !== 'tool_result') continue;
        const call = byId.get(b.tool_use_id);
        if (call) {
          call.result = blockText(b.content);
          call.isError = Boolean(b.is_error);
        }
      }
    }
  }
  const finalText = typeof result?.result === 'string' && result.result ? result.result : texts.at(-1) ?? '';
  return { init, result, calls, finalText };
}

const SHELL_TOOLS = new Set(['Bash', 'PowerShell']);
const WRITE_TOOLS = new Set(['Edit', 'Write', 'MultiEdit', 'NotebookEdit']);

/** Shell commands of the main conversation, in order. */
export const shellCalls = (trace) => trace.calls.filter((c) => SHELL_TOOLS.has(c.name) && c.command);

/** Does a call write to a path that ends with `suffix` (POSIX, workspace-relative)? */
export function writesTo(call, suffix) {
  if (WRITE_TOOLS.has(call.name) && call.file) return call.file.endsWith(suffix);
  if (SHELL_TOOLS.has(call.name) && call.command) {
    const cmd = call.command.replace(/\\/g, '/');
    const name = suffix.split('/').pop();
    return cmd.includes(name) && /(>|\btee\b|Set-Content|Out-File|Add-Content|sed\s+-i|\bmv\b|\bcp\b|Copy-Item|Move-Item|writeFileSync)/.test(cmd);
  }
  return false;
}

/** Usage and timing fields of the result record, UNKNOWN-safe. */
export function metrics(trace, run) {
  const r = trace.result ?? {};
  const u = r.usage ?? {};
  const num = (v) => (typeof v === 'number' ? v : null);
  const tokens = [u.input_tokens, u.output_tokens, u.cache_creation_input_tokens, u.cache_read_input_tokens].every((v) => typeof v === 'number')
    ? { input: u.input_tokens, output: u.output_tokens, cacheCreation: u.cache_creation_input_tokens, cacheRead: u.cache_read_input_tokens,
        total: u.input_tokens + u.output_tokens + u.cache_creation_input_tokens + u.cache_read_input_tokens }
    : null;
  return {
    wallMs: run.endedAt - run.startedAt,
    durationMs: num(r.duration_ms),
    durationApiMs: num(r.duration_api_ms),
    turns: num(r.num_turns),
    toolCalls: trace.calls.filter((c) => !c.subagent).length,
    tokens,
    modelUsage: r.modelUsage ?? null,
    costUsdReportedByClient: num(r.total_cost_usd),
    permissionDenials: Array.isArray(r.permission_denials) ? r.permission_denials.length : null,
  };
}
