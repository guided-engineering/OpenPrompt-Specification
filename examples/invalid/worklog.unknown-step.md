---
# INVALID ON PURPOSE - expected: record-unknown-step
# The entry reports a step id that the referenced prompt does not define.
apiVersion: guided-engineering/v1
entryId: 2026-11-13.unknown-step
date: '2026-11-13T12:00:00Z'
prompt:
  id: guided-engineering.contract-fixture
  version: 1
agent: guided-engineer
executor:
  host: claude-code
mode: execute
status: in-progress
steps:
  - id: deploy-to-production
    status: done
---

Fixture used by the contract tests. It is invalid on purpose.
