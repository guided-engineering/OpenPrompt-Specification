I wrote the prompt to `.guides/prompts/prompt.pricing.round-half-up.yaml`, and the project's validator accepts it.

**How I checked it**
- I ran `node .guides/tools/ops-validate.mjs --resolve .guides/prompts/prompt.pricing.round-half-up.yaml`. The result is **valid** (exit 0). The workspace is `./`, the agent `guided-engineer` resolves through the built-in map, the inputs exist, and the outputs are `src/discount.mjs` and `test/discount.test.mjs`.
- The first two runs failed. One check command contained `: ` and broke the YAML, so I made it a block scalar. Two `run` checks also lacked the `expect` field the schema requires, so I added it. Then it passed.
- The validator only checks structure. I read the checks against the objective myself. I did not run them against the current code: running `src/discount.mjs` is part of the task, which I was not to do.

**What the prompt contains**
- **Goal:** `applyDiscount` returns the price rounded to 2 decimal places, half up. The three examples must hold: `(19.99, 15)` gives `16.99`, `(2.01, 50)` gives `1.01` and `(100, 10)` gives `90`. Tests for them are added to `test/discount.test.mjs`, and `npm test` passes.
- **Requirements R1–R5:** half-up rounding, each of the three examples, and tests for those examples.
- **Rules from the request:** keep the signature and the existing argument checks, add no new dependencies, change only the two named files, and keep the three existing tests passing.
- **Checks:**
  - `npm test` must pass.
  - A direct `node -e` command calls the three examples and fails on any mismatch, so it doesn't depend on the tests the executor writes.
  - Two observation checks: the new tests are in the test file, and `git status` shows only the two files changed, with `package.json` untouched.
- **Stop conditions:** half-up `1.01` can't be reached without a dependency, the signature or argument checks would have to change, another file would have to change, or an existing test fails for an unrelated reason.

**Assumptions and proposals:** none. The request was specific enough. I added the direct `node -e` check myself because `npm test` alone only proves the tests the executor writes.

**Open questions:** none.

The rounding change itself was not made, and `src/` and `test/` are unchanged.
