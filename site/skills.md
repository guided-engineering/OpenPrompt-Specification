# Skills and agents

Two Skills carry the procedures of the practice. They are plain
[Agent Skills](https://agentskills.io): a folder with a `SKILL.md`, a few
reference files and one script. They live in
[`guided-engineering/skills`](https://github.com/guided-engineering/skills).

## When to use which

| Skill | Use it when you want | It will | It will not |
|---|---|---|---|
| **`ops-author`** | a request written down as an OPS prompt; an existing prompt reviewed or improved; a prompt in the earlier format converted | read the request and only the project files it needs, write the prompt, ask about ambiguity that matters, validate the result, and report what it assumed and what a person still has to decide | carry out the task the prompt describes, or relabel an unknown actor silently |
| **`ops-execute`** | an OPS prompt interpreted, planned, executed or resumed | validate the contract, resolve workspace and agent, plan with a check for every task, make the smallest change the request authorizes, verify after the last edit, repair within the prompt's limits, and record a worklog entry | go beyond the mode you asked for, weaken a test to get a pass, or record an approval |

Each Skill works when installed alone. Each carries the validator
(`scripts/ops-validate.mjs`, one file, needs Node.js 20 or newer) and a copy of
the contract, synchronized by script from the specification repository with the
source commit and hashes recorded in `ops-source.json`.

## Which executes: the agent, not the Skill

A Skill is instructions that an agent loads. It does not run, and it is not a
second opinion. An OPS prompt names an **agent**; that name resolves through
the project's agent map:

```yaml
# .guides/agents/agents.yaml (optional)
apiVersion: guided-engineering/v1
agents:
  - id: guided-engineer
    description: Default engineering executor.
```

A project without this file uses a built-in map with exactly this one agent.
`guided-engineer` resolves to the **current executor**: the session of your
agent host that is reading the prompt. Nothing is spawned.

A project can bind an id to a native profile of its host:

```yaml
agents:
  - id: guided-engineer
    description: Default engineering executor.
    profiles:
      claude-code: .claude/agents/guided-engineer.md
```

The validator then requires that file to exist. Agent hosts do not share a
profile format, so a profile is written for one host and the map only points at
it. Installing a Skill never installs a profile: they are separate steps.

## Hosts

| Host | Skills location | Status | Native profile format |
|---|---|---|---|
| **Claude Code** | `.claude/skills/<name>/` (project) or `~/.claude/skills/<name>/` (personal) | **Tested.** Installed, listed by the client, invoked, and used in the local study (Windows, version 2.1.322). | Markdown with front matter in `.claude/agents/<name>.md`, per its documentation. No profile ships: none was needed, and none was exercised. |
| **Codex** | `.agents/skills/<name>/` (repository) or `~/.agents/skills/<name>/` (user), per its documentation | **Not tested.** Codex was not installed on the machine the work was done on. The Skills use only the fields of the open format, which Codex's documentation says it follows. | TOML in `.codex/agents/<name>.toml`, per its documentation. No example ships, because none could be run. |
| Other hosts that read `.agents/skills/` | as installed by the `skills` CLI | **Not tested.** | — |

What "not tested" means here: nothing is known about whether the Skills are
discovered, when they activate, or how the instructions behave on that host.
The format is portable by specification; the behavior is unverified until
someone runs it.

## What stays out of the portable core

The two `SKILL.md` files use only `name`, `description`, `license` and
`compatibility`, four of the fields the Agent Skills specification defines. No
host-specific file ships with them: no Claude Code profile and no Codex
`agents/openai.yaml`. If one is added later, it belongs outside the Skill
folders.

## What is and is not claimed about distribution

The Skills are installable with the [`skills` CLI](https://github.com/vercel-labs/skills)
from the public repository. [skills.sh](https://skills.sh) is a directory built
around that CLI: it lists what people install and shows automated scan results.
No listing, review, certification or benchmark of these Skills is claimed.

## Did they help?

In the local study the same agent, with the same contract and validator in the
project, was run with and without the Skills on five small tasks. The right
Skill loaded every time, nothing got worse, and nothing measurably got better:
the agent was already at or near the top of the scale without them. The
[results page](results.html) has every number and every limit.

## A correction made after the study

The field guide of `ops-author`, as measured, said that a check without a
command uses `expect` to say what to observe. That could be read as if `expect`
were needed only then, and it is required for every check. In both authoring
runs of the study the first draft left it out of the checks that had a command;
the validator rejected the draft and named the field, and the agent corrected
it.

The sentence was corrected afterwards, in commit `c8418f5` of the Skills
repository: every check has an `id` and an `expect`, and `run` is added when a
command decides the check. **The corrected version has not been measured.**
Everything on the [results page](results.html) is about the earlier revision,
`146c4b5`, which the pinned command in the [quick start](quick-start.html)
still installs. `ops-execute` is unchanged.

One known issue remains: the prompt template bundled in `ops-author` carries a
header comment that names the specification repository's validator command.
Use the command given in the Skill. It is listed in the
[roadmap](../ROADMAP.md).
