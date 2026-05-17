# Guided Engineering — Spec-Driven Development Process

This document defines the **methodology** that Guided Engineering adopts: **Spec-Driven Development (SDD)**. SDD treats a versioned, validated *specification* as the single source of truth for every artifact produced downstream — code, tests, ADRs, worklogs.

> Brand: **Guided Engineering** (the framework).
> Methodology: **Spec-Driven Development** (how the framework operates).

For the legacy 6-phase SDLC narrative this file replaces, see git history (`.guides/guided-sdlc-process.md`, removed in Phase 2 of the roadmap).

---

## The SDD Lifecycle

Six stages, each owned by a persona and producing a versioned artifact under `.guides/`. Stages are loops, not a waterfall — `Conform` and `Evolve` feed back into `Spec` and `Validate`.

```
   Spec  ──▶  Validate  ──▶  Design  ──▶  Implement  ──▶  Conform  ──▶  Evolve
    ▲                                                                       │
    └───────────────────────────────────────────────────────────────────────┘
```

| # | Stage | Owner persona | Produces | Lives under |
|---|---|---|---|---|
| 1 | Spec | `ProductStrategist` | Versioned spec (`specId`, `requirements[]`, `acceptanceCriteria[]`) | `.guides/specs/` |
| 2 | Validate | `DocumentationCurator` | Spec validation report (completeness, ambiguity, traceability) | `.guides/operation/` |
| 3 | Design | `Architect` | ADR(s) capturing trade-offs, decisions, consequences | `.guides/architecture/adr/` |
| 4 | Implement | `SoftwareDeveloper` | Source code + tests; worklog entry tying changes back to `specId`/`requirementIds` | repo source tree + `.guides/operation/worklog.md` |
| 5 | Conform | `CodeAuditor` | Conformance report comparing implementation to spec; gap list | `.guides/operation/` |
| 6 | Evolve | `Maintainer` | Spec version bump, ADR superseded chain, refactor backlog | `.guides/specs/` + `.guides/architecture/adr/` |

`QAEngineer` is a cross-cutting participant: builds the traceability matrix (`.guides/traceability/`), derives test cases from acceptance criteria, and signs off the Conform stage.

---

## 1. Spec — `ProductStrategist`

**Goal.** Convert a business request, PRD, or stakeholder conversation into a schema-valid spec.

**Inputs.** Stakeholder context, existing related specs.

**Outputs.** `.guides/specs/spec.<feature-id>.yaml` validating against `.guides/schemas/spec.schema.json` (introduced in Phase 3 of the roadmap).

**Prompt (planned, Phase 4).** `prompt.spec.author.yaml`.

**Definition of done.**
- `specId`, `specVersion`, `businessContext`, `requirements[]`, `acceptanceCriteria[]`, `owners[]`, `status: draft` populated.
- Every requirement has at least one acceptance criterion.
- Risk level set (`critical | high | medium | low`).

---

## 2. Validate — `DocumentationCurator`

**Goal.** Confirm the spec is complete, unambiguous, and traceable before any code is touched.

**Inputs.** Spec from stage 1.

**Outputs.** A validation report appended to `.guides/operation/spec-validation.<specId>.md`. Spec `status` advances `draft → in-review → approved`.

**Prompt (planned, Phase 4).** `prompt.spec.validate.yaml`.

**Definition of done.**
- Lint clean: no missing required fields, no ambiguous "should/may" language without a corresponding non-functional requirement.
- Every acceptance criterion is testable (Given/When/Then with concrete examples).
- Spec links to its supersedence chain if not new.

---

## 3. Design — `Architect`

**Goal.** Record architecturally significant decisions before implementation locks them in.

**Inputs.** Approved spec; current architecture state.

**Outputs.** One or more ADRs under `.guides/architecture/adr/NNNN-<short-title>.md` validating against `.guides/schemas/adr.schema.json` (Phase 3).

**Prompt (planned, Phase 4).** `prompt.adr.author.yaml`.

**Definition of done.**
- ADR `status` is `proposed` or `accepted`.
- `context`, `decision`, `consequences`, `alternativesConsidered[]` populated.
- ADR links the `specId` and `requirementIds` it realizes.

---

## 4. Implement — `SoftwareDeveloper`

**Goal.** Build the feature against the spec, test cases derived from acceptance criteria, and the design ADRs.

**Inputs.** Approved spec; ADRs; test cases from `prompt.test-cases.from-spec.yaml` (Phase 4).

