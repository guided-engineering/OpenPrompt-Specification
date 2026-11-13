I wrote the OPS prompt to `.guides/prompts/prompt.pricing.round-half-up.yaml`. The validator accepts it, and it's the only file in the workspace I changed. I didn't implement the change.

## What's in it
- **Header:** id `pricing.round-half-up`, version 1. Agent is `guided-engineer`, the built-in default; the repo has no agent map of its own.
- **Objective:** `applyDiscount` returns the price rounded to 2 decimals with halves rounded up, so 19.99 at 15% is 16.99, 2.01 at 50% is 1.01 and 100 at 10% is 90. Tests cover all three, and `npm test` passes with the three existing tests unchanged.
- **Context:** describes the current code and tests. It also spells out the catch in the request: `2.01 * 0.5` is stored as `1.0049999999999998934`, so the simple `Math.round(x * 100) / 100` gives 1.00. I confirmed both numbers in Node.
- **Constraints, requirements R1–R8 and stop conditions:** these carry over the request's rules. Only `src/discount.mjs` and `test/discount.test.mjs` may change, the signature and argument checks stay, no new dependencies, and the existing tests are kept.
- **Steps:** S1 writes the new tests first and confirms they fail. S2 implements the rounding. S3 runs the checks.
- **Checks V1–V5:**
  - V1 runs `npm test`.
  - V2 calls `applyDiscount` directly with the three examples.
  - V3 confirms the function still takes two arguments and still throws `RangeError` for bad input.
  - V4 confirms the new tests exist and the old ones are still there.
  - V5 uses `git status` to confirm nothing outside the allowed files changed.

## How I checked it
1. **Validator:** `node .guides/tools/ops-validate.mjs --resolve` failed the first time because I'd left out the required `output` field. After I added it, the prompt is valid (exit 0) and all inputs and outputs resolve. `--trace` shows every requirement is covered by at least one check.
2. **Checks on the current code:** I ran each check command through `cmd /c`. V1, V3 and V5 pass. V2 fails (16.9915 instead of 16.99), and V4 fails because the 19.99 and 2.01 tests are missing. Those failures are correct, since the change hasn't been made yet.
3. **V2 on throwaway copies:** In a temporary folder, I ran V2 against two versions of the function. It rejects the simple `Math.round(x*100)/100` version (gives 1 instead of 1.01) and accepts one that rounds correctly. I then deleted the temporary folder.

## Decisions for you
- **Uncommitted prompt file:** V5 allows the prompt file to show up as uncommitted, so the check works before you commit it. It also allows the run's own log entry under `.guides/operation/worklog/`.
- **Additions beyond the request:** I set a 30-minute time limit, kept the default of 2 repair attempts, and had S2 update the function's doc comment to mention the rounding. The doc comment edit isn't in the request, so remove it if you don't want it.
