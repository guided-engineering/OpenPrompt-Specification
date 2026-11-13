# Refoundation Assessment

Observed state of the project before the reformulation, what is kept, what is
replaced, and where each consequential decision comes from. Written on
2026-11-13. Evidence files are in [`baseline/`](./baseline/).

## 1. Observed state

| Item | Observed |
|---|---|
| Repository | `guided-engineering/OpenPrompt-Specification`, public, default branch `main`, no branch protection, no tags, no license file (README says MIT) |
| Starting commit | `ca820409df0aebe2b4669aa168ebc82d6bcecd48` (71 commits, 57 tracked files); blob ids in [`baseline/inputs.ca82040.ls-tree.txt`](./baseline/inputs.ca82040.ls-tree.txt) |
| Working tree at start | freshly cloned, clean; no `AGENTS.md`, `GUIDED.md`, `CLAUDE.md`; one instruction file, `.github/copilot-instructions.md` |
| Remote state | 7 merged pull requests, 6 stale `claude/sdd-*` branches, GitHub Pages not enabled, `guided-engineering/skills` did not exist. Nothing remote was changed during inspection. |
| Website | none: `guided.engineering` does not resolve and `guided-engineering.github.io` returns 404 |
| Machine | Windows 11, PowerShell 7.7, Git 2.55, Node.js 24.12, npm 11.17, Python 3.14.5, GitHub CLI 2.96 (authenticated, organization admin) |
| Agent client | Claude Code 2.1.322, signed in with a subscription login; model not pinned in settings |
| Other clients | Codex is not installed; no second client was available |

The repository contained documents only: no code, no tests, no CI.

## 2. What the project was

A "Spec-Driven Development framework" at self-declared version 0.5.1:

- 15 YAML prompts, each assigned to one of 10 **personas** (a closed enum of
  role labels repeated in three schemas);
- 10 JSON Schemas (draft-07): prompt v1 and v2, persona, worklog, and five
  schemas for specs, requirements, acceptance criteria, test cases and matrices;
- a six-stage lifecycle document that assigned each stage to a persona;
- one reference example whose conformance verdict was `DEMO`;
- a manual validation protocol, bilingual READMEs and roadmaps.

## 3. Reproducible defects

All of these were reproduced at the starting commit with the repository's own
documented commands (`VALIDATION.md`), run unchanged.

| # | Defect | Evidence |
|---|---|---|
| D1 | The documented setup command `npx --yes ajv-cli@5 --version` fails (exit 2): `--version` is not an option. | [`validation-md.commands.out.txt`](./baseline/validation-md.commands.out.txt) |
| D2 | The documented spec validation fails (exit 1): `schema with key or id "" already exists`. Two schemas loaded with `-r` have no `$id`, so the only spec in the repository cannot be validated as documented. | same |
| D3 | `date-time` is never checked: every prompt validation prints `unknown format "date-time" ignored`. Timestamps in approvals and worklogs were accepted unchecked. | same |
| D4 | Three "must return zero hits" greps cannot return zero: they match `VALIDATION.md` itself, `ROADMAP.md` and `ROADMAP.pt-br.md`. | same |
| D5 | Worklog and ADR front matter have a schema but no command to validate them; templates are never validated. | `VALIDATION.md` at `ca82040` |
| D6 | The Python fallback opens files with the platform encoding (cp1252 on Windows), uses the deprecated `RefResolver`, checks no formats, and accepts duplicate YAML keys silently. | [`validation-md.python-fallback.out.txt`](./baseline/validation-md.python-fallback.out.txt), `baseline-python-fallback` source in `VALIDATION.md` |
| D7 | Every prompt's `$schema` is written relative to the repository root although the file sits in `.guides/prompts/`; nothing checks that it names the schema actually used. | prompts at `ca82040` |
| D8 | Step fields `timeout`, `retries`, `onFailure` are used by no prompt and have no defined meaning; `if` is used twice with expressions over undeclared variables. | `prompt.web.generate-page.yaml` at `ca82040` |
| D9 | Run facts (`executedBy`, `executedAt`, `evidence`, `approvals`) are fields of the reusable prompt; none is used. Approvals and worklog sign-offs are attributed to personas, which an agent session wrote itself. | `prompt.schema.v2.json`, `worklog.md` at `ca82040` |
| D10 | A prompt needs no objective and no check to be valid. | `prompt.schema.v2.json` at `ca82040` |
| D11 | Two prompts target other repositories (`./cli` kanban, a Next.js scaffold); one writes instruction files for four tools in formats that are no longer current. | prompts at `ca82040` |
| D12 | The README states a license (MIT) but the repository has no license file. | repository root at `ca82040` |

The new contract tests encode the expected behavior. Run against the validation
of the starting commit, 51 of 59 fail; the 8 that pass do not depend on the
validator under test. Run against the new validator, 59 of 59 pass.
See [`../testing/contract/`](../testing/contract/).

## 4. Legacy inputs

No uploaded legacy files were available, and none were needed: the real
first-generation prompts are in Git history at commit `c2c06ae` (2025-11-07).
They show `apiVersion: ops/v1`; `$schema` paths under `.guided/schema/` and
`.guides/schema/`; personas that are not in any list (`DocumentationEngineer`,
`ProjectBootstrapper`); a `persona` holding a paragraph of role text;
`personaDetails`; `difficulty: intermediate`; step keys `description`, `action`,
`expectedOutcome`; and output `rules` written as one block string. One of them
is the worked conversion example, byte-identical to its historical blob.

## 5. Downstream consumers

Found by reading the organization's other repositories (shallow clones, read
only). Anything outside the organization is unknown.

