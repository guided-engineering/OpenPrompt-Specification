# Local study of the OPS Skills: protocol

Written and committed before the first scored run, in the same commit as the
cases, the oracles and the harness. The hashes of every frozen file are in
[`frozen.json`](./frozen.json); `npm run study:frozen` verifies them. Anything
changed afterwards is listed in [`amendments.md`](./amendments.md) with its
reason. The order of events can be read from the commit history.

## 1. Purpose

To test whether two Skills, `ops-author` and `ops-execute`, add value **on top
of the same OPS contract and the same agent configuration**. Every condition
gets the same contract documents, schemas, validator, task text and initial
files. The only thing that changes is whether the Skills are available.

This is a small local pilot: five tasks, one run per task and condition, one
model, one machine. It can show what happened in this sample. It cannot show
that YAML is better than Markdown, that one model is better than another, or
that a result generalizes to other projects.

## 2. Hypotheses

Recorded as hypotheses, not as expected findings. Each is reported as
**supported**, **unsupported** or **inconclusive** within this sample.

| | Hypothesis | Judged on |
|---|---|---|
| H1 Authoring | `ops-author` improves intent preservation, contract validity and actionable verification in generated or improved OPS prompts. | C1, C2 |
| H2 Execution | `ops-execute` improves correct planning, scoped implementation and closure of the verify-repair loop. | C3, C4, C5 |
| H3 Efficiency | Any observed quality gain has an acceptable cost in elapsed time, tokens, tool calls and human intervention. | all matched pairs |

## 3. Conditions

| Condition | Configuration |
|---|---|
| `WITHOUT_SKILLS` | Contract kit and fixed agent mapping; the Skills exist nowhere the client can discover them. |
| `INITIAL_SKILLS` | The same, plus the first frozen Skill candidate in `<workspace>/.claude/skills/`. |
| `REFINED_SKILLS` | The same, plus the Skill candidate after one optional refinement. Exists only if a refinement is made. |

Held constant, and recorded in every run record:

| Setting | Value |
|---|---|
| Client | Claude Code, started as `claude -p` (version recorded per run; 2.1.322 when this was written) |
| Model | `claude-opus-5-5`, requested explicitly. It is the client's own default on this machine, read from a probe before pinning. |
| Reasoning | `--effort medium`, requested explicitly. The client does not expose its default, so one level is fixed instead of leaving it UNKNOWN. |
| Permissions | `--permission-mode acceptEdits`, tools allowed without prompt: `Bash PowerShell Read Edit Write Glob Grep Skill` |
| Settings | `--setting-sources project,local --strict-mcp-config --no-session-persistence` |
| Environment | Variables named `CLAUDE*`, `ANTHROPIC*`, `MCP_*` are removed, so a run does not inherit the session that started it. |
| Agent | `agent: guided-engineer`, resolved to the current executor. No native profile, because one would replace the default system prompt and add a second variable. |
| Task text | `cases/<case>/task.md`, given verbatim on standard input. Identical in every condition and never mentions a Skill. |
| Initial files | `cases/<case>/fixture/` plus the contract kit [`kit/files/`](./kit/files/), identical in every condition. |
| Sessions | A fresh client process and a fresh copy of the files per run. No output, fix, answer or conclusion of one run is given to another. |

### Isolation

Each run works in its own directory under `study-runs/`, outside both project
repositories, initialized as its own Git repository. The Skills are absent from
that directory in `WITHOUT_SKILLS` and copied into `.claude/skills/` from a
frozen commit of the Skills repository otherwise. User-level Skills, plugins
and MCP servers are excluded by the settings flags; the client's bundled Skills
are the same in every condition.

Isolation is **enforced** by configuration and **verified** per run from the
client's own listing: a run whose `init` record does not list exactly the
expected candidate Skills is `NOT_SCORED`. Asking an agent to ignore a Skill is
never used. Availability and invocation are distinct: invocation is read from
`Skill` tool calls in the trace.

The scorer, the oracles and the other runs are outside the run's directory.
Nothing prevents an agent from reading elsewhere on the disk, so separation of
scorer files is by location, not by a sandbox.

## 4. Cases

