I wrote `.guides/prompts/prompt.pricing.round-half-up.yaml`, and the project validator accepts it. I didn't touch `src/` or `test/`; `git status` shows only the new prompt file.

**What's in it**
- **Agent and scope:** the project has no `.guides/agents/agents.yaml`, so it uses the built-in `guided-engineer`. The workspace is `./`. The inputs are the request, `src/discount.mjs`, `test/discount.test.mjs` and `package.json`.
- **Objective and context:** the price must be rounded to cents, half up, including the 1.005 case, where a plain `Math.round(x * 100) / 100` gives 1.00. The context covers the current code, the three existing tests, and that `npm test` runs `node --test`.
- **Requirements R1–R7:** half-up rounding, the three examples (16.99, 1.01, 90), keeping the signature and argument checks, new tests alongside the existing ones, no new dependencies, and changes limited to the two files.
- **Constraints:** the request's rules, plus a rule that the three existing tests must not be edited.
- **Steps:** confirm the starting point, add the tests, change the rounding, then verify.
- **Checks V1–V5:**
  - V1: `npm test` passes.
  - V2: a `node -e` assertion of the three examples.
  - V3: a `node -e` assertion that the function still takes two arguments and still throws `RangeError` for each invalid input.
  - V4: `git diff --quiet HEAD` excluding the two allowed files, so no other tracked file changed.
  - V5: a manual check that no new untracked files appeared and the original tests are unchanged.
  - Every requirement is covered by at least one check.
- **Stop conditions and limits:** stop if the tests already fail before any change, if a requirement would need changes outside the two files or the signature, or if an existing test would have to change. Limits are 2 repair attempts and 30 minutes.

**How I checked it**
- `node .guides/tools/ops-validate.mjs --resolve` on the file returned "valid", exit code 0. The agent resolved to the built-in map, and all inputs and outputs resolved.
- I ran the check commands against the current, unchanged code to make sure they work as written:
  - V3 passes, as it should, since the argument checks already exist.
  - V2 fails on `16.9915 !== 16.99`, as it should before the change. Its exit code showed 0 only because I piped the output through `Select-Object`; the uncaught assertion error confirms it failed.
  - V4 passes, because no tracked files are modified.
- I didn't run `npm test` (V1) or the manual check (V5). They test the finished change, so they belong to whoever carries out the prompt.

V2 and V3 use `--input-type=module -e "..."` with single quotes inside double quotes. That worked in PowerShell here, and should also work in POSIX shells and cmd.
