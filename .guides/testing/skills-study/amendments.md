# Amendments to the frozen study definition

Everything that changed after the first scored run, with its reason and its
effect. Tasks, fixtures, hypotheses, weights and thresholds did not change.

## 1. A rule that was withdrawn

The protocol as first frozen contained a rule of its own making: if an oracle
turned out to be wrong, it could be fixed and every stored attempt **re-scored**
from its stored evidence, with no agent run repeated. Three amendments were made
under that rule on 2026-11-13, right after the baseline runs.

That rule is not in the request the study implements. The request says
(section 7.2) that a change to a frozen evaluated input, **including an
oracle**, invalidates the affected comparisons, which are then run again within
the budget or reported as unverified. A re-score of stored evidence explains a
grade; it is not a new observation and cannot stand in for one.

The re-scoring rule and the "anchor audit" built on it are therefore withdrawn.
What replaces them:

- The repaired oracles below are frozen as the common inputs of every condition.
- The baseline of each case whose oracle changed is **executed again** under the
  repaired oracle (`run.mjs --corrective`). Only that new execution is admissible
  for the comparison.
- The earlier attempt of such a case is kept with two grades: the grade under
  the oracle frozen before it ran, and a diagnostic replay with the repaired
  oracle. Neither enters the comparison. The higher of two scores is never
  chosen; which attempt counts follows from the rule above.
- **No oracle changes again.** From here on a failed assertion stands as scored,
  including an `anchor` assertion that a differently worded answer would have
  passed. Changing an oracle now would invalidate comparisons that the budget
  can no longer repeat.

## 2. Audit of the three amendments

Each change is classified as a **grader implementation error** (the grader read
the evidence wrongly; what counts as evidence is unchanged) or as a **change of
accepted evidence** (what counts as satisfying the assertion changed). The
second kind is a change of an acceptance criterion made after seeing a baseline
run. It is kept, labelled as what it is, and paid for with a rerun.

| # | Assertion | As frozen before the runs | What the stored run showed | Change | Classification | Effect on the stored attempt |
|---|---|---|---|---|---|---|
| 1 | C1-02 | The objective must match `half up` (with space or hyphen). | The objective read "rounded to 2 decimal places with halves rounded up". The pattern did not match. | Also accept "halves rounded up", "round half up", "half rounds up". | **Change of accepted evidence.** The frozen pattern did what it was written to do, and the frozen protocol had listed this kind of miss as a known limit of anchor assertions. | C1: 90 → 100 (diagnostic) |
| 2a | C3-02 to C3-06 | Phrases were matched on the raw Markdown body. | The plan wrapped a line inside "without changing an / existing test"; the pattern with a literal space could not match across the line break. | Match on whitespace-collapsed text. The accepted phrases are unchanged. | **Grader implementation error.** The accepted phrase was present; the grader could not read it. | C3-06: fail → pass |
| 2b | C3-02 | Any occurrence of `packages/catalog/src/totals.mjs` in the plan failed the sub-check. | The plan named that file in order to say it "must not be opened for editing". | A mention counts against the plan only where no out-of-scope statement is within a window around it. | **Change of accepted evidence.** The frozen code implemented its written criterion; the criterion was changed. | C3-02: fail → pass. C3 in total: 80 → 100 (diagnostic) |
| 3 | C4-01 | A validator run on the prompt counted only if the whole tool call ended without error. | One call ran the validator (it printed `valid`, exit 0) and then the reproduction `node --test` (3 expected failures, exit 1). The call was flagged as an error, so the validation before the first edit was not credited. | Read the validator's own output line for the prompt. | **Grader implementation error.** The grader read the exit status of the call instead of the validator's verdict. | C4: 90 → 100 (diagnostic) |

Amendment 3 had also changed the shared scorer (`harness/score.mjs`,
`validatedOk`) and assertion C3-07 in the same way. **No stored score depended
on those two changes**, so they were not repairs of a demonstrated error. They
are withdrawn: `harness/score.mjs` is again byte-identical to the freeze made
before the runs (commit `84fb616`), C3-07 is as frozen, and the repair of C4-01
lives in the C4 oracle alone.

A known consequence, stated before any assisted run: C1-07, C1-10, C2-07, C2-10
and C3-07 still read validator evidence at the level of the tool call. If an
attempt chains the validator with a command that fails, or with the validation
of another file that is rejected, those assertions can under-credit it, exactly
as C4-01 did. They are left as frozen because repairing them would change the
oracles of cases that cannot be run again within the budget. If it happens, the
score stands and the report says so.

## 3. Which baseline cases are affected

