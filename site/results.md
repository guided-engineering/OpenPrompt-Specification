# Local study results

A small local pilot asked one question: do the two Skills add anything **on top
of the same contract and the same agent**? Every run got the same contract
documents, schemas, validator, task text and starting files. The only
difference between conditions was whether the Skills were installed.

**Short answer: the study does not show that the Skills improve the work, and
it shows no case where they made it worse.** The agent already scored at or
near the top of the scale without them.

Read this page with its size in mind: five tasks, one run per task and
condition, one model, one machine. It shows what happened in this sample. It
does not show that the result holds elsewhere, and it supports no statistical
claim.

## What was measured

{{results}}

## What the numbers do and do not show

- **No room to show a gain.** Without the Skills the two authoring tasks scored
  100 and the three execution tasks 90, 90 and 100. The threshold for "evidence
  of improvement" was ten points on the mean of a track. Neither track could
  reach it.
- **The one higher score is not a quality gain.** C3 went from 90 to 100. The
  baseline lost those ten points because its plan wrote "Node.js ≥ 20" and the
  scoring pattern accepts "Node.js 20" and "Node >= 20" but not the `≥` sign.
  The dependency was stated.
- **C4 lost the same ten points with and without the Skills**, for one reason.
  The harness decides from the text of a shell command whether it edited a
  file. In both runs the tests passed after the only edit, and a later
  read-only command that names the source file was counted as an edit.
- **"Ready" means no harm was seen.** With the Skills all five tasks pass and
  the mean is 98. Without them all five pass too, with a mean of 96.
- **The cost numbers are not savings.** The median changes are small and
  negative, from one run per task. That is inside the tolerance set in advance
  and inside what run-to-run variation would produce.
- **What was not measured.** Every test project already contained the contract
  and the validator. The Skills exist to bring both to a project that has
  neither, and that case is not in this study.

## What the traces show beyond the scores

In both authoring runs with the Skills, the first draft of the prompt was
rejected by the validator: the checks that had a command lacked the required
`expect` field. One sentence in `ops-author` can be read as if `expect` were
needed only for a check without a command. The validator named the field, the
agent corrected it, and the final prompts are valid, so no score changed. The
baseline runs, which read the contract itself, passed their first validation.

This was noticed after the last task had been run, when the rules of the study
no longer allow a change to the Skills. They are published as measured, and the
correction is listed in the [roadmap](../ROADMAP.md).

## How to read the scores

Each task has ten yes-or-no assertions worth ten points, computed by program
from the files an attempt left and from the recorded tool calls: 20 points for
intent and contract, 30 for the required result, 20 for verification, 20 for
scope and control, 10 for traceability. Twelve of the fifty assertions look for
specific facts by pattern and are approximate. A hard failure (a missing or
invalid required artifact, a failing core check, a weakened test, a prohibited
action, or a fabricated record) sets the score of that attempt to zero. None
occurred.

The five tasks:

| Case | Task |
|---|---|
| C1 | Turn a fully specified prose request into an OPS prompt, without implementing it. |
| C2 | Convert and improve a legacy, deficient prompt and report the mapping decisions. |
| C3 | Plan a frozen prompt whose workspace is a nested package. Plan only. |
| C4 | Execute a frozen prompt against a deterministic bug. |
| C5 | Resume a different task from partial progress and a failing check. A reserved regression case: written by a separate session before any Skill existed and frozen after the baseline of C1 to C4. Its blinding could not be verified (the author of the Skills saw its file names), so it is not presented as an independent holdout. |

## What was held constant

- Client: Claude Code 2.1.322, non-interactive. Model `claude-opus-5-5`,
  requested explicitly, with effort `medium`.
- The agent mapping: `guided-engineer` resolved to the current executor. No
  native profile.
- A fresh session and a clean copy of the files for every run; user-level
  Skills, plugins and MCP servers excluded; isolation verified from the
  client's own listing in every run.

## Limits

- One run per task and condition. A ten-point difference is one assertion, and
  an assertion can fail for the grader's reasons, as happened three times here.
- One model at one effort level. A weaker baseline would leave room that this
  one did not.
- The author of the Skills knew the four development cases and wrote their
  scoring. C5 was meant to show whether a result survives a task the author had
  not seen; its blinding could not be verified, so it supports less than that.
- The scoring of three cases was repaired after their first baseline run. Two
  of the four repairs changed what counts as evidence. Those cases were run
  again and the first runs are shown above, not compared.
- No second agent host was installed, so nothing here says how the Skills
  behave outside Claude Code.
- Besides the 19 evaluation attempts, seven other agent sessions prepared or
  verified the study. Counted together they exceed the limit of attempts that
  had been set for evaluation.

## Evidence

- Protocol, written and committed before the first scored run:
  [`protocol.md`](../.guides/testing/skills-study/protocol.md)
- What changed after the first runs, and why:
  [`amendments.md`](../.guides/testing/skills-study/amendments.md)
- The report, with every failed assertion and what the traces show:
  [`results/report.md`](../.guides/testing/skills-study/results/report.md)
- One record per attempt, with the trace and the files it produced:
  [`results/runs/`](../.guides/testing/skills-study/results/runs/)
- The same numbers as data: [`data/study-results.json`](data/study-results.json)
