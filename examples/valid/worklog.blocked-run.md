---
apiVersion: guided-engineering/v1
entryId: 2026-11-13.example-blocked-run
date: '2026-11-13T12:20:00Z'
prompt:
  id: example.minimal
  version: 1
agent: guided-engineer
executor:
  host: claude-code
  hostVersion: 2.1.322
  model: UNKNOWN
mode: execute
status: blocked
steps:
  - id: write-version
    status: blocked
checks:
  - id: file-matches
    result: fail
    command: node --version
    exitCode: 127
    at: '2026-11-13T12:19:40Z'
---

# Blocked: `node` is not on PATH

Valid example of an honest failure record. The run stopped at the first step
because the dependency was missing; nothing was written.

- Failed command: `node --version` (exit code 127)
- Likely cause: Node.js is not installed in this environment.
- Attempted correction: none; installing a runtime is outside the task.
- Next action: a human installs Node.js 20 or newer, then the prompt is run again.