| Case | Oracle changed after its run | Shared scorer | Baseline observation |
|---|---|---|---|
| C1 | yes (1) | as frozen | **Run again.** The first attempt is set aside. |
| C2 | no | as frozen | **Stands.** Its oracle and scorer are byte-identical to the freeze made before it ran. |
| C3 | yes (2a, 2b) | as frozen | **Run again.** The first attempt is set aside. |
| C4 | yes (3) | as frozen | **Run again.** The first attempt is set aside. |

## 4. Grades of the first baseline attempts

Reconstructed by deterministic replay of the stored traces and artifacts
(`harness/replay.mjs`): once with the oracle and scorer of commit `84fb616`,
once with the repaired oracle. A replay is not an agent run.

| Case | Attempt | Grade under the oracle frozen before the run | Failed | Diagnostic replay with the repaired oracle | Admissible for the comparison |
|---|---|---:|---|---:|---|
| C1 | `WITHOUT_SKILLS.c1-author-basic.a1` | 90 | C1-02 | 100 | no |
| C2 | `WITHOUT_SKILLS.c2-convert-legacy.a1` | 100 | — | (oracle unchanged) | **yes** |
| C3 | `WITHOUT_SKILLS.c3-plan-nested.a1` | 80 | C3-02, C3-06 | 100 | no |
| C4 | `WITHOUT_SKILLS.c4-execute-bugfix.a1` | 90 | C4-01 | 100 | no |

## 5. Admissible observations and scoring identities

Stated before any assisted run. The oracle hash is the SHA-256 of the case's
`oracle.mjs` with LF line endings; the scorer is `harness/score.mjs`,
`81976561e6ca…`, unchanged since the freeze.

| Case | Baseline observation | Assisted observation | Oracle |
|---|---|---|---|
| C1 | corrective rerun `WITHOUT_SKILLS.c1-author-basic.a2` | first run under `INITIAL_SKILLS` | repaired, `8a53f28607f0…` |
| C2 | first run `WITHOUT_SKILLS.c2-convert-legacy.a1` | first run under `INITIAL_SKILLS` | as frozen, `8a20eb680f44…` |
| C3 | corrective rerun `WITHOUT_SKILLS.c3-plan-nested.a2` | first run under `INITIAL_SKILLS` | repaired, `498d138583a9…` |
| C4 | corrective rerun `WITHOUT_SKILLS.c4-execute-bugfix.a2` | first run under `INITIAL_SKILLS` | repaired, `527f6846b46e…` |
| C5 | first run under `WITHOUT_SKILLS`, after the final Skill candidate is frozen | first run under each retained Skills condition | as frozen by its author |

Whatever the corrective reruns score is the baseline. If one of them ends as an
infrastructure failure, the budget has no retry left for it and that comparison
is reported as incomplete.

## 6. C5: what can and cannot be said

Chronology, as it happened on 2026-11-13:

1. The study was frozen without C5 (commit `84fb616`).
2. The baseline runs of C1 to C4 were made and committed (`b79d401`).
3. C5 was delivered by a separate agent session that had been given the
   contract, the case format and one development case, and nothing about the
   Skills. No Skill content existed at that time.
4. C5 was frozen by hash and committed after step 3 (see `frozen.json`,
   `heldOutAddedAt`, and the commit that adds the case directory). A hash made
   then cannot show that the case was fixed earlier.

Exposure, as separate observations:

- The author of the Skills **received the list of C5's file names** in the
  evaluator's delivery report, together with general statements about its
  oracle. The names show which kinds of files the case involves.
- The evaluator kept temporary files with details of the case in a scratch
  directory **shared with the author's session** for roughly half an hour.
- The author's session states that it did not open the C5 directory or read
  those temporary files. Nothing recorded can prove that statement, and nothing
  recorded contradicts it.

C5 is therefore described as an **independently authored reserved regression
case, frozen after the development baseline, with unverified blinding**. It is
not called an independent or uncontaminated holdout. It is kept as delivered:
it was not regenerated, and its detailed fixture, expected solution and results
stay unopened by the Skill author until the final Skill candidate is frozen.

## 7. Tooling changes without effect on any score

| File | Change |
|---|---|
| `harness/rescore.mjs` | Added on 2026-11-13 for the withdrawn rule, then removed. |
| `harness/replay.mjs` | New. Deterministic replay for the grades in section 4. It never produces an observation. |
| `harness/run.mjs` | Accepts `--corrective "<reason>"` for a case whose earlier record is marked inadmissible; records the oracle and scorer hashes of every run. How an agent session is started is unchanged (`harness/lib.mjs` is as frozen). |
| `harness/freeze.mjs` | Adds the reserved case by hash without touching other entries; an amendment no longer picks up that case's files by itself. |
| `harness/report.mjs` | Compares only admissible observations, lists attempts that were set aside with both grades, shows C5 as a reserved regression case, and prints one ledger of everything attempted. Formulas and thresholds are unchanged. |
| `protocol.md` | Sections 4, 8 and 9 revised to say the above. |
