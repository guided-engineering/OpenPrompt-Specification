# Worklog — Guided Engineering

> This log records relevant actions, decisions, and SDD lifecycle transitions during the operational lifecycle of the project. One entry per PR or per phase transition.
>
> Each entry begins with a YAML front-matter block (between `---` fences) that validates against [`.guides/schemas/worklog.schema.json`](../.guides/schemas/worklog.schema.json). The Markdown body that follows is the readable record; the front-matter is the contract.

---

```yaml
---
$schema: ../.guides/schemas/worklog.schema.json
apiVersion: guided-engineering/v1
entryId: 2026-05-17.example-entry
date: '2026-05-17T20:00:00Z'
persona: SoftwareDeveloper
stage: Implement
specId: example.user-login
specVersion: 1
requirementIds:
  - req.user-login.001
adrIds:
  - 0001-choose-spec-format
conformanceResult: N/A
signOffs:
  - persona: Maintainer
    at: '2026-05-17T20:05:00Z'
  - persona: DocumentationCurator
    at: '2026-05-17T20:05:30Z'
tags:
  - example
  - template
---
```

## Tasks Executed

- [ ] Task 1
- [ ] Task 2

## Key Decisions

- Decision 1 — link to the ADR (`adrIds`) if one was authored.
- Decision 2.

## Issues Encountered

- Issue 1 — context, workaround, resolution.

## Artifacts Updated

- File path → short description of the change.
- Schema or template version bumped, if any.

## Evidence

- `<path-to-test-output-or-report>`
- `<path-to-conformance-report-or-CI-run-url>`

## Next Steps

- Next step 1
- Next step 2
