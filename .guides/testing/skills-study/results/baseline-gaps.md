# Baseline: what was observed before any Skill existed

Condition `WITHOUT_SKILLS`, cases C1 to C4, one run each, 2026-11-13. Records:
[`runs/WITHOUT_SKILLS/`](./runs/WITHOUT_SKILLS/).

## Scores

| Case | First score | After the anchor audit | Elapsed | Tool calls | Tokens processed | Output tokens |
|---|---:|---:|---:|---:|---:|---:|
| C1 author, basic | 90 | 100 | 93 s | 16 | 354,911 | 9,596 |
| C2 convert legacy | 100 | 100 | 99 s | 9 | 374,007 | 10,097 |
| C3 plan, nested workspace | 80 | 100 | 60 s | 13 | 274,351 | 6,249 |
| C4 execute bug fix | 90 | 100 | 67 s | 14 | 372,541 | 6,781 |

Every lost point in the first scores came from an oracle that did not compute
its stated assertion (a wording the pattern missed, a phrase split by a line
break, a validator run chained with an expected test failure). The three
defects are listed in [`../amendments.md`](../amendments.md); each correction
raised the baseline and none existed when a Skill could have benefited.

## Human intervention, unsupported capabilities, environment

- Human intervention during the runs: none.
- Unsupported capability: none met. The client has no `Bash` tool on this
  machine; commands ran through `PowerShell`. This is the same in every
  condition.
- Environment problems: none. No fixture was changed.

## Gaps a Skill could address

**Measured quality: none.** With the contract documents, the schemas and the
validator in the repository, the baseline executor met all forty assertions.
There is no failed assertion for a Skill to turn into a pass, so on these four
cases the study can show equal quality or a regression, not an improvement.

What the traces show beyond the assertions:

| Observation | Class | What follows |
|---|---|---|
| The validator was run in every case, twice on average, and every artifact was checked with it before the report. | Repeated, fragile work that depends on a tool | The validator has to be available where the work happens. A project that does not carry the contract kit has no validator; a Skill that bundles it closes that gap. The study cannot measure this, because the kit is held constant. |
| In C1, C2 and C4 the baseline did verification nobody asked for: it tried the implementation in a scratch directory while only authoring a prompt, and ran a 20,000-case differential test after a bug fix. | Not a defect. Extra cost. | A Skill may make the work more economical by saying what is enough. Whether it does is an efficiency question (H3), not a quality one. |
| The baseline read the whole contract and conversion documents in every run (about 270,000 to 370,000 tokens processed per run, mostly cached context). | Cost of discovering the contract | A Skill replaces part of that reading with its own instructions. Tokens may go down or up; measured under H3. |
| Nothing in the baseline was wrong because of the schema, an ambiguous requirement, a tool failure or a missing capability. | — | No contract or fixture correction is indicated by the baseline. |

## Consequence for the hypotheses

H1 and H2 are judged on a gain of at least ten points. With a baseline of 100
on all four development cases, neither can be supported by them. The held-out
case C5 is the only place left where a quality difference can appear. This is
reported as found.
