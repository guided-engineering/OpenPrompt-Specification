---
apiVersion: guided-engineering/v1
entryId: 2026-11-13.example-completed-run
date: '2026-11-13T12:40:00Z'
prompt:
  id: example.minimal
  version: 1
agent: guided-engineer
executor:
  host: claude-code
  hostVersion: 2.1.322
mode: execute
status: completed
steps:
  - id: write-version
    status: done
    evidence:
      - NODE_VERSION.txt
checks:
  - id: file-matches
    result: pass
    command: node --version
    exitCode: 0
    at: '2026-11-13T12:39:50Z'
approvals:
  - by: octocat
    at: '2026-11-13T13:05:00Z'
    scope: Merge the change into main
    reference: https://github.com/example/project/pull/1#pullrequestreview-1
---

# Completed: version file written

Valid example of a completed run. Every check passed after the last change,
and the approval is a separate, later act by a named human.
