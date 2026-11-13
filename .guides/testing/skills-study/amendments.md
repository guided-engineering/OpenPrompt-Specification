# Amendments to the frozen study definition

Every change to a frozen file after the first scored run is listed here with
its reason and its effect on results. Tasks, fixtures, thresholds and the
intent of an assertion never change.

## Anchor audit

The protocol allows an oracle defect to be fixed when the oracle computes
something other than its stated assertion, provided every stored attempt of
that case is re-scored. The same audit is applied to every condition:

1. After each batch of runs, every **failed `anchor` assertion** is inspected
   against the stored artifact.
2. If the artifact satisfies the stated assertion in words the pattern did not
   anticipate, the pattern is broadened, the self-check is run again, and every
   stored attempt of that case in every condition is re-scored from its stored
   trace and artifacts (`harness/rescore.mjs`).
3. If the artifact does not satisfy the assertion, the failure stands.

The audit can only turn a false negative into a pass. It does not look for
false positives among passed assertions, because that would require reading
every artifact with a rule made up afterwards; this is a known limit.

## List

| # | When | File | Change | Reason | Effect on results |
|---|---|---|---|---|---|
| 1 | After the `WITHOUT_SKILLS` run of C1, before any Skill existed | `cases/c1-author-basic/oracle.mjs`, assertion C1-02 | The pattern for the rounding rule also accepts "halves rounded up", "half rounds up", "round half up". Before, it accepted only the literal "half up". | The baseline objective read "rounded to 2 decimal places with halves rounded up". It names the function, the precision and the rounding rule, which is what C1-02 asserts. | `WITHOUT_SKILLS` C1: 90 → 100. No other attempt existed. |
| 1a | Same moment | `harness/rescore.mjs` (new), `harness/freeze.mjs` | Added the re-scoring tool the protocol's rule needs. An amendment of `frozen.json` no longer picks up files of the held-out case by itself. | Tooling. | None. |
| 2 | After the `WITHOUT_SKILLS` run of C3, before any Skill existed | `cases/c3-plan-nested/oracle.mjs`, assertions C3-02 to C3-06 | (a) Phrases are matched on whitespace-collapsed text. (b) C3-02 no longer fails a plan for naming the other package; it fails only when a mention has no out-of-scope statement near it. | (a) The plan wrapped a line inside "without changing an / existing test", which the pattern could not match across the line break. (b) The plan named `packages/catalog/src/totals.mjs` in order to say it "must not be opened for editing", which is the correct resolution the assertion asks for. | `WITHOUT_SKILLS` C3: 80 → 100. No other attempt existed. |
| 3 | After the `WITHOUT_SKILLS` run of C4, before any Skill existed | `harness/score.mjs` (`reportedValid`, `validatedOk`), `cases/c3-plan-nested/oracle.mjs` (C3-07), `cases/c4-execute-bugfix/oracle.mjs` (C4-01) | Whether the validator accepted a file is read from the validator's own output line for that file. Before, a validator run counted only if the whole tool call ended without error. | The baseline ran `ops-validate --resolve <prompt>` (printed `valid`, exit 0) and the reproduction `node --test` (3 failures, exit 1) in one command. The call was flagged as an error because of the expected test failure, so the validation before the first edit was not credited. | All four stored attempts were re-scored. `WITHOUT_SKILLS` C4: 90 → 100. C1, C2, C3 unchanged at 100. |
