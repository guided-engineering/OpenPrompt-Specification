# Guided Engineering — Roadmap

> From a documentation framework (v0.1.x) to a **Spec-Driven Development (SDD) framework** (v0.5.0).

| Field | Value |
|---|---|
| Current version | `0.1.0` |
| Target version | `0.5.0` |
| Target window | Q2–Q3 2026 (≈10 weeks) |
| Status | Phase 0 — Stabilization (not started) |
| Scope | Spec-first only (specs + validation + traceability) |
| Out of scope | CLI, MCP/agents, portal, CI — see §9 |
| Language | English primary; `ROADMAP.pt-br.md` mirror authored in Phase 5 |
| Branch (this roadmap) | `claude/sdd-framework-roadmap-7v3XR` |

---

## 1. Vision & Repositioning

Guided Engineering started as a structured, traceable system to manage the SDLC through modular YAML prompts and personas. We are repositioning the project around **Spec-Driven Development (SDD)** as its methodology.

**What changes**
- The methodology is now explicitly SDD: every artifact downstream of a feature traces back to a versioned, validated spec.
- A new vocabulary lands in the schemas: `specId`, `requirementIds`, `acceptanceCriteria`, `evidence`, `supersededBy`.
- Two narrative documents are rewritten: `.guides/guided-sdlc-process.md` becomes `.guides/sdd-process.md`; READMEs reposition the project.

**What stays**
- The brand **"Guided Engineering"**. SDD is the methodology; the framework keeps its name.
- The YAML + JSON Schema substrate, the persona system, and the worklog convention.
- The bilingual posture (EN + pt-BR).

**What is explicitly out of scope for this roadmap (see §9)**
- CLI / validator binaries.
- MCP servers, agent runtimes, LLM execution glue.
- Public portal / website.
- GitHub Actions CI workflows.
- Multi-repo spec registries.

---

## 2. Outcomes & Success Metrics

**North star.** *Any spec in this repo can be re-implemented identically by a human or an LLM and produce conformant artifacts.*

| Phase | Quantitative gate |
|---|---|
| 0 — Stabilization | 100% of repo YAMLs validate against their declared schema; 0 `.guided/` (singular) references. |
| 1 — Structure | 0 `prompt.*.yaml` files at repo root; all canonical `.guides/` folders exist. |
| 2 — Repositioning | README subtitle includes "Spec-Driven Development framework"; 0 broken internal links. |
| 3 — SDD schemas | 6 new/updated schemas parse as valid JSON and self-validate against draft-07. |
| 4 — SDD prompts | 7 new prompts validate against `prompt.schema.v2.json`; every artifact-producing prompt has a template. |
| 5 — Reference example | 1 end-to-end spec authored using the framework, with AC, traceability matrix, ADR, and conformance report; tag `v0.5.0` cut. |

---

## 3. Glossary (SDD vocabulary)

- **spec** — A versioned, schema-validated description of a feature/capability. Source of truth for all downstream artifacts.
- **requirement** — An atomic, identifiable unit inside a spec (`requirementId`). Functional or non-functional.
- **acceptanceCriteria** — Verifiable conditions for a requirement, expressed as **Given/When/Then** triples.
- **ADR** — Architecture Decision Record. Captures a decision, its context, alternatives, and consequences.
- **traceability matrix** — A mapping between `requirementId` ↔ `specId` ↔ test case ↔ commit ↔ evidence artifact.
- **conformance** — The state of an implementation/output matching its referenced spec.
- **executedBy / executedAt** — Audit metadata recording who/when executed a prompt or produced an artifact.
- **evidence** — Concrete artifacts (files, logs, test reports) that prove a step or acceptance criterion was satisfied.
- **supersededBy** — Pointer from a deprecated artifact to its replacement; powers schema evolution and ADR chains.

---

## 4. Current State Snapshot

Every known defect maps to the phase that resolves it. The first block lists stabilization debt; the second lists the SDD methodology gaps.

### 4.1 Stabilization debt (12 items)

