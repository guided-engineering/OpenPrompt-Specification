# Roadmap

What the reformulation delivered, and what is still open. Nothing listed under
"Open" is delivered.

## Where the project stands

**No human has reviewed this reformulation yet.** An agent session produced it,
and it was merged on the owner's instruction. ADR 0002 is therefore still
`proposed`. "Delivered" below means that a thing exists and passes its checks,
not that someone has accepted it.

In November 2026 the project was rebuilt around six concepts (Human, Agent,
Skill, OPS prompt, Plan, Evidence) and one loop. The design and its
alternatives are in
[ADR 0002](./.guides/architecture/adr/0002-refound-on-agents-skills-and-ops-contracts.md);
the state it started from is in the
[assessment](./.guides/assessment/refoundation-assessment.md); the plan that was
executed is [`prompt.refoundation.yaml`](./.guides/prompts/prompt.refoundation.yaml),
with its [requirement map](./.guides/traceability/refoundation.requirements.md)
and its [run record](./.guides/operation/worklog/2026-11-13.refoundation.md).

## Delivered

| Area | Delivered | Evidence |
|---|---|---|
| Contract | One canonical prompt schema that requires `agent`, `objective` and `verification` and rejects the earlier actor field; an agent map; worklog entries as run records with human-only approvals. | [`ops-contract.md`](./.guides/ops-contract.md), [`schemas/`](./.guides/schemas/) |
| Validator | Checks what a schema cannot: unique YAML keys, agent, path and schema resolution, formats, requirement coverage, completion without proof. Ships as one dependency-free file. | `npm test`, [`dist/ops-validate.mjs`](./dist/ops-validate.mjs) |
| Contract change, characterized | The tests of the new contract, run against the earlier validation and against the new one. This shows what changed; it does not show that the earlier implementation was defective. | [`.guides/testing/contract/`](./.guides/testing/contract/) |
| Examples | Valid, invalid (one per error code), one conversion taken verbatim from history, one end-to-end example that runs. | [`examples/`](./examples/), `npm run example` |
| Conversion | A field map and a replacement table for everything retired. | [`conversion.md`](./.guides/conversion.md) |
| Skills | `ops-author` and `ops-execute`, each usable alone, with the validator bundled. Published exactly as measured. | [`guided-engineering/skills`](https://github.com/guided-engineering/skills) |
| Study | A local pilot of the Skills: five cases, a fixed score, one reserved regression case. It found no measurable benefit and no regression. | [`report.md`](./.guides/testing/skills-study/results/report.md) |
| Plan and coverage | The request as two OPS prompts, a requirement map joined with the run record, and a clause-by-clause audit of the translation by a reviewer that took no part in it. | [`refoundation.requirements.md`](./.guides/traceability/refoundation.requirements.md), [`refoundation.coverage-audit.md`](./.guides/traceability/refoundation.coverage-audit.md) |
| Website | Practice, quick start, example, Skills, results, specification. Published at <https://guided-engineering.github.io/OpenPrompt-Specification/>. | [`docs/`](./docs/), `npm run site` |

## Retired

The specification, requirement, acceptance-criterion, test-case and
traceability-matrix schemas, the role catalogue, the six-stage lifecycle and
the prompts written for them left the active tree. Their replacements are
listed in [`conversion.md`](./.guides/conversion.md); the files are in Git
history at
[`ca82040`](https://github.com/guided-engineering/OpenPrompt-Specification/tree/ca820409df0aebe2b4669aa168ebc82d6bcecd48),
together with the earlier roadmap and its delivery history. The Portuguese
mirror of the roadmap was removed with it; the Portuguese README links here.

## Open

Ordered by how much they limit what can be claimed today.

| # | Gap | Why it matters | A next step |
|---|---|---|---|
| 1 | **The study shows no benefit of the Skills.** Five tasks, one run per task and condition, one model. The agent scored 100, 100, 90, 90 and 100 without the Skills and 100, 100, 100, 90 and 100 with them, and the one difference is a point the baseline lost to the grader. | The Skills are published without evidence that they improve the work. The evidence says only that they load when they should and did no harm on these tasks. | Tasks on which the baseline fails some of the time, with several runs per cell. No claim of improvement before that. |
| 2 | **The case the Skills exist for was not measured.** Every study project already contained the contract documents and the validator. | A project that has neither is where a Skill that carries both should matter. | Repeat two cases in a project that contains nothing but the installed Skill. |
| 3 | **`ops-author` has a known wording defect.** Its field guide can be read as if `expect` were needed only for a check without a command. In both authoring runs of the study the first validation was rejected for that; the validator named the problem and the agent corrected it. The bundled prompt template also carries a header comment that names this repository's validator command. | The first draft of a prompt costs an avoidable validation round. The Skills are published exactly as measured, so the sentence is still there. | Correct both. That makes a new candidate, which is then measured or published as unmeasured. |
| 4 | **The grader has two known limits, and three oracles were repaired after their first run.** Twelve of fifty assertions match specific wording, and edits made through the shell are inferred from the command text. All three assertions missed in the compared runs come from those limits. | A ten-point difference in this study is one assertion, and an assertion can fail for the grader's reasons. | Score file edits from the recorded changes; review pattern assertions against several correct answers before the baseline. |
| 5 | **The blinding of the fifth case is unverified.** It was written by a separate session before any Skill existed, and frozen after the baseline of the other four. The author of the Skills saw its file names. | It is a reserved regression case, not an independent holdout. | Have a case written and frozen by someone else before any baseline run. |
| 6 | **One agent host was tested.** The Skills were run only in Claude Code on Windows. Codex and other hosts are described from their documentation, not from a run. No second host was installed, so no smoke check was made. | "Portable" is a property of the format until a second host confirms the behavior. | Install on a second host, run the activation probes and two cases, record the result. |
| 7 | **No native agent profile was exercised, and none ships.** `guided-engineer` resolved to the current executor everywhere. The `profiles` mapping is validated (the file must exist), but no run used a profile. | The mapping to a real profile is specified, not demonstrated. | Add a thin profile in one host and repeat one execution case with it, as a separate comparison. |
| 8 | **The validator does not enforce the last link to evidence.** A check recorded as `pass` validates without a time, a command or evidence, and even with a non-zero `exitCode`. Nothing checks that a declared output exists when a run is `completed`. `approvals[].reference` is optional. Found by the coverage audit. | An honest but empty record passes, and so does a careless one. | Validator rules for a `pass`, for declared outputs and for approvals. They change frozen inputs of the study, so they come with a new measurement or an explicit "unmeasured". |
| 9 | **Four conventions are practice, not contract.** A check must be able to fail; `createdBy` should name the accountable human; a requirement should say where it comes from; a request that spans repositories needs hand-offs between its prompts and a shared map. They are written in `practice.md` only. The ADR schema still names `relatedSpecs`, a retired concept. | The coverage audit found a check in this repository's own plan whose command could not fail. | Move the conventions that proved necessary into the contract, with the same condition as item 8. |
| 10 | **No continuous integration.** `npm test`, `npm run validate`, `npm run check:refs` and the comparing modes of the generators are run by hand. | A change can be merged without them. | One workflow that runs them on pull requests. |
| 11 | **The schema addresses resolve only while the website is published.** The schemas' `$id` values are GitHub Pages URLs. | An `$id` is an identifier and validation does not fetch it, but a reader following it expects a file. | Keep Pages published from `main`; check the four URLs after each deployment. |
| 12 | **The organization's other repositories still carry earlier dialects** (`gik-gui`, `gik-core`, `guided-agent`). They do not reference this repository, so nothing broke, and nothing was converted. | Readers may take those copies for the current contract. | Convert or remove those copies in their own repositories. |
| 13 | **Worklog entries are written by hand or by an agent.** Nothing generates them from a run. | See item 8. | Decide, with evidence from use, whether a small recorder is worth its cost. No runtime is planned. |
| 14 | **Only the README is bilingual.** The contract, the practice and the website are in English. | Portuguese readers get an entry point, not the specification. | Translate the practice first; keep the contract single-sourced in English. |
| 15 | **No upstream specification artifact.** A prompt carries its own requirements and checks. Whether larger efforts need something above a set of prompts is undecided. | The retired layer answered that question with documents and no evidence. | Revisit only when a real project shows the need. |
## Not planned

A hosted backend, a database, an MCP server, a daemon, a general agent
runtime, a package manager, a benchmark platform, one agent per role, one
Skill per lifecycle phase, or a provider adapter per tool.
