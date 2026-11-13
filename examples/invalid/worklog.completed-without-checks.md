---
# INVALID ON PURPOSE - expected: completed-without-proof
# An executed run cannot be `completed` when no check was run at all.
apiVersion: guided-engineering/v1
entryId: 2026-11-13.completed-without-checks
date: '2026-11-13T12:00:00Z'
agent: guided-engineer
executor:
  host: claude-code
mode: execute
status: completed
checks:
  - id: unit-tests
    result: not-run
---

Fixture used by the contract tests. It is invalid on purpose.