| # | Area | File(s) | Severity | Phase |
|---|---|---|---|---|
| D1 | Invalid JSON | `.guides/schemas/prompt.schema.json` (missing comma after `workspace`) | HIGH | 0 |
| D2 | `apiVersion: ops/v1` instead of `guided-engineering/v1` | `prompt.commit.yaml`, `prompt.copilot.yaml`, `prompt.init.standalone-nextjs.codebase.yaml`, `prompt.onboarding.yaml`, `prompt.web.generate-page.yaml` | HIGH | 0 |
| D3 | `$schema` typo `.guided/schema/` | `prompt.copilot.yaml`, `prompt.discovery.yaml`, `prompt.web.generate-page.yaml` | HIGH | 0 |
| D4 | `$schema` singular `.guides/schema/` | `prompt.execution.yaml`, `prompt.init.standalone-nextjs.codebase.yaml` | MEDIUM | 0 |
| D5 | `difficulty: intermediate` violates enum `[easy, medium, hard]` | `prompt.onboarding.yaml` | MEDIUM | 0 |
| D6 | Forbidden `personaDetails` object | `prompt.init.standalone-nextjs.codebase.yaml` | HIGH | 0 |
| D7 | Persona field holds a multi-line description (not an ID) + non-schema step keys (`description`/`action`/`expectedOutcome`) + pipe-string `rules` + `createBy` typo | `prompt.web.generate-page.yaml` | HIGH | 0 |
| D8 | `DocumentationEngineer` used by 3 prompts but absent from persona enum; near-duplicate of `DocumentationCurator` | `prompt.discovery.yaml`, `prompt.onboarding.yaml`, `.guides/personas/personas.yaml` | HIGH | 0 |
| D9 | Prompts live at repo root, not in `.guides/prompts/` | all 7 `prompt.*.yaml` | MEDIUM | 1 |
| D10 | `setup.guides.structure.yml` uses `.yml` (others use `.yaml`); references `.guided/` | `setup.guides.structure.yml` | LOW | 1 |
| D11 | Legacy 6-phase SDLC narrative; references singular `schema/` | `.guides/guided-sdlc-process.md` | MEDIUM | 2 |
| D12 | `.github/copilot-instructions.md` references singular `schema/` and an outdated persona enum | `.github/copilot-instructions.md` | MEDIUM | 2 |

### 4.2 SDD methodology gaps (8 items)

| # | Gap | Phase |
|---|---|---|
| G1 | No prompt for authoring formal specs from a PRD/business context | 4 |
| G2 | No prompt for validating specs (completeness, ambiguity, conflicts) | 4 |
| G3 | No acceptance-criteria format (Given/When/Then) and no prompt for authoring them | 4 |
| G4 | No traceability matrix artifact and no prompt to build/update it | 4 |
| G5 | No ADR schema, template, or authoring prompt | 3, 4 |
| G6 | No prompt for deriving test cases from specs/AC | 4 |
| G7 | No spec-to-implementation conformance check prompt | 4 |
| G8 | Prompt schema lacks SDD fields (`specId`, `requirementIds`, `acceptanceCriteria`, `evidence`, `approvals`, `supersededBy`, ...) | 3 |

---

## 5. Phase Plan

Each phase block follows the same structure: **Goal · Scope · Deliverables · Acceptance criteria · Risks & mitigations · Exit gate.**

### Phase 0 — Stabilization · Week 1 (~3–5 days)

**Goal.** Make the existing artifacts conformant to the schemas they already declare. Nothing new — only repair.

**Scope.**
- In: schema fixes, `apiVersion` corrections, `$schema` path corrections, persona naming unification, full rewrite of `prompt.web.generate-page.yaml`, drop of `personaDetails` block.
- Out: any file moves (deferred to Phase 1), any new SDD vocabulary (deferred to Phase 3).

