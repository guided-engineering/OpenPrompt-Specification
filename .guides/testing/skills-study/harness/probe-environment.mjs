// Infrastructure probes, run once before the study is frozen. They are not
// scored runs. They answer four questions with client evidence:
//   1. Which model does the client use by default, and what does it expose?
//   2. With the study's flags and a cleaned environment, are user-level Skills,
//      plugins and MCP servers absent?
//   3. Is a Skill placed in <workspace>/.claude/skills listed and invocable,
//      and what does its invocation look like in the trace?
//   4. Which tool names and input shapes does this client emit on this machine?
// Output: results/environment.probes.json
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONFIG, RUNS_ROOT, STUDY, clientArgs, clientVersion, parseTrace, runAgent, writeJson } from './lib.mjs';

const withoutModel = () => {
  const args = clientArgs();
  for (const flag of ['--model', '--effort']) {
    const i = args.indexOf(flag);
    if (i !== -1) args.splice(i, 2);
  }
  return args;
};

function workspace(name, files = {}) {
  const dir = join(RUNS_ROOT, name, 'workspace');
  rmSync(join(RUNS_ROOT, name), { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'README.md'), '# probe\n');
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(join(dir, path, '..'), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  execFileSync('git', ['init', '-q', '-b', 'main'], { cwd: dir });
  return dir;
}

const summarize = (name, run) => {
  const t = parseTrace(run.events);
  const i = t.init ?? {};
  return {
    probe: name,
    exitCode: run.exitCode,
    timedOut: run.timedOut,
    wallMs: run.endedAt - run.startedAt,
    stderrHead: run.stderr.slice(0, 300),
    init: {
      model: i.model ?? 'UNKNOWN',
      claude_code_version: i.claude_code_version ?? 'UNKNOWN',
      permissionMode: i.permissionMode ?? 'UNKNOWN',
      apiKeySource: i.apiKeySource ?? 'UNKNOWN',
      tools: i.tools ?? 'UNKNOWN',
      skills: i.skills ?? 'UNKNOWN',
      slash_commands: i.slash_commands ?? 'UNKNOWN',
      plugins: i.plugins ?? 'UNKNOWN',
      agents: i.agents ?? 'UNKNOWN',
      mcp_servers: i.mcp_servers ?? 'UNKNOWN',
      otherKeys: Object.keys(i).filter((k) => !['model', 'claude_code_version', 'permissionMode', 'apiKeySource', 'tools', 'skills', 'slash_commands', 'plugins', 'agents', 'mcp_servers', 'type', 'subtype', 'cwd', 'session_id', 'uuid'].includes(k)),
    },
    calls: t.calls.map((c) => ({ name: c.name, inputKeys: Object.keys(c.input), command: c.command, file: c.file, skill: c.skill, isError: c.isError, resultHead: (c.result ?? '').slice(0, 160) })),
    finalText: t.finalText.slice(0, 200),
    resultKeys: t.result ? Object.keys(t.result) : [],
    usage: t.result?.usage ?? null,
    modelUsageKeys: t.result?.modelUsage ? Object.keys(t.result.modelUsage) : null,
    permissionDenials: t.result?.permission_denials ?? null,
  };
};

const which = process.argv[2] ?? 'defaults';
const out = { accessed: new Date().toISOString(), clientVersion: clientVersion(), configuredModel: CONFIG.client.model, probes: [] };

if (which === 'defaults') {
  // Probe 1: default model, tool shapes, absence of user-level customizations.
  const a = workspace('env-probe-defaults');
  out.probes.push(summarize('defaults-no-skills', await runAgent({
    cwd: a,
    args: withoutModel(),
    timeoutMs: 120000,
    prompt: 'Run the command `node --version`. Then create a file named probe.txt that contains exactly the text ok. Then reply with the single word DONE.',
  })));
} else {
  // Probe 2: a project Skill is listed and invoked; pinned model and effort are accepted.
  const b = workspace('env-probe-skill', {
    '.claude/skills/hello-probe/SKILL.md': '---\nname: hello-probe\ndescription: Returns the probe greeting. Use when the user asks for the probe greeting.\n---\n\nReply with exactly this text and nothing else: PROBE-GREETING-7391\n',
  });
  out.probes.push(summarize('pinned-with-skill', await runAgent({ cwd: b, timeoutMs: 120000, prompt: 'Please give me the probe greeting.' })));
}

writeJson(join(STUDY, 'results', `environment.probe-${which}.json`), out);
console.log(JSON.stringify(out, null, 2));
