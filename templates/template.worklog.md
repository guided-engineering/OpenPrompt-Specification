---
# Worklog entry template. Copy to `.guides/operation/worklog/<entryId>.md`.
# One entry records one unit of work. The front matter is the checkpoint and the
# evidence index; the text below it is the readable record.
# Field semantics: .guides/ops-contract.md, "Worklog entries".
apiVersion: guided-engineering/v1
entryId: 2026-01-31.example-entry
date: '2026-01-31T10:30:00Z'
prompt:
  id: example.starter-prompt
  version: 1
agent: guided-engineer
executor:
  host: claude-code
  hostVersion: UNKNOWN
  model: UNKNOWN
mode: execute
status: in-progress
steps:
  - id: write-greeting
    status: done
    evidence:
      - docs/greeting.md
checks:
  - id: greeting-exists
    result: not-run
---

# Short title of what this unit of work did

## What was done

- One line per step, in the order it happened.

## Checks

- For each check: the command or observation, the result, and when it ran
  relative to the last change.

## Failures and repairs

- The failed command, an error summary, the likely cause, what was tried.

## Decisions and open questions

- Assumptions made, and anything a human must decide.

## Next unit

- What should happen next, or why the work stops here.
