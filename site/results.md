# Local study results

A small local pilot asked one question: do the two Skills add anything **on top
of the same contract and the same agent**? Every run got the same contract
documents, schemas, validator, task text and starting files. The only
difference between conditions was whether the Skills were installed.

Read this page with its size in mind: five tasks, one run per task and
condition, one model, one machine. It shows what happened in this sample. It
does not show that the result holds elsewhere, and it supports no statistical
claim.

## What was measured

{{results}}

## How to read the scores

Each task has ten yes-or-no assertions worth ten points, computed by program
from the files an attempt left and from the recorded tool calls: 20 points for
intent and contract, 30 for the required result, 20 for verification, 20 for
scope and control, 10 for traceability. Some assertions look for specific facts
by pattern and are approximate. A hard failure (a missing or invalid required
artifact, a failing core check, a weakened test, a prohibited action, or a
fabricated record) sets the score of that attempt to zero.

The five tasks:

| Case | Task |
|---|---|
| C1 | Turn a fully specified prose request into an OPS prompt, without implementing it. |
| C2 | Convert and improve a legacy, deficient prompt and report the mapping decisions. |
| C3 | Plan a frozen prompt whose workspace is a nested package. Plan only. |
| C4 | Execute a frozen prompt against a deterministic bug. |
| C5 | Resume a different task from partial progress and a failing check. Held out: created by a separate session and not opened by the Skill author until the Skills were frozen. |

## What was held constant

- Client: Claude Code, non-interactive. Model `claude-opus-5-5`, requested
  explicitly, with effort `medium`.
- The agent mapping: `guided-engineer` resolved to the current executor. No
  native profile.
- A fresh session and a clean copy of the files for every run; user-level
  Skills, plugins and MCP servers excluded; isolation verified from the
  client's own listing in every run.

## Limits

- One run per task and condition. A ten-point difference is one assertion.
- One model at one effort level. A strong baseline leaves little room to
  improve; another model could behave differently.
- The Skill author knew the four development cases. The held-out case shows
  whether a result survives a task the author had not seen, and its isolation
  was procedural, not enforced.
- No second agent host was installed, so nothing here says how the Skills
  behave outside Claude Code.

## Evidence

- Protocol, written and committed before the first scored run:
  [`protocol.md`](../.guides/testing/skills-study/protocol.md)
- Full report with every failed assertion and hard failure:
  [`results/report.md`](../.guides/testing/skills-study/results/report.md)
- One record per attempt, with the trace and the files it produced:
  [`results/runs/`](../.guides/testing/skills-study/results/runs/)
- The same numbers as data: [`data/study-results.json`](data/study-results.json)
