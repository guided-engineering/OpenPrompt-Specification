# Spec Validation Report — `example.user-login`

| Field | Value |
|---|---|
| specId | `example.user-login` |
| specVersion | 1 |
| Reviewed status | `approved` (this report records the transition from `in-review` to `approved`) |
| Reviewer | `DocumentationCurator` |
| Reviewed at | 2026-05-17T20:45:00Z |
| Prompt | `.guides/prompts/prompt.spec.validate.yaml` |

---

## 1. Schema validation

**Result:** PASS.

Command run (from `VALIDATION.md`):

```bash
python3 - <<'PY'
import json, yaml, os
from jsonschema import Draft7Validator, RefResolver
spec = json.load(open('.guides/schemas/spec.schema.json'))
base = 'file://' + os.path.abspath('.guides/schemas') + '/'
v = Draft7Validator(spec, resolver=RefResolver(base_uri=base, referrer=spec))
d = yaml.safe_load(open('.guides/specs/spec.example.user-login.yaml'))
errs = list(v.iter_errors(d))
print('VALID' if not errs else errs[0].message)
PY
```

Output: `VALID`. Cross-schema `$ref` to `requirement.schema.json` and `acceptance-criterion.schema.json` resolved against the local `.guides/schemas/` directory.

---

## 2. Lint — required fields and basic shape

**Result:** PASS.

- All five requirements have non-empty `description`, a `type`, and a MoSCoW `priority`. ✓
- Every `must` requirement (all five) has at least one acceptance criterion. ✓
- Every acceptance criterion has `given`, `when`, `then` populated. ✓
- AC IDs are unique. ✓
- `owners` populated with persona IDs that exist in `.guides/personas/personas.yaml` (`ProductStrategist`, `Architect`, `SoftwareDeveloper`, `QAEngineer`). ✓

---

## 3. Ambiguity check

**Result:** PASS with two editorial observations (non-blocking).

- No occurrences of `"should/may/might/usually/typically"` outside the explicitly non-functional requirements (`req.user-login.004`, `req.user-login.005`).
- No undefined acronyms or undefined user roles. The only acronym `OWASP` is named in full in `source` fields.
- One editorial note: `ac.user-login.latency` references "expected production load" — the AC body provides a concrete operating point (50 rps for 60s), which is enough to write a deterministic test. Accepted.
- One editorial note: `ac.user-login.no-plaintext` is broad by design ("all logs, traces, telemetry, persisted records"). The `notes` block specifies the sentinel-password verification approach, which makes the AC testable. Accepted.

---

## 4. Traceability hygiene

**Result:** PASS.

| Requirement | AC referenced | AC exists | Reverse link |
|---|---|---|---|
| `req.user-login.001` | `ac.user-login.happy` | ✓ | only this requirement references it |
| `req.user-login.002` | `ac.user-login.invalid-credentials` | ✓ | only this requirement references it |
| `req.user-login.003` | `ac.user-login.rate-limit` | ✓ | only this requirement references it |
| `req.user-login.004` | `ac.user-login.latency` | ✓ | only this requirement references it |
| `req.user-login.005` | `ac.user-login.no-plaintext` | ✓ | only this requirement references it |

No orphan ACs. No `relatedSpecs[]` or `supersededBy` set on this spec — both correct (this is a new top-level reference example).

---

## 5. Editorial review (testability and audience)

**Result:** PASS.

Read every AC and asked: "could a tester write a failing test from this without asking the author a clarifying question?"

- `ac.user-login.happy` — concrete inputs and outputs, including cookie attributes. Testable. ✓
- `ac.user-login.invalid-credentials` — body specified byte-for-byte; the byte-identical note prevents drift. Testable. ✓
- `ac.user-login.rate-limit` — exact window, exact threshold, exact response shape. Testable. ✓
- `ac.user-login.latency` — explicit operating point and percentile, with measurement boundary noted. Testable. ✓
- `ac.user-login.no-plaintext` — sentinel-password approach is explicit. Testable. ✓

No requirement solutionizes — none mention specific frameworks/libraries. The spec describes outcomes, not implementations.

---

## 6. Recommended status transition

**Recommendation:** `move-to-approved`.

**Rationale:** Schema validation passed; every required field is populated; every `must` requirement has at least one testable acceptance criterion; no ambiguity defects; traceability is clean (no orphans, no dangling references); the spec describes outcomes without solutioning. Spec advances from `in-review` to `approved`. Implementation may begin.

---

## 7. Defect list

None blocking. Two editorial observations recorded in §3 are accepted as written.

---

Signed: `DocumentationCurator`
Timestamp: 2026-05-17T20:45:00Z
