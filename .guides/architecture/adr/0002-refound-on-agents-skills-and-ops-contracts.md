---
$schema: ../../schemas/adr.schema.json
apiVersion: guided-engineering/v1
adrId: 0002-refound-on-agents-skills-and-ops-contracts
title: Refound Guided Engineering on native agents, portable Skills and one OPS task contract
status: proposed
date: '2026-11-13'
context: |
  At commit ca82040 the project described itself as a Spec-Driven Development
  framework. A prompt named a "persona" from a fixed list of ten role labels;
  none of them was a configured executor. Between a request and the work stood
  six artifact schemas, seven lifecycle prompts and a reference example whose
  conformance verdict was DEMO: everything validated and no software existed.
  The documented validation commands were partly broken (the spec command
  fails; date-time formats were never checked; the cross-cutting greps cannot
  return zero hits). Details: .guides/assessment/refoundation-assessment.md.

  Meanwhile agent hosts gained native profiles and a portable Skill format
  (SKILL.md). The role catalogue and the lifecycle prompts duplicate, as
  documents, what those hosts now do as configuration.
decision: |
  We will rebuild the project around six concepts (Human, Agent, Skill, OPS
  prompt, Plan, Evidence) and one bounded loop. The OPS prompt becomes a small
  task contract that requires an `agent`, an `objective` and at least one
  `verification` check; `persona` is rejected. Run facts move out of the prompt
  into worklog entries, where only a human can approve. An agent id resolves
  through an agent map to the host's current executor or to a native profile;
  the default map has one agent, `guided-engineer`. Two Skills, `ops-author` and
  `ops-execute`, carry the procedures and live in their own repository. The
  contract is rebuilt in place under its canonical file names; the earlier
  contract stays in Git history and is converted, not supported.
consequences: |
  Easier: a prompt says what "done" means and a validator can reject what the
  earlier schema accepted (duplicate keys, unresolved agents, escaping paths,
  completion without passing checks). One document format instead of seven.
  The validator ships as one dependency-free file.

  Harder: every earlier document is invalid and needs conversion. The
  repository now contains code (a validator and its tests) and depends on
  Node.js to validate. Agent hosts differ, so host integration is documented
  per host and tested only where a host is available.

  Reversibility: the earlier tree is one checkout away (ca82040). Reverting the
  contract after others adopt it would require another conversion.
alternativesConsidered:
  - Keep `persona` as an alias of `agent` - rejected. Two names for one field invite contradictions, and an alias would present legacy documents as valid.
  - Publish the new contract as a parallel prompt.schema.v3.json - rejected. Parallel files are how v1 and v2 came to coexist with documents validated against the wrong one.
  - One native agent per former persona - rejected. No task in the repository needs ten profiles; a profile exists when a host configuration exists.
  - Keep the spec, requirement, acceptance-criterion, test-case and matrix schemas beside the new contract - rejected. Their only instance was a demonstration, and requirements plus checks inside the prompt carry the useful part.
  - Bind a prompt to its executor by spawning it (an OPS runtime) - rejected. Hosts already run agents; a contract that needs its own runtime stops being portable.
  - Bump apiVersion to mark the break - rejected. The field never tracked compatibility here, and a new number would read as a successor release. Validity is decided by the validator at a repository revision.
relatedAdrs:
  - 0001-choose-spec-format
relatedSpecs: []
---

# 0002 — Refound Guided Engineering on native agents, portable Skills and one OPS task contract

Status: **proposed** · Date: 2026-11-13

This record is the design of the reformulation. It becomes `accepted` when a
human accepts it after reading it. The branch that carries it was merged on
the owner's instruction without such a review, so its status is still
`proposed`. ADR 0001's choice, YAML validated by JSON Schema draft-07,
stands; its references to the retired spec layer are historical.

## Context

See the front matter. The observed state, the reproducible defects and the
source of each decision are in
[`refoundation-assessment.md`](../../assessment/refoundation-assessment.md).

## Decision

### Concept model

| Concept | Responsibility |
|---|---|
| Human | Sets intent, constraints and material decisions; stays accountable. |
| Agent | The executor, or a named execution profile configured in a real agent host. |
| Skill | A reusable capability packaged as `SKILL.md`. |
| OPS prompt | The task contract: intent, context, constraints, actions, expected outcomes. |
| Plan | The task-specific sequence of changes and checks derived from one prompt. |
| Evidence | Files, diffs, command results and observations supporting a completion claim. |

An agent definition is configuration; an agent run does the work. A Skill
extends an agent and is not one. An agent never approves.

### User journey

Intent in plain language → OPS prompt (authored, validated, reviewed by the
human) → plan or execution, on request → worklog entry with check results →
human decision. Described in [`practice.md`](../../practice.md).