**Deliverables.**
- Edit `/home/user/OpenPrompt-Specification/.guides/schemas/prompt.schema.json` — fix invalid JSON (missing comma after `workspace` property).
- Edit `prompt.commit.yaml`, `prompt.copilot.yaml`, `prompt.init.standalone-nextjs.codebase.yaml`, `prompt.onboarding.yaml`, `prompt.web.generate-page.yaml` — set `apiVersion: guided-engineering/v1`.
- Edit `prompt.copilot.yaml`, `prompt.discovery.yaml`, `prompt.web.generate-page.yaml` — fix `$schema` from `.guided/schema/` → `.guides/schemas/`.
- Edit `prompt.execution.yaml`, `prompt.init.standalone-nextjs.codebase.yaml` — fix `$schema` from `.guides/schema/` → `.guides/schemas/`.
- Edit `prompt.onboarding.yaml` — change `difficulty: intermediate` → `medium`.
- Edit `prompt.init.standalone-nextjs.codebase.yaml` — drop `personaDetails`; set `persona: SystemIntegrator`.
- **Rewrite `prompt.web.generate-page.yaml` end-to-end:** persona field must be a single ID (e.g., `SoftwareDeveloper`); remove `description`/`action`/`expectedOutcome` step keys (keep only schema-allowed `actions`, `output`, `timeout`, `retries`, `onFailure`, `if`); convert pipe-string `rules` into arrays of strings; fix `createBy` → `createdBy`.
- Rename all `persona: DocumentationEngineer` → `DocumentationCurator` in `prompt.discovery.yaml`, `prompt.onboarding.yaml`, and any other occurrence.
- Edit `.guides/personas/personas.yaml` — remove `DocumentationEngineer` (the `DocumentationCurator` definition stays as canonical doc persona).
- Create `/home/user/OpenPrompt-Specification/VALIDATION.md` — list every YAML in the repo with the local `ajv` command to validate it.

**Acceptance criteria.**
- [ ] `python -c "import json; json.load(open('.guides/schemas/prompt.schema.json'))"` returns 0.
- [ ] `grep -rn "apiVersion: ops/v1" .` returns 0 hits.
- [ ] `grep -rn "\.guided/" .` returns 0 hits.
- [ ] `grep -rn "DocumentationEngineer" .` returns 0 hits.
- [ ] Every `prompt.*.yaml` validates against `.guides/schemas/prompt.schema.json` using a vanilla JSON Schema validator (e.g., `ajv-cli`).
- [ ] `VALIDATION.md` exists and is up to date.

**Risks & mitigations.**
- Full rewrite of `prompt.web.generate-page.yaml` (414 lines) may take longer than estimated → time-box at 2 days; if overrun, split into a minimal-conformant version + a follow-up enhancement issue.
- Renaming `DocumentationEngineer` may collide with external doc references → grep the entire repo (including READMEs and copilot instructions) before merging.

**Exit gate.** Every YAML in the repo validates against its declared schema, with zero violations.

---

### Phase 1 — Canonical Structure Materialization · Week 2

**Goal.** Move artifacts to the locations the canonical taxonomy already describes, so Phase 2+ authors specs in the right place from day one.

**Scope.**
- In: file moves, folder creation, extension normalization, structure setup prompt update.
- Out: any content changes beyond paths/metadata.

**Deliverables.**
- Move all `prompt.*.yaml` from repo root → `/home/user/OpenPrompt-Specification/.guides/prompts/`.
- Rename `setup.guides.structure.yml` → `.guides/prompts/prompt.setup.guides.structure.yaml`; update its `actions` list to also create `.guides/specs/` and `.guides/traceability/`; remove any remaining `.guided/` references.
- Create `.gitkeep` placeholders in:
  - `.guides/prompts/`
  - `.guides/architecture/`
  - `.guides/architecture/adr/`
  - `.guides/assessment/`
  - `.guides/product/`
  - `.guides/testing/`
  - `.guides/operation/`
  - `.guides/specs/` *(new — SDD home)*
  - `.guides/traceability/` *(new — matrices home)*

**Acceptance criteria.**
- [ ] `ls /home/user/OpenPrompt-Specification/prompt.*.yaml 2>/dev/null` returns nothing.
- [ ] `ls /home/user/OpenPrompt-Specification/.guides/prompts/*.yaml | wc -l` ≥ 8.
- [ ] All 9 canonical folders exist (with `.gitkeep` where empty).
- [ ] `grep -rn "\.guided/" .` still 0.

**Risks & mitigations.**
- Moving prompts may break any external tooling that hard-codes their paths → search GitHub for known consumers before merge; add a note in README mapping old → new paths.

**Exit gate.** Repo root contains only top-level meta files (README, ROADMAP, VALIDATION, LICENSE, .github, .guides, templates); all prompts live in `.guides/prompts/`.

---