| Repository | What it has | Effect of the reformulation |
|---|---|---|
| `gik-gui` (private) | Its own copy of the earlier prompt and persona schemas under `.guided/schema/`, a template using `persona: backend-developer` | None mechanically: it does not reference this repository. Its copy is already a different dialect. |
| `gik-core` (private) | One prompt with `apiVersion: ops/v1`, `persona: ExploratoryTester` | Same. |
| `guided-agent` (public) | Runtime prompt templates with `apiVersion: "1.0"` and `persona: "KnowledgeAssistant"`; a different format | Same. |
| `guided-cli` (private) | A `.guided/` folder; no schema reference | Same. |

No schema had an `$id`, so nothing could reference these schemas by URL. The
consumers show that persona ids were free text in practice and never matched
the closed enum.

## 6. Kept, replaced, retired

| Kept | Why |
|---|---|
| YAML validated by JSON Schema draft-07 (ADR 0001) | Still the right substrate; no newer dialect feature is needed. |
| `id`, `title`, `context`, `steps[].actions`, `output[].file/rules`, `workspace`, `dependencies`, `tags`, `createdBy`, integer `version` | They carry meaning and are in use. |
| The `.guides/` layout, ADRs, the worklog as the place for evidence | Useful conventions. |
| "Every requirement has a check" and "completion needs evidence" | The useful core of the spec layer, now inside the prompt and the worklog entry. |
| Bilingual README | Existing posture. |

| Replaced | By |
|---|---|
| `persona` and the persona catalogue | `agent` and an agent map that points at real executors |
| Prompt schema v1 and v2 | One canonical `prompt.schema.json` that requires `objective` and `verification` |
| Persona sign-offs | Human approvals in the worklog entry |
| The six-stage lifecycle | The engineering loop in `practice.md` |
| Manual, partly broken validation | `ops-validate` with tests |

Retired files and their replacements are listed in
[`../conversion.md`](../conversion.md).

## 7. Decisions and their sources

| Decision | Source |
|---|---|
| Six concepts; `agent` replaces operational `persona`; no parallel schema versions; no runtime | The refoundation request |
| Retire the spec/requirement/matrix layer instead of keeping it beside the contract | This assessment (section 2, D10, the `DEMO` example) and the request's instruction to simplify active schemas. **Largest judgment call; reviewable in ADR 0002.** |
| Keep `apiVersion: guided-engineering/v1`; validity decided by the validator | The request (no successor-release signalling) and the field's history: it never tracked compatibility |
| `guided-engineer` resolves to the current executor; no native profile in the study | Claude Code documentation: running the main session as a named agent replaces the default system prompt, which would be a second variable |
| Requirements and checks inside the prompt; run facts in worklog entries | D9, D10 |
| One repair limit and one time budget; no step-level control fields | D8; only semantics an executor can honor and a reader can check |
| Bundled single-file validator | Agent Skills guidance on self-contained scripts; no package registry is involved |
| Skill format, discovery paths, isolation method for the study | The references below |

## 8. References consulted

Accessed 2026-11-13. Detailed, source-linked notes, with each rule tagged as
required by a specification, recommended, vendor-specific or unverified, are in
[`references/`](./references/). They are research notes produced for this work,
paraphrased from the pages named; where they disagree with a live page, the
live page wins.

| Source | Version at access | Used for |
|---|---|---|
| Agent Skills specification and guides, `agentskills.io` | unversioned; site source `agentskills/agentskills@83021e2` | Required `name` and `description`, directory layout, size guidance, evaluation method |
| Reference validator `skills-ref` | 0.1.0 in the repository (labelled demonstration only) | Structural validation of the Skills |
| `skills` CLI, `vercel-labs/skills` | npm `skills@1.8.1`; `main` at `b716f9d` | Repository layout, installation paths, pinning syntax |
| `skills.sh` documentation | live site | What listing means and does not mean |
| Claude Code documentation: skills, subagents, CLI, headless, settings | live site; client 2.1.322 installed | Discovery locations, baseline isolation, invocation evidence, profile format |
| Anthropic Skill authoring best practices | live site | Authoring rules |
| OpenAI Codex documentation: skills, subagents, evaluation article | live site; `developers.openai.com/codex/skills` now redirects to `learn.chatgpt.com/docs/build-skills` | What to document for Codex; nothing was run on Codex |
| GitHub Pages documentation and REST reference | live site | Publishing source and deployment |

Required by the Agent Skills format: a directory with `SKILL.md`, YAML front
matter with `name` (lowercase, hyphens, at most 64 characters, equal to the
directory name) and `description` (at most 1024 characters). Vendor extensions,
kept out of the portable core: Claude Code's extra front-matter keys and
`.claude/agents/*.md` profiles; Codex's `agents/openai.yaml` and TOML agents.
This project's own choices: everything in section 7.

## 9. Working locations

| Name | Path |
|---|---|
| `GE_OPS_ROOT` | `C:\Workspace\guided.engineering\OpenPrompt-Specification`, branch `refoundation/agents-skills-ops` |
| `GE_SKILLS_ROOT` | `C:\Workspace\guided.engineering\guided-engineering-skills` (sibling checkout, created during the work) |
| Study definition and results | `GE_OPS_ROOT/.guides/testing/skills-study/` |
| Study run workspaces | `C:\Workspace\guided.engineering\study-runs\` (outside both repositories, so no repository file can leak into a run) |
| Contract test evidence | `GE_OPS_ROOT/.guides/testing/contract/` |
| Run record of the whole task | `GE_OPS_ROOT/.guides/operation/worklog/` |

Order of work: assessment → contract and tests → bootstrap translated into an
OPS prompt → study defined and frozen → baseline → Skills → measurement →
consolidation → Skills repository → website. The plan itself is
[`../prompts/prompt.refoundation.yaml`](../prompts/prompt.refoundation.yaml).