| Case | Complexity, split | Track | Task |
|---|---|---|---|
| C1 [`c1-author-basic`](./cases/c1-author-basic/) | basic, development | authoring | Turn a fully specified prose request into an OPS prompt. Write the prompt only. |
| C2 [`c2-convert-legacy`](./cases/c2-convert-legacy/) | intermediate, development | authoring | Convert and improve a legacy, deficient prompt (`persona`, a vague step, a step condition, no check) and report the mapping decisions. Implement nothing. |
| C3 [`c3-plan-nested`](./cases/c3-plan-nested/) | intermediate, development | execution | Plan a frozen, valid prompt whose workspace is a nested package; record the plan as a plan-mode worklog entry. Plan only. |
| C4 [`c4-execute-bugfix`](./cases/c4-execute-bugfix/) | advanced, development | execution | Execute a frozen prompt against a deterministic bug: reproduce, fix minimally, verify, record evidence. |
| C5 `c5-resume-heldout` | advanced, held out | execution | Resume a different task from partial progress and a failing check, without repeating finished work, preserving an unrelated user edit. |

Fixtures are tiny dependency-free Node.js projects tested with `node --test`.
The legacy prompt of C2 is synthetic; its shapes are those of the real
first-generation prompts at commit `c2c06ae`. Authoring cases give every
condition the same original input. Planning and execution cases give every
condition the same frozen OPS prompt, written here and not by any condition.

### C5 is held out

C5, its fixture and its oracle are created before any Skill is written, by a
separate agent session that receives the contract, the case format and one
development case as a model, and nothing about the Skills. The session that
writes the Skills does not open the C5 directory until the final Skill
candidate is frozen; it handles C5 only through the generic harness. C5 is
added to `frozen.json` by hash when the evaluator delivers it, which may be
after the baseline of C1 to C4 has started but is always before any Skill
content exists; `frozen.json` records both moments.

This separation is **procedural, not enforced**: both sessions are the same
model family, the files sit on the same disk, and the author's session started
the evaluator's. C5 is therefore best described as a held-out case with
procedural isolation. If the author's session reads C5 before the freeze, that
is recorded in `amendments.md` and C5 is renamed a reserved regression case.

## 5. Score

Each case has ten binary assertions worth ten points each, defined in its
`oracle.mjs`:

| Dimension | Points | Focus |
|---|---:|---|
| Intent and contract | 20 | Required meaning preserved; contract and agent interpreted correctly |
| Required result | 30 | The expected artifact, plan or behavior, including the boundary condition |
| Verification | 20 | The right checks, actually performed, with their results handled correctly |
| Scope and control | 20 | Allowed files and actions, requested mode, workspace, limits |
| Traceability | 10 | An accurate report linked to real artifacts and observations |

Assertions are evaluated by program, from the stored files and the stored
trace. None is judged by a reviewer. Assertions of kind `anchor` test for the
presence of specific facts by pattern (for example, that an objective names the
function, the precision and the rounding rule); they are mechanical but
approximate, and a good answer in unusual words can miss one. Listing a command
earns nothing where the assertion asks that it was run: those assertions read
the trace.

- `raw_score` = sum of the points of passed assertions.
- `effective_score` = 0 on a hard failure, otherwise `raw_score`.
- A case **passes** at an effective score of 80 or more.

Hard failures, declared in advance:

| Code | Meaning |
|---|---|
| `HF-ARTIFACT` | A required generated OPS artifact is missing or rejected by the canonical validator. |
| `HF-CORE` | The designated core acceptance check fails on the final state. The check runs the original, protected tests. |
| `HF-PROTECTED` | Protected tests or evaluator files were changed, weakened or deleted. |
| `HF-PROHIBITED` | A prohibited action: implementing in a write-only task, changing product code in a plan-only task, modifying a file the task forbade. |
| `HF-FABRICATION` | The attempt records execution, results, approval or completion that did not happen. |

A failure that a case expects during reproduction or diagnosis (the failing
test run of C4, the rejected legacy file of C2) is not a hard failure. A
correctly reported stop is a success only where a case expects that stop; none
of C1 to C4 does.

## 6. Thresholds

Local choices for this project, not scientific standards.

- **Readiness.** All five cases pass under the final candidate, their mean
  effective score is at least 85, and there is no hard failure.
- **Evidence of improvement**, per track. The mean effective score of the final
  candidate exceeds the baseline mean by at least 10 points, and no case of the
  track loses more than 10 points. Authoring (C1, C2) and execution (C3, C4,
  C5) are reported separately; for execution, development-only and held-out
  figures are shown beside the track figure.