### Phase 2 — Repositioning to SDD · Week 3

**Goal.** Update narrative artifacts to reflect the SDD methodology on top of the now-clean substrate.

**Scope.**
- In: README rewrites, SDLC doc replacement, copilot instructions update, addition of the `Architect` persona.
- Out: schema changes (Phase 3), prompt additions (Phase 4).

**Deliverables.**
- Author `/home/user/OpenPrompt-Specification/.guides/sdd-process.md` — describes the SDD lifecycle: **Spec → Validate → Design → Implement → Conform → Evolve**. Each stage maps to an existing or planned prompt and to an artifact under `.guides/`.
- Delete `/home/user/OpenPrompt-Specification/.guides/guided-sdlc-process.md` (rely on git history; add a redirect line in README).
- Update `/home/user/OpenPrompt-Specification/README.md`:
  - Subtitle now reads "*A Spec-Driven Development framework.*"
  - Fix singular `schema/` → `schemas/` and `personas.yml` → `personas.yaml` path references.
  - Add a "Roadmap" subsection linking to `ROADMAP.md`.
  - Add a "Methodology" subsection linking to `.guides/sdd-process.md`.
- Update `/home/user/OpenPrompt-Specification/README.pt-br.md` to parity.
- Update `/home/user/OpenPrompt-Specification/.github/copilot-instructions.md`:
  - Fix schema paths (`schemas/` plural).
  - Update the persona enum reference (add `Architect`, drop `DocumentationEngineer`).
  - Clarify naming conventions: `kebab-case` for filenames and step IDs; `PascalCase` for persona IDs.
- Add new persona **`Architect`** to `.guides/personas/personas.yaml` (role: architecture, owns ADRs).
- Add `Architect` and `DocumentationEngineer→DocumentationCurator` corrections to the persona enum inside `.guides/schemas/prompt.schema.json`.

**Acceptance criteria.**
- [ ] README primary heading still reads "Guided Engineering"; subtitle includes "Spec-Driven Development framework".
- [ ] `.guides/sdd-process.md` exists; `.guides/guided-sdlc-process.md` does not.
- [ ] `.github/copilot-instructions.md` lists `Architect` and does not list `DocumentationEngineer`.
- [ ] `.guides/personas/personas.yaml` contains an `Architect` entry.
- [ ] No broken internal markdown links (verified with `markdown-link-check` or manual click-through).
- [ ] pt-BR README in content parity with EN README.

**Risks & mitigations.**
- Translation drift (pt-BR mirror falling behind EN) → policy: any PR that touches `README.md` must also touch `README.pt-br.md` or open a follow-up issue.

**Exit gate.** The public-facing narrative (README + sdd-process + copilot-instructions) consistently positions the project as an SDD framework, with no path/enum inconsistencies.

---

### Phase 3 — SDD Schema Extension · Weeks 4–5

**Goal.** Introduce the SDD vocabulary at the schema layer first so Phase 4 prompts can be authored against a stable target.

**Scope.**
- In: 1 prompt schema v2 + 5 new artifact schemas. v1 marked deprecated.
- Out: prompts and templates (Phase 4), reference content (Phase 5).

**Deliverables.**
- Create `/home/user/OpenPrompt-Specification/.guides/schemas/prompt.schema.v2.json` — a **strict superset** of v1, adding optional fields:
  - Traceability: `specId`, `specVersion`, `parentPromptId`, `requirementIds[]`, `acceptanceCriteriaIds[]`.
  - Context: `businessContext`, `riskLevel` (enum: `critical | high | medium | low`).
  - Audit: `executedBy`, `executedAt` (ISO 8601), `evidence[]` (array of file paths), `approvals[]` (array of `{persona, at, signature?}`).
  - Lifecycle: `deprecation` (object with `at`, `reason`), `supersededBy` (prompt ID).
- Edit `.guides/schemas/prompt.schema.json` (v1) — add a `description` header note: "Deprecated — superseded by `prompt.schema.v2.json`. Kept for backward compatibility during the v0.x window."
- Create `/home/user/OpenPrompt-Specification/.guides/schemas/spec.schema.json`:
  - Required: `apiVersion`, `specId` (pattern `^[a-z0-9._-]+$`), `specVersion` (int), `title`, `status` (enum: `draft | in-review | approved | implemented | deprecated`), `businessContext`, `requirements[]`, `acceptanceCriteria[]`, `owners[]`, `createdBy`, `createdAt`.
  - Optional: `riskLevel`, `relatedSpecs[]`, `supersededBy`, `tags[]`.
