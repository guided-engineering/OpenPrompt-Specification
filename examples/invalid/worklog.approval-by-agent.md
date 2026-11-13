---
# INVALID ON PURPOSE - expected: approval-by-agent
# An approval names the agent itself. Only a human can approve.
apiVersion: guided-engineering/v1
entryId: 2026-11-13.approval-by-agent
date: '2026-11-13T12:00:00Z'
agent: guided-engineer
executor:
  host: claude-code
mode: execute
status: in-progress
approvals:
  - by: guided-engineer
    at: '2026-11-13T12:05:00Z'
    scope: Merge the change
---

Fixture used by the contract tests. It is invalid on purpose.
