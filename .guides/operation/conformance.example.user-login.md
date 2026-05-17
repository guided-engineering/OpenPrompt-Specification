# Conformance Report — `example.user-login`

| Field | Value |
|---|---|
| specId | `example.user-login` |
| specVersion | 1 |
| Spec status at review time | `approved` (not `implemented` — see note below) |
| Auditor | `CodeAuditor` |
| Reviewed at | 2026-05-17T21:15:00Z |
| Prompt | `.guides/prompts/prompt.spec.conformance-check.yaml` |
| Verdict | **DEMO — no backing implementation in this repository** |

---

## Note on this report's nature

This Conformance Report is a **methodology demonstration**, not a verification of a built feature. The `example.user-login` spec exists in this repository to illustrate the SDD lifecycle end-to-end; there is no application code in `OpenPrompt-Specification` itself (the repo is spec-first; consuming projects ship the implementation). The report below shows the exact shape a real conformance review would take when a consuming project implements this spec.

For every requirement, the classification is `not-implemented-here` with the evidence pointing to artifacts in `.guides/` rather than to source-tree files. A real Conformance review against a consuming project would produce `satisfied | partially-satisfied | not-satisfied` per requirement, with evidence pointing to test outputs, CI runs, and commit SHAs.

---

## Per-requirement assessment

### `req.user-login.001` — Happy path

- Classification: **not-implemented-here** (DEMO).
- AC coverage: `ac.user-login.happy` is covered by `tc.user-login.happy.001` (kind: `e2e`).
- Evidence available (spec-level): `.guides/specs/spec.example.user-login.yaml`, `.guides/testing/test-cases.example.user-login.yaml`, `.guides/operation/spec-validation.example.user-login.md`.
- Evidence required for a `satisfied` verdict in a consuming project: passing test output for `tc.user-login.happy.001`; commit SHAs that introduce the route handler and session-cookie path; CI run URL.

### `req.user-login.002` — Opaque error for unknown email / wrong password

- Classification: **not-implemented-here** (DEMO).
- AC coverage: `ac.user-login.invalid-credentials` is covered by three test cases (one per failure mode, plus a property test for byte-identicality).
- Evidence required for `satisfied`: all three test outputs; a manual diff confirming byte-identical responses across the two failure modes; the route-handler commit SHA.

### `req.user-login.003` — Rate limiting after five failed attempts

- Classification: **not-implemented-here** (DEMO).
- AC coverage: `ac.user-login.rate-limit` is covered by two test cases (threshold trip and window expiry).
- Evidence required for `satisfied`: both test outputs; configuration or migration that introduces the rate-limit window; commit SHAs.

### `req.user-login.004` — Latency p95 under 400 ms

- Classification: **not-implemented-here** (DEMO).
- AC coverage: `ac.user-login.latency` is covered by `tc.user-login.latency.p95` (kind: `e2e` — load test).
- Evidence required for `satisfied`: a load-test report at the documented operating point; the test must be reproducible from CI.

### `req.user-login.005` — No plaintext passwords in any sink

- Classification: **not-implemented-here** (DEMO).
- AC coverage: `ac.user-login.no-plaintext` is covered by `tc.user-login.no-plaintext.sentinel` (kind: `property`).
- Evidence required for `satisfied`: zero-hit search results across every log destination listed in the AC's `notes`; a CI step that runs this property test on every PR.

---

## Acceptance criterion coverage summary

| AC ID | Covered by | Kind(s) |
|---|---|---|
| `ac.user-login.happy` | `tc.user-login.happy.001` | e2e |
| `ac.user-login.invalid-credentials` | `tc.user-login.invalid-credentials.unknown-email`, `tc.user-login.invalid-credentials.wrong-password`, `tc.user-login.invalid-credentials.byte-identical` | integration, property |
| `ac.user-login.rate-limit` | `tc.user-login.rate-limit.threshold`, `tc.user-login.rate-limit.window-expiry` | integration |
| `ac.user-login.latency` | `tc.user-login.latency.p95` | e2e |
| `ac.user-login.no-plaintext` | `tc.user-login.no-plaintext.sentinel` | property |

Every AC has at least one test case. No orphan ACs.

---

## Gap list (none blocking for the DEMO verdict)

- All five requirements show `commits: []` in the traceability matrix because no implementation lives in this repository. In a consuming project, these arrays would be populated by `prompt.requirement.traceability.yaml` when the implementation lands.

---

## Overall verdict

**DEMO — no backing implementation in this repository.**

This spec, its acceptance criteria, its test cases, its ADR, and its traceability matrix form a complete, consistent SDD artifact set. A consuming project that implements this spec would re-run `prompt.spec.conformance-check.yaml` against its source tree and produce a real `PASS | PASS-WITH-GAPS | FAIL` verdict using the same prompt and the same matrix.

The SDD loop closes for this example at the methodology level: every AC has at least one test case, every requirement has at least one AC, the traceability matrix references only IDs that exist, and every cross-reference resolves to a real file.

---

Signed: `CodeAuditor`
Timestamp: 2026-05-17T21:15:00Z
