# Local study of the OPS Skills: report

2026-11-13. Protocol: [`../protocol.md`](../protocol.md). Changes after the
freeze: [`../amendments.md`](../amendments.md). Tables generated from the
records: [`report.generated.md`](./report.generated.md). The same numbers as
data: [`results.json`](./results.json). One record per attempt, with its trace
and the files it produced: [`runs/`](./runs/).

## Result in four sentences

The Skills were loaded when they should be and stayed out when they should
not. With them, the five tasks scored 100, 100, 100, 90 and 100; without them,
100, 100, 90, 90 and 100. The baseline left no room to show an improvement, and
the one case that scored higher with the Skills did so on an assertion where
the baseline's miss was the grader's, not the agent's. **This study does not
show that the Skills improve the work, and it shows no case where they made it
worse.**

Read every number here with the size of the study in mind: five tasks, one run
per task and condition, one model at one effort level, one machine. Nothing
here supports a statistical claim or a claim about other models, hosts or
projects.

## What was compared

The same client (Claude Code 2.1.322, non-interactive), the same model
(`claude-opus-5-5`, effort `medium`), the same permissions and tools, the same
contract kit, task text, fixtures and oracles in every run. The agent
`guided-engineer` resolved to the current executor in every run; no native
profile was used. The only difference between conditions was whether the two
Skills were installed in the workspace. Each run was a fresh session in a clean
copy of the fixture. User-level Skills, plugins and MCP servers were excluded,
and the client's own listing confirmed in every run which candidate Skills were
present.

The Skills are commit `146c4b5` of the Skills repository, frozen in
[`candidates.json`](./candidates.json) before any assisted run.

## The scores, in the three forms they exist in

**1. Original scoring.** The first baseline runs, graded by the oracles as
frozen before those runs:

| C1 | C2 | C3 | C4 |
|---:|---:|---:|---:|
| 90 | 100 | 80 | 90 |

**2. Diagnostic rescoring.** After those runs the oracles of C1, C3 and C4 were
repaired. Two of the four repairs corrected a grader that could not read
evidence that was there. The other two changed what counts as evidence, which
is a change of an acceptance criterion made after seeing a run
([`amendments.md`](../amendments.md), section 2). Replaying the stored evidence
of the first runs under the repaired oracles gives:

| C1 | C2 | C3 | C4 |
|---:|---:|---:|---:|
| 100 | (unchanged, 100) | 100 | 100 |

A replay is not a run. These figures explain the repairs and are not compared
with anything.

**3. Admissible matched results.** A changed oracle invalidates the run made
before it, so C1, C3 and C4 were executed again without Skills under the
repaired oracles. Those reruns, and the untouched first run of C2, are the
baseline. Which run counts follows from that rule and not from its score: the
reruns of C3 and C4 scored lower than the replays.

| Case | Track | Without Skills | With Skills | Change | Skill invoked |
|---|---|---:|---:|---:|---|
| C1 write a prompt from a request | authoring | 100 | 100 | 0 | `ops-author` |
| C2 convert and improve a legacy prompt | authoring | 100 | 100 | 0 | `ops-author` |
| C3 plan a prompt in a nested workspace | execution | 90 | 100 | +10 | `ops-execute` |
| C4 execute a prompt against a bug | execution | 90 | 90 | 0 | `ops-execute` |
| C5 resume from a recorded checkpoint (reserved) | execution | 100 | 100 | 0 | `ops-execute` |

No hard failure occurred in any run. No run reached its time limit. No human
intervened.

## The ceiling, and the three missed assertions

The baseline means are 100 for authoring and 93.3 for execution. The
improvement threshold is a mean gain of ten points on a track, which neither
track could reach.

Three assertions were missed in admissible runs. Each was inspected against the
stored trace. None was changed: the oracles are frozen, and a changed oracle
would have required reruns the budget did not have.

| Assertion | Run | What the trace shows |
|---|---|---|
| C3-04 | without Skills | The plan states the dependency as "Node.js ≥ 20". The pattern accepts "Node.js 20" and "Node >= 20" and not the `≥` sign. The dependency was stated. |
| C4-06 | without Skills | The tests passed after the only edit. In the same command the agent also ran a scratch script that names the source file, and the command contains `2>&1`. The shared edit detector treats a shell command that names a file and contains `>` as a write to it, so the verifying command was counted as an edit. |
| C4-06 | with Skills | The tests failed before the edit, the file was written once, and the tests passed after it. A later read-only `node -e` comparison names the source file and contains `=>`, and was counted as an edit. |

