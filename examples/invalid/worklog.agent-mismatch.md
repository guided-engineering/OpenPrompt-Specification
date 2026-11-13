---
# INVALID ON PURPOSE - expected: actor-conflict
# The entry claims a different agent than the prompt it says it executed.
apiVersion: guided-engineering/v1
entryId: 2026-11-13.agent-mismatch
date: '2026-11-13T12:00:00Z'
prompt:
  id: guided-engineering.contract-fixture
  version: 1
agent: release-captain
executor:
  host: claude-code
mode: execute
status: in-progress
---

Fixture used by the contract tests. It is invalid on purpose.