- Create `/home/user/OpenPrompt-Specification/.guides/schemas/requirement.schema.json`:
  - Required: `requirementId`, `type` (enum: `functional | non-functional`), `priority` (enum: `must | should | could | wont`), `description`.
  - Optional: `rationale`, `source`, `acceptanceCriteriaIds[]`.
- Create `/home/user/OpenPrompt-Specification/.guides/schemas/acceptance-criterion.schema.json`:
  - Required: `acceptanceCriterionId`, `given`, `when`, `then`.
  - Optional: `dataExamples[]`, `notes`.
- Create `/home/user/OpenPrompt-Specification/.guides/schemas/adr.schema.json`:
  - Required: `adrId` (pattern `^[0-9]{4}-[a-z0-9-]+$`), `title`, `status` (enum: `proposed | accepted | rejected | deprecated | superseded`), `date`, `context`, `decision`, `consequences`.
  - Optional: `alternativesConsidered[]`, `supersededBy`, `relatedAdrs[]`, `relatedSpecs[]`.
- Create `/home/user/OpenPrompt-Specification/.guides/schemas/traceability.schema.json`:
  - Required: `matrixId`, `version`, `entries[]` where each entry is `{requirementId, specId, acceptanceCriterionIds[], testCaseIds[], commits[], evidence[]}`.

**Acceptance criteria.**
- [ ] Each new schema parses as valid JSON.
- [ ] Each new schema self-validates against JSON Schema draft-07.
- [ ] `prompt.schema.v2.json` accepts every v1-valid prompt currently in the repo (run the manual validation protocol from `VALIDATION.md`).
- [ ] v1 file header carries the deprecation note.

**Risks & mitigations.**
- Schema bloat (too many optional fields) → keep each new field justified by a downstream prompt in Phase 4; any field with no consumer is removed before merge.

**Exit gate.** Six schemas live in `.guides/schemas/`, all parse and self-validate, and v2 is announced (in README §Methodology) as the canonical target for new prompts.

---

### Phase 4 — SDD Prompts & Templates · Weeks 6–8

**Goal.** Ship the seven new prompts that operationalize SDD, plus templates for every structured artifact they produce.

**Scope.**
- In: 7 new prompts + 5 new templates + upgrade of 3 existing templates.
- Out: reference example (Phase 5).

**Deliverables.**

New prompts in `/home/user/OpenPrompt-Specification/.guides/prompts/`:

| File | Persona | Purpose |
|---|---|---|
| `prompt.spec.author.yaml` | `ProductStrategist` | Convert a PRD or business request into a schema-valid spec. |
| `prompt.spec.validate.yaml` | `DocumentationCurator` | Lint a spec for completeness, ambiguity, and traceability hygiene. |
| `prompt.requirement.traceability.yaml` | `QAEngineer` | Build/update the traceability matrix linking requirements ↔ AC ↔ tests ↔ commits ↔ evidence. |
| `prompt.acceptance-criteria.author.yaml` | `QAEngineer` | Emit Given/When/Then triples per requirement. |
| `prompt.adr.author.yaml` | `Architect` | Generate an ADR from a captured decision moment. |
| `prompt.test-cases.from-spec.yaml` | `QAEngineer` | Derive concrete test cases from AC. |
| `prompt.spec.conformance-check.yaml` | `CodeAuditor` | Compare an implementation/output to its spec and emit a gap report. |

New templates in `/home/user/OpenPrompt-Specification/templates/`:
- `template.spec.yaml`
- `template.requirement.yaml`
- `template.acceptance-criterion.yaml`
- `template.adr.md`
- `template.traceability.matrix.yaml`

Upgrade existing templates (currently minimal placeholders) to realistic, schema-valid examples:
- `templates/template.prompt.yaml` — a tiny but complete prompt with two steps and one output, conforming to `prompt.schema.v2.json`.
- `templates/template.persona.yaml` — a realistic persona example with all required fields populated.
- `templates/template.worklog.md` — add SDD-aware fields: `specId`, `requirementIds`, `conformanceResult`.