So the only positive difference in the table, C3, comes from an assertion that
the baseline missed for a reason of the grader. It is not a quality gain. C4-06
failed identically in both conditions for the same reason.

## Hypotheses

| | Hypothesis | Verdict in this sample | Why |
|---|---|---|---|
| H1 | `ops-author` improves intent preservation, contract validity and actionable verification in authored prompts | **unsupported** | Baseline 100 on both cases; change 0. A gain could not have been observed. |
| H2 | `ops-execute` improves correct planning, scoped implementation and closure of the verify-repair loop | **unsupported** | Baseline mean 93.3, with Skills 96.7. The difference is one assertion, and it is a grader artifact. |
| H3 | Any observed quality gain has an acceptable cost in time, tokens, tool calls and human intervention | **inconclusive** | There is no quality gain whose cost could be judged. The measured cost is reported below as it is. |

"Unsupported" means that this sample does not support the hypothesis. It does
not mean the opposite was shown.

What follows for the Skills: their measured value on these tasks is none,
because a current model with the contract documents and the validator in the
project already does this work at the top of the scale. What the Skills add
that this study held constant, and therefore did not measure, is the contract
and the validator themselves in a project that has neither.

## Readiness by the local thresholds

With the Skills, all five cases pass (80 or more, no hard failure) and the mean
is 98, above the threshold of 85. That meets the readiness thresholds. The
baseline meets them too, with a mean of 96, so readiness says that the Skills
did no harm on these tasks. It does not say that they helped.

## Activation

Six short sessions against the final candidate, three per Skill. Activation is
read from the trace: a `Skill` tool call that names the Skill.

| Skill | Request | Expected | Observed |
|---|---|---|---|
| `ops-author` | names the Skill | loads | loaded |
| `ops-author` | asks for "a task contract for our agent, in this project's format" | loads | loaded |
| `ops-author` | asks for a chatbot system prompt | stays out | stayed out |
| `ops-execute` | names the Skill | loads | loaded |
| `ops-execute` | "Please carry out" a prompt file | loads | loaded |
| `ops-execute` | asks to run a package's tests | stays out | stayed out |

Six of six as expected. In the five scored runs with the Skills, both Skills
were listed by the client and exactly the matching one was invoked. Being
available and being invoked are recorded separately in every record.

## Cost

Change of the run with Skills against its baseline, per case. The tolerance set
in advance was a median increase of at most 50%.

| Case | Elapsed | Tokens processed | Output tokens | Tool calls |
|---|---:|---:|---:|---|
| C1 | −3% | +72% | −13% | 12 → 10 |
| C2 | −4% | −15% | −1% | 9 → 11 |
| C3 | −20% | −1% | −21% | 12 → 11 |
| C4 | −10% | −3% | −13% | 14 → 13 |
| C5 | −1% | +4% | −4% | 11 → 12 |
| **Median** | **−4%** | **−1%** | **−13%** | |

The medians are inside the tolerance. That is all they show. One run per case
cannot separate a difference of a few percent from run-to-run variation, so
these numbers are not evidence of a saving. Tokens processed are mostly cached
context that is read again on every turn; the client's cost figures in the
records are list-price estimates, not charges.

## What the traces show beyond the scores

Observed, not scored, and from one run per case:

- **A wording defect in `ops-author`.** In both authoring runs with the Skills
  (C1 and C2), the first validation was rejected with `missing required
  property expect` on every check that had a `run` command. The field guide of
  the Skill says that a check without a command uses `expect` to say what to
  observe, which can be read as if `expect` were needed only then. It is always
  required. The validator named the problem, the agent corrected it, and the
  final prompts are valid. The baseline runs, which read the contract and the
  schema, passed their first validation. This was noticed when the traces were
  read after the study was complete. The decision not to refine had been taken
  from the scores and the failed assertions, before C5 was run, and a change
  after C5 is not allowed. The candidate is therefore left as measured, and the
  defect is the first follow-up item.
