---
# INVALID ON PURPOSE - expected: completed-without-proof
# A run cannot be `completed` while one of its checks failed.
apiVersion: guided-engineering/v1
entryId: 2026-11-13.completed-with-failing-check
date: '2026-11-13T12:00:00Z'
agent: guided-engineer
executor:
  host: claude-code
mode: execute
status: completed
checks:
  - id: unit-tests
    result: fail
    command: node --test
    exitCode: 1
---

Fixture used by the contract tests. It is invalid on purpose.