**Outputs.** Source code under the project tree; tests; a worklog entry under `.guides/operation/worklog.md` referencing `specId` and the `requirementIds` covered.

**Prompts.** Existing implementation prompts (`prompt.web.generate-page.yaml`, `prompt.init.standalone-nextjs.codebase.yaml`, etc.) can be invoked — each must carry the spec reference in its execution metadata.

**Definition of done.**
- All test cases for the implemented requirements pass.
- Worklog entry includes the commit SHA range and the `requirementIds` closed.
- Spec `status` advances to `implemented`.

---

## 5. Conform — `CodeAuditor`

**Goal.** Independently verify that the implementation matches what the spec actually requires.

**Inputs.** Implemented code; spec at `status: implemented`; traceability matrix.

**Outputs.** `.guides/operation/conformance.<specId>.md` listing satisfied requirements, gaps, and deviations.

**Prompt (planned, Phase 4).** `prompt.spec.conformance-check.yaml`.

**Definition of done.**
- Every requirement is marked `satisfied`, `partially-satisfied`, or `not-satisfied` with evidence (file paths, test IDs, commit SHAs).
- Gaps escalate back to stage 1 (spec amendment) or stage 4 (implementation fix); the loop closes when no `not-satisfied` items remain.

---

## 6. Evolve — `Maintainer`

**Goal.** Keep specs, ADRs, and code mutually consistent as the system grows.

**Inputs.** Change requests, incident reports, technical debt.

**Outputs.** New spec versions (`specVersion` bump); ADRs that supersede earlier ones (`supersededBy`); refactor backlog.

**Definition of done.**
- Every change to a `status: implemented` spec increments `specVersion`.
- Superseded ADRs carry the `supersededBy` pointer; readers can follow the decision chain.
- The traceability matrix is rebuilt and committed.

---

## Cross-cutting: traceability and evidence

The `QAEngineer` owns the **traceability matrix** at `.guides/traceability/matrix.<specId>.yaml`:

```
requirementId  →  specId  →  acceptanceCriterionIds[]  →  testCaseIds[]  →  commits[]  →  evidence[]
```

It is built in stage 4 and updated whenever anything on the chain changes.

**Evidence** is the concrete proof that something happened: file paths, test output, links to CI runs, commit SHAs. Every artifact produced in any stage that mutates state must carry an `evidence[]` array in its execution metadata.

---

## Versioning and supersession

- **`apiVersion`** is locked at `guided-engineering/v1` for every YAML in the repo. It does not bump for content changes.
- **`version`** (integer) increments inside each artifact when its content changes substantively.
- **`supersededBy`** is the safe deprecation mechanism: never breaking-edit a published artifact; ship a new one and point the old at it.
- Schemas evolve via parallel files (`prompt.schema.json` → `prompt.schema.v2.json`, introduced in Phase 3), not in-place edits.

---

## Canonical folder layout

The SDD lifecycle maps 1:1 to folders under `.guides/`:

```
.guides/
├── specs/              # SDD stage 1 — spec artifacts
├── architecture/       # SDD stage 3 — architecture artifacts
│   └── adr/            #   ADR registry
├── operation/          # stages 2, 4, 5 — validation, worklogs, conformance reports
├── traceability/       # cross-cutting — requirement ↔ spec ↔ test ↔ commit ↔ evidence
├── prompts/            # the prompts that drive each stage
├── personas/           # the personas that own each stage
├── schemas/            # JSON Schemas every artifact validates against
├── architecture/adr/   # ADR records (subset of architecture/)
├── assessment/         # one-off project assessments
├── product/            # PRDs, roadmaps (inputs to stage 1)
└── testing/            # test strategy, playbooks (cross-cutting with stage 4)
```

---

## What SDD is *not*

- **Not a waterfall.** Spec→Evolve is a loop; the matrix is the proof that the loop closes.
- **Not paperwork.** Every artifact has a downstream consumer (a prompt, a test, a reviewer). If nothing reads it, delete it.
- **Not a CLI / portal / agent runtime.** Those are deferred (see ROADMAP §9). SDD as defined here works end-to-end with plain text editors and a JSON Schema validator.

---

## Pointers

- Roadmap: `ROADMAP.md` (this file is the methodology; the roadmap is the delivery plan).
- Manual validation: `VALIDATION.md` (how to validate every YAML locally).
- Personas: `.guides/personas/personas.yaml` (canonical list of who owns what).
- Schemas: `.guides/schemas/` (the validation contracts).
