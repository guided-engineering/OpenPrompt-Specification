# Baseline: what was observed before any Skill existed

Condition `WITHOUT_SKILLS`, 2026-11-13. Records:
[`runs/WITHOUT_SKILLS/`](./runs/WITHOUT_SKILLS/). Rules and audit:
[`../amendments.md`](../amendments.md).

## Seven runs, four admissible observations

Each case was run once. Then the oracles of C1, C3 and C4 were repaired, which
invalidated their first runs, and those three cases were run again under the
repaired, re-frozen oracles. Which run counts follows from that rule, not from
the scores.

| Case | Run | Oracle | Grade | Missed | Counts as the baseline |
|---|---|---|---:|---|---|
| C1 | first (`a1`) | as frozen before the run | 90 | C1-02 | no, set aside |
| C1 | corrective rerun (`a2`) | repaired | **100** | — | **yes** |
| C2 | first (`a1`) | as frozen before the run, never changed | **100** | — | **yes** |
| C3 | first (`a1`) | as frozen before the run | 80 | C3-02, C3-06 | no, set aside |
| C3 | corrective rerun (`a2`) | repaired | **90** | C3-04 | **yes** |
| C4 | first (`a1`) | as frozen before the run | 90 | C4-01 | no, set aside |
| C4 | corrective rerun (`a2`) | repaired | **90** | C4-06 | **yes** |

A deterministic replay of the three set-aside runs with the repaired oracles
gives 100, 100 and 100. A replay is not a run and those figures are diagnostic
only.

| Admissible run | Elapsed | Tool calls | Tokens processed | Output tokens |
|---|---:|---:|---:|---:|
| C1 `a2` | 58 s | 12 | 170,177 | 6,321 |
| C2 `a1` | 99 s | 9 | 374,007 | 10,097 |
| C3 `a2` | 57 s | 12 | 232,926 | 5,855 |
| C4 `a2` | 55 s | 14 | 340,935 | 5,469 |

## The two assertions missed in admissible runs

Both were inspected against the stored evidence. Neither grade was changed:
the oracles are frozen and no run can be repeated within the budget. They are
described here so that the scores are read correctly.

| Assertion | What the grader requires | What the run shows | Reading |
|---|---|---|---|
| C3-04 (anchor) | The plan names the Node.js dependency in a form like "Node.js 20" or "Node >= 20". | The plan says "Dependency: Node.js ≥ 20 is required." with the `≥` sign, which the pattern does not accept. | The dependency was stated. The miss is an artifact of the pattern. It stands. |
| C4-06 (mechanical) | A passing test run appears in the trace after the last edit of a product file. | After its one edit of `src/csv.mjs`, the run executed `node --test 2>&1 \| …` (7 pass, 0 fail) in a command that also built a scratch script importing `./src/csv.mjs`. The shared edit detector treats a shell command that names the file and contains `>` as a write to it, and `2>&1` contains `>`. The verifying command was therefore taken for an edit, and no test run came after it. | The final bytes were verified. The miss is an artifact of the edit detector. It stands. |

Consequence for the comparison: on C3 and C4 the baseline has ten points of
room that reflect the grader and not the work. If an assisted run happens to
pass those two assertions, that is not a quality gain, and the report says so.
The same detector and patterns score the assisted runs, so the artifact can
equally cost them points.

## Human intervention, unsupported capabilities, environment

- Human intervention during the runs: none.
- Unsupported capability: none met. The client has no `Bash` tool on this
  machine; commands ran through `PowerShell`, in every run.
- Environment problems: none. No fixture was changed.

## Gaps a Skill could address

**Measured quality: none found.** Reading the seven runs, every artifact was
valid, every boundary of the request was kept, nothing was implemented where
only a prompt or a plan was asked for, the bug was reproduced before it was
fixed, and the checks were run after the last edit. The points lost in the
admissible runs are grader artifacts.

| Observation | Class | What follows |
|---|---|---|
| The validator was run in every case and every artifact was checked with it before the report. | Repeated work that depends on a tool | The validator has to be where the work happens. A project without the contract kit has none; a Skill that carries it closes that gap. The study cannot measure this, because the kit is held constant. |
| Several runs did verification nobody asked for (trying an implementation in a scratch directory while only authoring a prompt; differential tests after a bug fix). | Not a defect. Extra cost. | A Skill may say what is enough. Whether that helps is a cost question (H3). |
| Each run read the contract and conversion documents (about 170,000 to 370,000 tokens processed per run, mostly cached context). | Cost of discovering the contract | A Skill replaces part of that reading with its own text. Tokens may go down or up; measured under H3. |
| Nothing was wrong because of the schema, an ambiguous requirement, a tool failure or a missing capability. | — | The baseline indicates no correction of the contract or of a fixture. |

## Consequence for the hypotheses

Authoring (C1, C2): the baseline mean is 100. A gain of ten points is not
possible there, so H1 cannot be supported by this study.

Execution (C3, C4, and C5 once it is run): the development baseline mean is 90,
and all of the missing ten points are grader artifacts. C5 is not run yet.

This is reported as found. The cases, weights and thresholds are not changed to
create room for an improvement.
