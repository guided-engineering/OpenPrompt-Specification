---
# INVALID ON PURPOSE - expected: plan-claims-execution
# A plan executes nothing, so it cannot report a done step or a passed check.
apiVersion: guided-engineering/v1
entryId: 2026-11-13.plan-claims-execution
date: '2026-11-13T12:00:00Z'
prompt:
  id: guided-engineering.contract-fixture
  version: 1
agent: guided-engineer
executor:
  host: claude-code
mode: plan
status: completed
steps:
  - id: write
    status: done
checks:
  - id: exists
    result: pass
---

Fixture used by the contract tests. It is invalid on purpose.