### Minimal contract

Normative text: [`ops-contract.md`](../../ops-contract.md). In short:

- Required: `apiVersion`, `id`, `version`, `title`, `agent`, `objective`,
  `context`, `steps`, `output`, `verification`.
- Optional: `workspace`, `inputs`, `dependencies`, `constraints`,
  `requirements`, `stopConditions`, `limits`, `tags`, `createdBy`, `$schema`.
- Removed, each with a stated replacement in [`conversion.md`](../../conversion.md):
  `persona`, `category`, `difficulty`, `language`, the spec-traceability and
  audit fields, and the step-level `if`, `retries`, `onFailure`, `timeout`,
  `output`.
- Only semantics that can be implemented and checked are specified: step
  order, path and agent resolution, completion by passing checks on the final
  state, a repair limit, a time budget, stop conditions.

### Agent resolution

`agent` must match the repository's agent map; the built-in map declares only
`guided-engineer`. An id resolves to a native profile when the map declares one
for the running host, otherwise to the host's current executor. For the local
study the mapping is the current executor of Claude Code, with no native
profile, because a profile changes the system prompt and would be a second
variable.

### Repository ownership

| Repository | Owns |
|---|---|
| `guided-engineering/OpenPrompt-Specification` | Contract, practice, schemas, validator, examples, conversion guide, study evidence, website. |
| `guided-engineering/skills` | `ops-author`, `ops-execute`, installation, their tests, host integration. Carries a mechanically synchronized copy of the schemas and validator. |

### What replaced the retired layer

The specification, requirement, acceptance-criterion, test-case and
traceability-matrix schemas, the role catalogue and the prompts written for
them were retired. A reviewer who took no part in the redesign compared what
that layer did with what does it now
([`refoundation.coverage-audit.md`](../../traceability/refoundation.coverage-audit.md),
section 6).

| Function | Where it lives now | Enforced by |
|---|---|---|
| Explicit intent | `objective`, required | validator |
| Constraints | `constraints`, `stopConditions`, `limits`, and the workspace as the write boundary | validator for shape and paths; the executor for the rest |
| Expected outcomes | `objective`, `output`, `verification[].expect` | validator |
| Verification of outcomes | `verification` checks and worklog `checks`; a run is `completed` only with every check passed | validator |
| Resolvable executor and workspace | `agent` through the agent map; `workspace` and `inputs` | validator |
| Human decisions | Worklog `approvals`, which an agent cannot sign; ADR `status` | validator |
| From a requirement to the evidence that it was completed | `requirements` referenced by checks; the requirement map joined with the run record by `npm run trace` | validator for coverage; the join is generated |

The audit found four things that the retired layer did, or should have done,
and that the contract does not enforce today:

- A check recorded as `pass` validates without a time, a command or evidence.
- Nothing requires a check to be able to fail.
- No field names the accountable human; `createdBy` records authorship.
- A request that spans repositories becomes several prompts with no shared map.

They are written as conventions in [`practice.md`](../../practice.md) and
listed as open in the [roadmap](../../../ROADMAP.md). They are not repaired in
the contract or the validator here, because both are frozen inputs of the local
study: changing them would detach the study's results from the published bytes.

## Acceptance criteria

| Id | Criterion | Checked by |
|---|---|---|
| AC1 | A prompt with a resolvable `agent`, an `objective` and one check is accepted; a missing or unresolved agent, a legacy `persona`, conflicting actors, duplicate keys, invalid output shapes, an unresolvable workspace and missing verification are each rejected with a stable code. | `npm test` |
| AC2 | The change of contract is characterized: the same examples are run against the validation of commit ca82040, which accepts legacy documents and rejects new ones by design. This shows what changed, not that the earlier implementation was defective. | `.guides/testing/contract/red.legacy-baseline.tap.txt` |
| AC3 | Every active artifact of the repository validates, and no active file refers to a retired schema or to an operational persona. | `npm run validate`, `npm run check:refs` |
| AC4 | The bundled validator runs without `node_modules` and agrees with the sources on every example. | `npm test` |
| AC5 | Each Skill is valid by the Agent Skills format, installs alone, and works in a project that has neither this repository nor the other Skill. | Skills repository checks |
| AC6 | The local study is defined before its baseline runs, every attempt is accounted for, and its hypotheses are reported as supported, unsupported or inconclusive. | `.guides/testing/skills-study/` |
| AC7 | One example runs end to end: valid prompt, passing checks, valid worklog entry. | `npm run example` |
| AC8 | The public site presents practice, quick start, example, Skills, results and specification links, and was opened at its real URL. | final report |

## Consequences

See the front matter.

## Alternatives considered

See the front matter.