**Acceptance criteria.**
- [ ] All 7 new prompts validate against `prompt.schema.v2.json`.
- [ ] Every artifact-producing prompt has a matching template under `templates/`.
- [ ] Upgraded templates validate against their respective schemas.
- [ ] Each new prompt declares its `specId` (where applicable) and `evidence[]` requirements.

**Risks & mitigations.**
- Prompt overlap (e.g., test-case generation vs. AC authoring) → enforce single-responsibility: each prompt produces one artifact type and references the others by ID.
- Authoring fatigue across 7 prompts → batch in two waves (waves: author + validate + AC; then traceability + tests + ADR + conformance).

**Exit gate.** The SDD prompt set is complete and validated; the framework can in principle produce a spec, its AC, its tests, its ADRs, its matrix, and its conformance report from end to end.

---

### Phase 5 — Reference Example & Manual Validation Loop · Weeks 9–10

**Goal.** Dogfood the framework on one realistic feature. The example becomes the canonical illustration contributors copy.

**Scope.**
- In: end-to-end execution of the SDD flow for one feature; pt-BR roadmap mirror; v0.5.0 tag.
- Out: anything not directly producing the reference example or shipping the version.

**Deliverables.**
- Author `/home/user/OpenPrompt-Specification/.guides/specs/spec.example.user-login.yaml` using `prompt.spec.author.yaml`.
- Validate it using `prompt.spec.validate.yaml`; commit the validation report under `.guides/operation/`.
- Author acceptance criteria using `prompt.acceptance-criteria.author.yaml`.
- Author `.guides/architecture/adr/0001-choose-spec-format.md` using `prompt.adr.author.yaml` (decision: YAML + JSON Schema, with alternatives considered).
- Author `.guides/traceability/matrix.example.user-login.yaml` using `prompt.requirement.traceability.yaml`.
- Produce a conformance report using `prompt.spec.conformance-check.yaml` against the reference spec.
- Author `.guides/operation/worklog.md` — first real worklog entry, documenting the dogfooding session (persona: `Maintainer` + `DocumentationCurator` sign-off).
- Author `/home/user/OpenPrompt-Specification/ROADMAP.pt-br.md` mirror.
- Cut tag `v0.5.0`.

**Acceptance criteria.**
- [ ] The reference example is producible by following the prompts top to bottom without manual workarounds.
- [ ] README references the example from the "Methodology" section.
- [ ] `.guides/sdd-process.md` references the example as the canonical illustration.
- [ ] Worklog entry contains both reviewer sign-offs.
- [ ] `ROADMAP.pt-br.md` exists and is content-equivalent to `ROADMAP.md`.
- [ ] `git tag v0.5.0` exists.

**Risks & mitigations.**
- Dogfooding reveals deep schema or prompt issues → budget 2 days for fix-back into Phases 3–4; do not ship v0.5.0 with known gaps.

**Exit gate.** v0.5.0 tagged. Project is positioned as an SDD framework with a complete, reproducible reference example.

---

## 6. Schemas, Personas & Prompts to Add for SDD

### 6.1 Schemas

| File | Phase | Purpose |
|---|---|---|
| `.guides/schemas/prompt.schema.v2.json` | 3 | Strict superset of v1; adds SDD traceability/audit/lifecycle fields. |
| `.guides/schemas/spec.schema.json` | 3 | The spec artifact. |
| `.guides/schemas/requirement.schema.json` | 3 | Atomic requirement. |
| `.guides/schemas/acceptance-criterion.schema.json` | 3 | Given/When/Then triple. |
| `.guides/schemas/adr.schema.json` | 3 | Architecture Decision Record. |
| `.guides/schemas/traceability.schema.json` | 3 | Traceability matrix structure. |

### 6.2 Personas

| ID | Phase | Notes |
|---|---|---|
| `Architect` | 2 | **New.** Owns ADRs and architecture-level decisions. |
| `DocumentationCurator` | 0 | **Canonicalized.** Absorbs all `DocumentationEngineer` usages. |
| `DocumentationEngineer` | 0 | **Removed.** Replaced by `DocumentationCurator`. |
| Existing 9 (SystemIntegrator, SoftwareDeveloper, CodeAuditor, ProductStrategist, QAEngineer, DevOpsOrchestrator, AIEngineer, DocumentationCurator, Maintainer) | — | Kept. All gain at least one active prompt by Phase 4. |

