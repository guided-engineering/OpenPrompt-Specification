# Converting from the Earlier Contract

The contract in [`ops-contract.md`](./ops-contract.md) replaced an earlier one.
Documents written for the earlier contract are not valid and are not
"compatible"; they are converted. This guide is the map. It is a historical
reference, not an onboarding path: new work starts from
[`practice.md`](./practice.md).

The earlier contract and everything retired with it stay available in Git
history. The last commit before the reformulation is
[`ca82040`](https://github.com/guided-engineering/OpenPrompt-Specification/tree/ca820409df0aebe2b4669aa168ebc82d6bcecd48).

## How to convert a prompt

1. Run the validator on the old file. Each `legacy-*` message names the field
   and its replacement.
2. Map the fields with the tables below. Preserve what the task is for; do not
   carry over what had no meaning.
3. Write what the old format could not say: an `objective` that can be checked
   and at least one `verification` check.
4. Report what you decided and what you could not map. Do not relabel an
   unknown actor silently, and do not pick a side when `persona` and `agent`
   disagree.
5. Validate the result.

The `ops-author` Skill follows this procedure. A complete worked example, with
the legacy input taken verbatim from history, is in
[`examples/conversion/onboarding/`](../examples/conversion/onboarding/report.md).

## Prompt fields

| Earlier field | Now | Note |
|---|---|---|
| `apiVersion: ops/v1` | `apiVersion: guided-engineering/v1` | Only after the whole document is converted. Changing the line alone does not make a document valid. |
| `persona: <RoleName>` | `agent: <id>` | An id from the agent map. A persona was a role label; an agent is an execution profile. What a persona's "principles" asked for goes into `constraints`. If no existing agent fits, say so; do not invent an id. |
| `personaDetails` | — | Removed. Describe executors in the agent map. |
| — | `objective` | New and required. State the checkable end state, not the activity. |
| — | `verification` | New and required. At least one check. |
| `category` | `tags` | Classification only. |
| `difficulty` | — | Removed; no execution meaning. |
| `language` (top level) | — | Removed. A language requirement is a constraint. |
| `businessContext`, `riskLevel` | `context` | Merge the text into `context`. |
| `dependencies` | `dependencies`, `inputs` | Paths that must exist become `inputs`; the rest stay prose. |
| `steps[].actions` | `steps[].actions` | Unchanged. Quote any action containing `: `. |
| `steps[].description`, `action`, `expectedOutcome` | `title`, `actions`, `verification` | One block of text becomes a list of imperative sentences; an expected outcome becomes a check. |
| `steps[].output` | `output[]` | Declare each artifact once, at the top level. |
| `steps[].if` | action text | Conditions are not evaluated. Write "Only when …" into the action, and declare where the value comes from. |
| `steps[].retries`, `onFailure`, `timeout` | `limits` | One repair limit and one time budget for the run. A failed check is repaired, never skipped. |
| `output[].language` | `output[].rules` | The extension shows the format; a natural-language requirement is a rule. |
| `output[].rules` as one block string | `output[].rules` as a list | One rule per item. |
| `specId`, `specVersion`, `requirementIds`, `acceptanceCriteriaIds` | `requirements` | Declared in the prompt and referenced from steps and checks. |
| `executedBy`, `executedAt`, `evidence`, `approvals` | worklog entry | Facts about a run do not belong in the reusable definition. |
| `deprecation`, `supersededBy`, `parentPromptId` | — | Retire a prompt by deleting it; history keeps it. |
| `version` as a string such as `1.3.0` | `version` as an integer | Increment it when the definition changes in substance. |

## Worklog fields

| Earlier field | Now | Note |
|---|---|---|
| `persona` | `agent` and `executor` | The id the work ran as, and what actually acted. |
| `signOffs[].persona` | `approvals[].by` | A human, with a reference to where the approval was given. Role labels cannot sign. Earlier sign-offs are **not** converted into approvals: they stay historical. |
| `stage` | `mode`, `status` | Lifecycle stages are gone. |
| `conformanceResult` | `status`, `checks[].result` | There is no `DEMO` verdict. A run whose checks did not run is not complete. |
| `specId`, `specVersion`, `requirementIds`, `adrIds` | `prompt`, body text | Name the prompt that ran; link ADRs from the body. |
| One `worklog.md` with many entries | One file per entry under `.guides/operation/worklog/` | Standard front matter at the top of each file. |

## Persona catalogue to agent map

The ten personas (`SystemIntegrator`, `SoftwareDeveloper`, `CodeAuditor`,
`ProductStrategist`, `QAEngineer`, `DevOpsOrchestrator`, `AIEngineer`,
`DocumentationCurator`, `Maintainer`, `Architect`) are not replaced by ten
agents. They described roles; none of them was ever a configured executor.

| Earlier idea | Now |
|---|---|
| "This prompt belongs to persona X." | `agent: guided-engineer`, the default, unless the project has configured another real profile. |
| A persona's responsibilities and principles | `constraints` and `context` of the prompt that needs them. |
| A persona "signs off". | A human approves; the worklog entry records it. |
| An independent reviewer persona | An actual second run by a separately configured profile, recorded as such. Naming a reviewer proves nothing. |

"User persona" in product research (a kind of user) is unrelated and unchanged.

## Retired files

| Retired | Replaced by |
|---|---|
| `.guides/schemas/prompt.schema.v2.json`, and the earlier content of `prompt.schema.json` | [`.guides/schemas/prompt.schema.json`](./schemas/prompt.schema.json) |
| `.guides/schemas/persona.schema.json`, `.guides/personas/personas.yaml`, `templates/template.persona.yaml` | [`.guides/schemas/agents.schema.json`](./schemas/agents.schema.json), [`.guides/agents/agents.yaml`](./agents/agents.yaml), [`templates/template.agents.yaml`](../templates/template.agents.yaml) |
| The earlier `.guides/schemas/worklog.schema.json` and `.guides/operation/worklog.md` | [`.guides/schemas/worklog.schema.json`](./schemas/worklog.schema.json), `.guides/operation/worklog/` |
| `.guides/schemas/spec.schema.json`, `requirement.schema.json`, `acceptance-criterion.schema.json`, `test-cases.schema.json`, `traceability.schema.json` and their templates | `requirements` and `verification` inside a prompt; `checks` inside a worklog entry |
| `.guides/sdd-process.md`, `.guides/base/retrofit-sdd-guide.md` | [`practice.md`](./practice.md), [`ops-contract.md`](./ops-contract.md) |
| The `example.user-login` spec, test cases, matrix, validation report and conformance report | [`examples/project/`](../examples/project/), which runs |
| Prompts `spec.author`, `spec.validate`, `acceptance-criteria.author`, `requirement.traceability`, `test-cases.from-spec`, `spec.conformance-check` | No replacement prompt; their artifacts are retired. |
| Prompts `setup.and.assess.project`, `setup.guides.structure`, `generate.ide.llm.instructions`, `execution.guided-cli.phase1-kanban`, `init.standalone-nextjs.codebase`, `web.generate-page`, `base.onboarding.generate` | No replacement prompt; they were written for other projects or for the earlier folder layout. `base.onboarding.generate` survives as the conversion example. |
| `.github/copilot-instructions.md` | [`AGENTS.md`](../AGENTS.md) |
| `VALIDATION.md` (manual commands) | [`VALIDATION.md`](../VALIDATION.md) (`npm test`, `ops-validate`) |

Kept and converted: `operation.commit-analyze-and-apply` and `adr.author`. Kept
as is: the ADR schema, the ADR template and ADR 0001.

## Why the spec layer was retired

The earlier design placed a specification, requirements, acceptance criteria,
test cases, a traceability matrix and a conformance report between a request
and the work. Its reference example ended in the verdict `DEMO`: every artifact
validated, and no software existed. Six schemas, seven prompts and ten role
labels were needed to say what one prompt can say with `objective`,
`requirements` and `verification`, and to prove what one worklog entry proves
with check results. The useful ideas survive: requirements have identifiers,
each one needs a check, and completion needs evidence.

## Historical evidence

Earlier logs, sign-offs and reports are evidence of what happened then. They
are not rewritten, not converted into approvals of new content, and not
validated as current artifacts.

| Artifact | Where it is preserved |
|---|---|
| Worklog entry `2026-05-17.phase-5-dogfood`, with its `Maintainer` and `DocumentationCurator` sign-offs | [`ca82040:.guides/operation/worklog.md`](https://github.com/guided-engineering/OpenPrompt-Specification/blob/ca820409df0aebe2b4669aa168ebc82d6bcecd48/.guides/operation/worklog.md) |
| Conformance report for `example.user-login` (verdict `DEMO`) | [`ca82040:.guides/operation/conformance.example.user-login.md`](https://github.com/guided-engineering/OpenPrompt-Specification/blob/ca820409df0aebe2b4669aa168ebc82d6bcecd48/.guides/operation/conformance.example.user-login.md) |
| The first-generation prompts (`apiVersion: ops/v1`) | commit [`c2c06ae`](https://github.com/guided-engineering/OpenPrompt-Specification/tree/c2c06ae) |
| The earlier roadmap and its delivery history | [`ca82040:ROADMAP.md`](https://github.com/guided-engineering/OpenPrompt-Specification/blob/ca820409df0aebe2b4669aa168ebc82d6bcecd48/ROADMAP.md) |
