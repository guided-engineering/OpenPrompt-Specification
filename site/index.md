# Guided Engineering

Guided Engineering is a way of working with coding agents: you say what should
be true, the agent does the work in small verified units, and every claim of
"done" points at evidence.

It adds no runtime. It uses the agent you already have, two portable Agent
Skills, and one small contract.

## Four things, kept apart

| | What it is | What it is not |
|---|---|---|
| **Human** | Sets intent, constraints and decisions. Stays accountable. | A rubber stamp. |
| **Agent** | The executor: your agent host's current session, or a profile you configured in it. | A role label in a document. |
| **Skill** | A procedure packaged as `SKILL.md` that an agent loads when it needs it. | An agent. It runs nothing by itself. |
| **OPS prompt** | A validated task contract: objective, context, constraints, steps, expected outputs, and the checks that decide completion. | A script. Naming an agent in it starts nothing. |

From a prompt the agent derives a **plan**, and a run leaves **evidence**: a
worklog entry that says which checks ran after the last change and what they
showed.

## The loop

Every unit of work follows the same bounded loop:

**Inspect → validate intent and contract → plan → execute the authorized unit →
verify → diagnose and repair if justified → reverify → record evidence → decide
the next unit.**

A failed check is diagnosed before it is touched. A test is never weakened to
get a pass. A check that passed before the last edit proves nothing about the
final state, so it is run again. A run that cannot be verified is reported as
unverified. [The practice](practice.html) explains each stage.

## What an OPS prompt looks like

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
  Two tests describe the expected behavior and currently fail.
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

The [example page](example.html) shows the request this came from, the full
prompt, the plan and the evidence of the run.

## Where to go

- [Quick start](quick-start.html): install the Skills and run one example.
- [Skills and agents](skills.html): what each Skill does, which hosts were tested.
- [Results](results.html): what a small local study measured, including where the Skills did not help.
- [Specification](contract.html): the normative contract, schemas and validator.
- [Contribute](contribute.html): where everything lives and how to check a change.