- **Efficiency target.** Median overhead of at most 50%, computed separately
  for elapsed time and for tokens as
  `median((final_skill_value − baseline_value) / baseline_value)` over matched
  pairs with observed values and a positive baseline. The number of eligible
  pairs is reported. With fewer than three eligible pairs the metric is
  inconclusive. A missed target is reported as a tradeoff.
- **H3** is supported when a quality gain met the improvement threshold and
  both medians are within the target; unsupported when a gain exists and a
  median exceeds the target; inconclusive when no gain met the threshold (the
  overhead is still reported) or when measurements are missing.

Elapsed time is the client's `duration_ms`. Tokens are the client's usage
record: input, output, cache creation and cache read, summed; output tokens
are also shown alone. Cost figures in the records are the client's list-price
estimate, not a charge.

## 7. Statuses

A missing measurement is never a zero.

| Status | Meaning |
|---|---|
| `NOT_RUN` | No attempt exists. |
| `NOT_SCORED` | Infrastructure failure: the client did not start, produced no result, returned an API error, or Skill isolation was not as specified. |
| `TIMEOUT` | The run was stopped at its time limit. This is an observed outcome and is scored on the state it left. |
| `COMPLETED` | The run ended by itself. Scored, whatever the quality. |

The study is complete only when every required pair is scored.

## 8. Order, limits and budget

1. Oracle self-checks, without an agent (`npm run study:selfcheck`).
2. C1 to C4 under `WITHOUT_SKILLS`. Commit the evidence.
3. Write the Skills. Freeze the first candidate by commit.
4. C1 to C4 under `INITIAL_SKILLS`.
5. At most **one** refinement, only if a consequential observed failure points
   to a Skill change. If made: freeze the second candidate, rerun C1 to C4
   under `REFINED_SKILLS`.
6. Freeze the final candidate. Only then run C5, under every retained
   condition. C5 results never feed back into the Skills.
7. Six activation probes on the final candidate
   ([`cases/p0-activation/probes.json`](./cases/p0-activation/probes.json)).
8. Smoke checks on a second client only if one is already installed. None is
   installed (Codex is absent), so none is planned.

| Limit | Value |
|---|---|
| Runs per case and condition | 1. A scored attempt is never repeated; the first baseline results stand. |
| Time per scored task | 300 seconds, then the process tree is stopped |
| Time per activation probe | 60 seconds |
| Repair cycles inside an execution task | 2, as stated in the task's own prompt |
| Skill refinements | at most 1 |
| Infrastructure retries | at most 1 in the whole study, kept in the record with its reason |
| Evaluation attempts | at most 24: scored runs (10 or 15), probes (6), smoke checks (0), retry (0 or 1) |
| Evaluated run time | at most 120 minutes in total |

Evaluator-model calls and nested agent calls would count against the cap; none
are planned, because every assertion is computed by program. Preparation
(probes of the environment, the harness smoke check, the creation of C5, the
self-checks) is recorded but is not an evaluation attempt.

## 9. Rules

- The evaluation is never changed to improve a result. Tasks, fixtures,
  thresholds and the intent of an assertion do not change after the freeze.
- **Oracle defects.** If an oracle is shown to compute something other than
  its stated assertion (for example a pattern that cannot match a Windows
  path), the defect is fixed, **every stored attempt of that case in every
  condition is re-scored** from its stored trace and artifacts, and the change
  is disclosed in `amendments.md` with the scores before and after. No agent
  run is repeated for that reason.
- **Changes after the freeze.** If a frozen evaluated input changes (contract
  kit, task text, fixture, agent mapping, oracle intent), the affected
  comparisons are invalid. They are rerun only within the budget; otherwise
  the result for the changed bytes is reported as unverified.
- A fixture is never repaired between conditions.
- A result that shows no improvement is a result. It is reported as observed.

## 10. Limits known in advance

- One run per cell: no variance estimate, no statistical test, no reliability
  percentage. A difference of ten points is one assertion.
- One model and effort level; a strong baseline can leave little room to
  improve (ceiling), and a weaker one could behave differently.
- The Skill author knows the development cases and their oracles. C5 exists to
  show whether a gain survives a case the author did not see.
- The author and the C5 evaluator are sessions of the same model family.
- Order of actions is read from tool calls. A file changed through a shell
  command in an unusual form may not be recognized as an edit.
- Anchor assertions are approximate in both directions.
- Elapsed time includes network and service latency, which this study does not
  control.
