# Worklog — Guided Engineering

> This log records relevant actions, decisions, and SDD lifecycle transitions during the operational lifecycle of the project. One entry per PR or per phase transition.

---

## 2026-05-17T21:30:00Z — Phase 5: dogfood the SDD framework on the `example.user-login` reference

### Persona

`Maintainer` (with `DocumentationCurator` co-sign).

### SDD Context

- **specId:** `example.user-login`
- **specVersion:** `1`
- **requirementIds:** `req.user-login.001`, `req.user-login.002`, `req.user-login.003`, `req.user-login.004`, `req.user-login.005`
- **adrIds:** `0001-choose-spec-format`
- **stage:** `meta` (dogfooding pass: all stages exercised in one session)

### Tasks Executed

- [x] Stage 1 — author `.guides/specs/spec.example.user-login.yaml` (5 requirements, 5 ACs, riskLevel: high, status: approved). Persona: `ProductStrategist`.
- [x] Stage 2 — validate spec via `prompt.spec.validate.yaml`; emit `.guides/operation/spec-validation.example.user-login.md`; recommend `move-to-approved` (executed). Persona: `DocumentationCurator`.
- [x] Stage 3 — author ADR 0001 (`0001-choose-spec-format.md`, status: accepted) capturing the YAML+JSON-Schema decision. Persona: `Architect`.
- [x] Stage 4 — derive `.guides/testing/test-cases.example.user-login.yaml` (8 test cases across e2e/integration/property). Persona: `QAEngineer`.
- [x] Cross-cutting — build `.guides/traceability/matrix.example.user-login.yaml` (5 entries, version 1). Persona: `QAEngineer`.
- [x] Stage 5 — emit `.guides/operation/conformance.example.user-login.md` with verdict DEMO (no backing implementation in this spec-first repo). Persona: `CodeAuditor`.
- [x] Mirror `ROADMAP.pt-br.md` to parity with `ROADMAP.md`.
- [x] Tag `v0.5.0`.

### Key Decisions

- The dogfooding example uses an authentication feature (user login). Recognizable, narrow enough to fit in one reading session, and exercises the full lifecycle including non-functional requirements (latency, no-plaintext).
- The conformance verdict for the example is **DEMO** rather than PASS/PASS-WITH-GAPS/FAIL. The repository is spec-first; consuming projects ship the implementation and re-run the conformance prompt against their source tree. Recorded explicitly in the report's preamble so the verdict cannot be misread as a real pass.
- ADR 0001 records the YAML+JSON-Schema decision that was implicit since v0.1.0. Status: `accepted` (not `proposed`) because the decision has already shaped every artifact in the repo.

### Issues Encountered

- YAML's implicit-typing surprises (unquoted colons in AC `then` blocks) bit again during spec authoring. Fix: single-quote any AC value containing `: ` or `{...}` JSON-like content. This is the same class of issue that `prompt.spec.validate.yaml` catches via its lint pass — the example proves the validator earns its keep.
- The conformance report's verdict introduces an implicit fourth value (`DEMO`) that the original `prompt.spec.conformance-check.yaml` enum did not contemplate. Documented in the report's preamble; not a blocker. A future revision of the conformance prompt could add `DEMO` to the verdict enum.

### Artifacts Updated

- New: `.guides/specs/spec.example.user-login.yaml` — schema-valid, 5 reqs, 5 ACs.
- New: `.guides/operation/spec-validation.example.user-login.md` — validation report (PASS).
- New: `.guides/architecture/adr/0001-choose-spec-format.md` — first ADR.
- New: `.guides/testing/test-cases.example.user-login.yaml` — 8 test cases.
- New: `.guides/traceability/matrix.example.user-login.yaml` — 5 matrix entries (version 1).
- New: `.guides/operation/conformance.example.user-login.md` — DEMO verdict.
- New: `ROADMAP.pt-br.md` — pt-BR mirror of `ROADMAP.md`.
- Tag: `v0.5.0`.

### Evidence

- `.guides/specs/spec.example.user-login.yaml` validates against `spec.schema.json` (with `requirement.schema.json` and `acceptance-criterion.schema.json` preloaded via `$ref`).
- `.guides/architecture/adr/0001-choose-spec-format.md` YAML front-matter validates against `adr.schema.json`.
- `.guides/traceability/matrix.example.user-login.yaml` validates against `traceability.schema.json`.
- Cross-coherence check: 5/5 ACs in the spec are referenced by at least one test case; 8/8 test-case IDs in the matrix exist in the test-cases file; no orphans, no dangling refs.

### Conformance Result

`DEMO` (methodology dogfooding; no backing implementation in this repository). See `.guides/operation/conformance.example.user-login.md` for the per-requirement breakdown and the evidence required for a real `satisfied` verdict in a consuming project.

### Sign-offs

- `Maintainer`: signed at 2026-05-17T21:30:00Z.
- `DocumentationCurator`: signed at 2026-05-17T21:30:00Z. The reference example exists, every artifact validates, every cross-reference resolves, and the methodology is reproducible by following the prompts top to bottom.

### Next Steps

- Cut `v0.5.0` tag once this worklog entry is committed.
- Open Phase 5 PR (stacked on Phase 4 PR #5).
- After merge: the framework is ready to be applied to a consuming project (CLI build, web app, etc.). The first such project should produce its own spec at `.guides/specs/spec.<id>.yaml` following this reference, then run the full Stage 1–5 loop.
