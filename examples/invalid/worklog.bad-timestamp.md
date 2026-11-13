---
# INVALID ON PURPOSE - expected: schema
# `date` is not an RFC 3339 date-time. Format checks are enforced, not assumed.
apiVersion: guided-engineering/v1
entryId: 2026-11-13.bad-timestamp
date: 13/11/2026 12:00
agent: guided-engineer
executor:
  host: claude-code
mode: plan
status: in-progress
---

Fixture used by the contract tests. It is invalid on purpose.
