# Quick start

Ten minutes, one agent host, one small example. Tested with Claude Code on
Windows; see [Skills and agents](skills.html) for other hosts.

## 1. What you need

- An agent host that loads Agent Skills (tested: Claude Code).
- Node.js 22.20 or newer for the `skills` installer. The validator inside the
  Skills needs Node.js 20 or newer.
- Git.

## 2. Get the example project

The example is a tiny repository with one package and two failing tests. Copy
it out of the specification repository so that it is a project of its own:

```bash
git clone https://github.com/guided-engineering/OpenPrompt-Specification
```

```bash
git -C OpenPrompt-Specification checkout 9ed6800e5c7f32ce61073c8746fcedd4e23dde08
```

```bash
cp -r OpenPrompt-Specification/examples/project ops-demo
```

```bash
cd ops-demo
```

The commit checked out above is the state of the example before it was solved.

## 3. Install the Skills

In `ops-demo`:

```bash
npx skills add guided-engineering/skills -a claude-code -y
```

This copies `ops-author` and `ops-execute` into `.claude/skills/`. To install a
fixed revision, name its commit. This one is the revision the local study
measured:

```bash
npx skills add guided-engineering/skills#146c4b51fee8f1a6609b424fe6381c28c27c60e4 -a claude-code -y
```

No installer? Copy the two folders under `skills/` of the
[Skills repository](https://github.com/guided-engineering/skills) into
`.claude/skills/` by hand. The `skills` CLI sends anonymous install telemetry
unless `DISABLE_TELEMETRY=1` is set.

Now record the starting state, with the Skills in it, so that `git status`
later shows only what the agent changed:

```bash
git init -q && git add -A && git commit -q -m "start"
```

The installer also writes a `skills-lock.json`; it is part of that commit.

## 4. Read the contract

The example ships with its request and with the OPS prompt written from it:

```bash
cat request.md
```

```bash
cat .guides/prompts/prompt.slug.clean-separators.yaml
```

To see the authoring step yourself, start your agent in `ops-demo` and ask:

> Write an OPS prompt for the request in `request.md`. Do not implement it.

`ops-author` writes a prompt under `.guides/prompts/`, validates it, and tells
you what it assumed. Compare it with the one that ships.

## 5. Plan, then execute

Ask for a plan first:

> Plan `.guides/prompts/prompt.slug.clean-separators.yaml`. Plan only.

Then for the work:

> Execute `.guides/prompts/prompt.slug.clean-separators.yaml`.

`ops-execute` validates the prompt, reproduces the two failing tests, changes
`packages/slug/src/slug.mjs`, runs the tests again after the last edit, and
writes a worklog entry under `.guides/operation/worklog/`.

## 6. Check the evidence yourself

Still in `ops-demo`:

```bash
node --test packages/slug/test/slug.test.mjs
```

```bash
git status --short
```

The worklog entry is a claim. The validator checks that it does not claim more
than it shows:

```bash
node .claude/skills/ops-execute/scripts/ops-validate.mjs --all
```

Then read the diff. Whether the change is good is your decision.

## In your own project

Nothing to set up beyond step 3. Describe a change the way you normally would
and ask for it "as an OPS prompt"; review the YAML; ask for a plan; ask for
execution; read the worklog entry with the diff. A project that wants more than
the default agent adds `.guides/agents/agents.yaml`; see
[the contract](contract.html#4-4-agent).

## What was verified on this page

The commands of steps 2, 3, 4 and 6 were replayed as written from the two
public repositories on 2026-11-13, on Windows: the clone and the checkout, the
copy, the installer (both Skills, with files identical to the measured
revision), the starting commit, the two failing tests of the starting state,
and the validator from the installed Skill.

The two requests of step 5 were not replayed in a fresh session for this page.
The example in the repository was executed by the session that built it, and
the same Skill files were exercised in the [local study](results.html).