### 6.3 Prompts

| File | Phase | Persona |
|---|---|---|
| `.guides/prompts/prompt.spec.author.yaml` | 4 | `ProductStrategist` |
| `.guides/prompts/prompt.spec.validate.yaml` | 4 | `DocumentationCurator` |
| `.guides/prompts/prompt.requirement.traceability.yaml` | 4 | `QAEngineer` |
| `.guides/prompts/prompt.acceptance-criteria.author.yaml` | 4 | `QAEngineer` |
| `.guides/prompts/prompt.adr.author.yaml` | 4 | `Architect` |
| `.guides/prompts/prompt.test-cases.from-spec.yaml` | 4 | `QAEngineer` |
| `.guides/prompts/prompt.spec.conformance-check.yaml` | 4 | `CodeAuditor` |

---

## 7. Governance

### 7.1 Versioning

- `apiVersion` is **locked** to `guided-engineering/v1` across all YAML artifacts. It does not bump for content changes.
- Each artifact carries an internal `version: <int>` that increments per substantive change.
- Schemas evolve via parallel files (`prompt.schema.json` → `prompt.schema.v2.json`) and a `supersededBy` chain — never breaking-edit in place.
- The roadmap itself uses doc-level SemVer (v0.1 → v0.5) tracked in §10.

### 7.2 Contribution flow (manual, until CI lands in Phase 6+)

1. Branch from `main` using the convention `<persona>/<short-topic>` (e.g., `architect/adr-0001-spec-format`).
2. Run the manual validation protocol from `VALIDATION.md` before opening a PR.
3. Commit messages follow Conventional Commits — see `prompt.commit.yaml` for canonical patterns.
4. Every PR that produces or modifies a `.guides/` artifact must include a worklog entry in `.guides/operation/worklog.md`.
5. Sign-offs required to merge:
   - **Phases 0–2:** any Maintainer.
   - **Phases 3–5:** Maintainer + DocumentationCurator (recorded in the worklog).

### 7.3 Manual validation protocol (`VALIDATION.md`)

`VALIDATION.md` (created in Phase 0) lists every YAML in the repo and the local command used to validate it. The repo does not require any tooling to be installed, but recommends `ajv-cli`:

```bash
npx ajv-cli@latest validate \
  -s .guides/schemas/prompt.schema.v2.json \
  -d ".guides/prompts/*.yaml"
```

Schemas are draft-07; any conformant validator works.

---

## 8. Out-of-Roadmap principles (the "no" list)

These guard the spec-first scope of v0.5.0 and prevent scope creep into the topics deferred to §9:

- No code execution, runtime, or daemons in this repo.
- No bundled CLI binaries, npm packages, or Docker images.
- No agent loops or LLM glue committed to `main`.
- No CI workflows under `.github/workflows/` until §9 phases.
- No automatic generation pipelines — every artifact is human-reviewed at PR time.

---

## 9. Out of Scope — Future Phases (flagged)

| Topic | Why later |
|---|---|
| CLI / validator binary (Node/TS) | Needs stable schemas (Phase 3) and a stable prompt set (Phase 4) first. Otherwise we ship a CLI that immediately needs breaking changes. |
| CI on GitHub Actions | Same as above. Once `VALIDATION.md` proves the manual flow works, codifying it in CI is mechanical. |
| MCP server / agent runtime | Cross-cuts with execution semantics that are not specified yet. Belongs to an explicit "Execution Layer" sub-project. |
| Public portal / website | Documentation-only. Out of scope for the spec-first framework; consider after v1.0. |
| Multi-repo spec registry | Premature distribution before the single-repo model is proven. |
| Auto-generated test suites from specs | Phase 4 only emits test *cases*; turning them into runnable tests requires a target stack and is deferred. |

---

## 10. Roadmap Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-05-17 | 0.1 | Initial draft authored. Captures stabilization debt, SDD gaps, 6-phase plan to v0.5.0. | Maintainer (via Guided Engineering) |
