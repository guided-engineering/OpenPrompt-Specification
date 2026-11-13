# Guided Engineering

*A practice for working with coding agents: task contracts, portable Skills, and evidence.*

You say what should be true. The agent does the work in small verified units.
Every claim of "done" points at evidence.

Guided Engineering adds no runtime. It uses the agent host you already have,
two portable [Agent Skills](https://agentskills.io), and one small contract:
the **OPS prompt** (OpenPrompt Specification), a validated task definition that
states an objective, the constraints, the steps, and the checks that decide
completion.

🌐 Website: <https://guided-engineering.github.io/OpenPrompt-Specification/> ·
🇧🇷 [Leia em português](./README.pt-br.md)

---

## The idea in one table

| Concept | Responsibility |
|---|---|
| **Human** | Sets intent, constraints and material decisions; stays accountable. |
| **Agent** | The executor, or a named execution profile configured in a real agent host. |
| **Skill** | A reusable capability packaged as `SKILL.md`. Extends an agent; is not one. |
| **OPS prompt** | The task contract: intent, context, constraints, actions, expected outcomes. |
| **Plan** | The task-specific sequence of changes and checks derived from one prompt. |
| **Evidence** | Files, diffs, command results and observations that support a completion claim. |

An agent definition is configuration; an agent run does the work. Naming an
agent in a prompt starts nothing, grants nothing and proves no review. A Skill
is not an agent. An agent never approves: a human does.

## The loop

**Inspect → validate intent and contract → plan → execute the authorized unit →
verify → diagnose and repair if justified → reverify → record evidence → decide
the next unit.**

A failed check is diagnosed before it is touched. A test is never weakened to
get a pass. A check that passed before the last edit is run again. Details:
[`.guides/practice.md`](./.guides/practice.md).

## A small working example

A person writes a request:

> Slugs coming out of `packages/slug` look wrong in the article URLs. A title
> like `a  --  b` turns into `a------b` … Keep it small: do not add
> dependencies, do not change the function's name, and do not touch the tests.

It becomes an OPS prompt (shortened; the full file is
[`examples/project/.guides/prompts/prompt.slug.clean-separators.yaml`](./examples/project/.guides/prompts/prompt.slug.clean-separators.yaml)):

```yaml
apiVersion: guided-engineering/v1
id: slug.clean-separators
version: 1
title: Make slugify collapse repeated separators and trim hyphens at the edges
agent: guided-engineer
workspace: ./packages/slug
objective: |
  `slugify` returns clean slugs: exactly one hyphen between words and no hyphen
  at the start or the end.
context: |
  `packages/slug` is a dependency-free package tested with `node --test`.
constraints:
  - Change only `src/slug.mjs`.
  - Do not edit, skip, or delete any test.
steps:
  - id: reproduce
    title: Reproduce the failure
    actions:
      - Run `node --test` in the workspace and record which tests fail.
  - id: fix
    title: Correct the separator handling
    actions:
      - Change the implementation so a run of separators becomes one hyphen.
output:
  - file: src/slug.mjs
verification:
  - id: unit-tests
    expect: All four tests pass.
    run: node --test
```

The agent plans it, executes it, and leaves a worklog entry that records which
checks ran after the last edit and what they showed. The whole chain (request,
prompt, plan, evidence) is in [`examples/project/`](./examples/project/) and is
re-verified by `npm run example`.

## Use it in your project

1. **Install the Skills** in your agent host. With the
   [`skills` CLI](https://github.com/vercel-labs/skills):

   ```bash
   npx skills add guided-engineering/skills
   ```

   Host by host, including what was and was not tested:
   [`guided-engineering/skills`](https://github.com/guided-engineering/skills).

2. **Ask for a contract.** Describe a change the way you normally would and
   ask for it as an OPS prompt. `ops-author` writes it to `.guides/prompts/`,
   asks about ambiguity that matters, and validates the result. Read it; this
   is the moment to correct scope.

3. **Ask for a plan, then for execution.** `ops-execute` validates the prompt,
   plans with a check for every task, makes the change, verifies after the last
   edit, and records a worklog entry under `.guides/operation/worklog/`.

4. **Decide.** Review the diff and the evidence. The decision is yours.

Nothing else is required. The Skills bring the validator and the text of the
contract with them. An OPS prompt names an agent, and `guided-engineer`, the
default, is simply the agent session that reads the prompt. Installing a Skill
installs no agent profile.

## What is in this repository

This repository is the normative source of the contract and the practice.

| Path | Content |
|---|---|
| [`.guides/ops-contract.md`](./.guides/ops-contract.md) | **The contract.** Fields, resolution rules, completion, request modes, worklog entries, error codes. |
| [`.guides/practice.md`](./.guides/practice.md) | The practice: who does what, the journey, the loop. |
| [`.guides/schemas/`](./.guides/schemas/) | JSON Schemas: prompt, agent map, worklog entry, ADR. |
| [`tools/ops-validate/`](./tools/ops-validate/), [`dist/ops-validate.mjs`](./dist/ops-validate.mjs) | The validator and its single-file, dependency-free bundle. |
| [`examples/`](./examples/) | Valid, invalid, conversion and end-to-end examples. |
| [`templates/`](./templates/) | Starting points for a prompt, an agent map, a worklog entry, an ADR. |
| [`.guides/conversion.md`](./.guides/conversion.md) | What replaced what, for documents written before the reformulation. |
| [`.guides/testing/skills-study/`](./.guides/testing/skills-study/) | The local study of the Skills: protocol, cases, harness, results. |
| [`docs/`](./docs/) | The generated website. |

The Skills live in [`guided-engineering/skills`](https://github.com/guided-engineering/skills).

## Validate

```bash
npm ci
npm test            # contract tests: valid and invalid examples, CLI, bundle
npm run validate    # every active artifact of this repository
node dist/ops-validate.mjs path/to/prompt.yaml   # one file, anywhere, no install
```

A document is a valid OPS prompt when the validator accepts it. The validator
rejects, among other things, a missing or unresolved `agent`, unknown fields,
duplicate YAML keys, paths that leave the workspace, a prompt without a check,
and a worklog entry that claims completion without passing checks. See
[`VALIDATION.md`](./VALIDATION.md).

## Does it help? What a local study found

A small local study compared the same agent, on the same contract, with and
without the two Skills: five tasks, one run per task and condition, one model.

| Task | Without Skills | With Skills |
|---|---:|---:|
| C1 Write a prompt from a request | 100 | 100 |
| C2 Convert and improve a legacy prompt | 100 | 100 |
| C3 Plan a prompt in a nested workspace | 90 | 100 |
| C4 Execute a prompt against a bug | 90 | 90 |
| C5 Resume from a recorded checkpoint (reserved case) | 100 | 100 |

**The study does not show that the Skills improve the work, and it shows no
case where they made it worse.** The agent already scored at or near the top
without them, so there was no room to show a gain. The one higher score, C3,
comes from a point the baseline lost to the grader and not to the task. The
right Skill loaded in six of six probes and in all five tasks. Time and tokens
stayed within a few percent, with one exception (C1, 72% more tokens
processed).

What the study could not measure is what the Skills are for. Every test project
already contained the contract and the validator, and the Skills exist to bring
both to a project that has neither.

Also on record: the scoring of three tasks was repaired after their first run,
and those runs were repeated; the blinding of the fifth task could not be
verified; and one sentence in `ops-author` misled about a required field until
the validator corrected the draft. That sentence was corrected afterwards, in
a version the study did not measure. Every run and every limit is in
[the report](./.guides/testing/skills-study/results/report.md) and on
[the results page](https://guided-engineering.github.io/OpenPrompt-Specification/results.html).

## History

This project used to describe itself as a Spec-Driven Development framework in
which prompts were assigned to role labels. That design was replaced, not
extended: earlier documents are not valid under the current contract and are
converted with [`.guides/conversion.md`](./.guides/conversion.md). The reasons
are recorded in
[ADR 0002](./.guides/architecture/adr/0002-refound-on-agents-skills-and-ops-contracts.md),
and the earlier tree is in Git history at commit
[`ca82040`](https://github.com/guided-engineering/OpenPrompt-Specification/tree/ca820409df0aebe2b4669aa168ebc82d6bcecd48).

## Roadmap and license

What is done and what is not: [`ROADMAP.md`](./ROADMAP.md).

MIT © Guided Engineering Team. See [`LICENSE`](./LICENSE).