- In C1 with the Skills the first draft also failed to parse, because a command
  containing `: ` was not quoted, although the Skill lists that gotcha.
- With `ops-author`, the agent did not try out the task or its check commands
  against the code. In the baseline of C1 it ran its check commands against the
  unchanged code to confirm that they fail. Neither is scored.
- With `ops-execute` the agent still added a comparison of old and new behavior
  that nobody asked for (C4), as the baseline did.
- With the Skills the agent read fewer project documents first. In C1 it
  invoked the Skill and read the project's short `.guides/README.md` and the
  Skill's template, where the baseline read that README, the conversion guide,
  the contract and the schema. Tokens processed were nevertheless higher in
  that run (+72%), with three validation rounds instead of one.
- In C5, with and without the Skills, the agent checked the earlier session's
  log against the files, found a step that was recorded as done and was not,
  left the user's uncommitted edit alone, and updated the same entry.

## C5

C5 was written by a separate agent session that knew nothing about the Skills,
before any Skill existed. It was frozen by hash after the baseline of C1 to C4.
The author of the Skills received its file names and shared a scratch directory
with its author for about half an hour; that the contents were not read is the
author session's statement, which nothing recorded proves or contradicts
([`amendments.md`](../amendments.md), section 6). It is therefore an
**independently authored reserved regression case, frozen after the development
baseline, with unverified blinding**, and not an independent holdout.

The final candidate was frozen in a commit that precedes every C5 run. C5
scored 100 without and 100 with the Skills. That supports one statement: on a
resume task that the Skills were not developed against, as far as can be shown,
they caused no regression.

## What was spent

| | Used | Limit |
|---|---:|---:|
| Evaluation attempts | 19 | 19 without a refinement, 24 with one |
| Evaluated run time | 17.6 minutes | 120 minutes |
| Skill refinements | 0 | 1 |
| Infrastructure retries | 0 | 1 |
| Second-client smoke checks | 0 (`NOT_RUN`) | 2 |

The 19 attempts are ten scored tasks, three corrective reruns and six
activation probes. Three of the ten scored tasks are the first baseline runs
that were later set aside, so the repairs of the oracles cost three attempts.

Seven more agent sessions are in the ledger and counted apart, as the protocol
classified them before the first scored run, plus one class added later: two
environment probes and one harness check before the freeze, the session that
wrote C5 and the one that froze it, and two sessions that only checked that the
client lists an installed Skill (prompt: "Reply with the single word OK.").
Counted together with the evaluation attempts the total is 26, which is above
both limits. Three deterministic replays are also in the ledger; they are not
agent runs.

Unknown: the duration of the replays; the token usage of the installation
checks and of the session that froze C5. The duration and tokens of the session
that wrote C5 are as its host reported them.

No second agent host was installed on the machine, and no attempt was left for
one, so no smoke check was run.

## Limits of this study

- One run per task and condition. A ten-point difference is one assertion.
- One model at one effort level. A weaker baseline would leave room that this
  one did not.
- Twelve of the fifty assertions look for specific facts by pattern, and the
  harness infers file edits made through the shell from the command text. All
  three misses came from those two limits of the grader: one from a pattern,
  two from the edit detector.
- The author of the Skills knew C1 to C4 and wrote their oracles.
- The oracles of three cases were repaired after their first run. Two repairs
  changed what counts as evidence. The affected cases were run again; the first
  runs are kept and not compared.
- The blinding of C5 is unverified.
- Assertions C1-07, C1-10, C2-07, C2-10 and C3-07 read validator evidence at
  the level of the tool call and can under-credit an attempt. That did not
  happen in an admissible run.
- Every project in the study already contained the contract documents and the
  validator. The case the Skills exist for, a project that has neither, was not
  measured.
- One host on one operating system.

## Follow-up items

1. Correct the sentence about `expect` in the field guide of `ops-author`. It
   makes a new candidate that this study did not measure.
2. Measure the Skills in a project without the contract kit.
3. Use tasks on which the baseline fails some of the time, with more than one
   run per cell, before making any claim of improvement.
4. Replace the shell-write heuristic of the harness with the file changes the
   harness already records.
5. Run two cases and the probes on a second host.
