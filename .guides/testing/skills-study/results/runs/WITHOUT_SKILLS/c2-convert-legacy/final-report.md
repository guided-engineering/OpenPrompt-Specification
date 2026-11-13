I converted the legacy prompt into a new one that passes the project's validator, and wrote the conversion report. Nothing else changed: `git status` shows only the two new files, so `legacy/prompt.retry.yaml` and `src/` are untouched.

## What I wrote

**`.guides/prompts/prompt.notify.retry-jitter.yaml`**
- **Replaced the legacy fields** with the new contract's equivalents:
  - `persona: ReliabilityEngineer` became `agent: guided-engineer`, the only agent the project defines.
  - `category` became tags; `difficulty` was removed.
  - `retries: 3` became one repair limit of 3 for the whole run.
  - Version `1.2.0` became `1`, and the `createBy` typo became `createdBy`.
  - The broken `$schema` path now points at the real schema file.
- **New, checkable goal:** each delay is half the exponential delay plus `random()` times the other half, so it stays between 0.5x and 1.0x of the exponential delay. `random` is an optional third argument that defaults to `Math.random`.
- **Vague steps made concrete.** "Make the delays better" and "Update tests as needed" now give exact expected values: `() => 0` gives `[50,100,200]` and `() => 0.5` gives `[75,150,300]` for `(3, 100)`. The prompt also points out that the current test expecting `[100,200,400]` will break and must be rewritten.
- **Added:** five numbered requirements, each covered by at least one of six checks, plus scope limits, conditions under which the executor must stop and ask, and a 30-minute time budget.

**`.guides/prompts/prompt.notify.retry-jitter.report.md`** has the field-by-field mapping, what I couldn't map, and the open decisions.

## What couldn't be mapped
- **`if: jitterEnabled == true`:** nothing in the project defines `jitterEnabled`, and the legacy output rules require jitter unconditionally. I made jitter always on, and the prompt tells the executor to stop and ask if it finds that a switch is needed.
- **`onFailure: continue`:** the new contract has no equivalent; a failed check is either fixed or the run stops as blocked.

## Decisions for you
1. **Agent:** confirm `guided-engineer`, since no reliability-specific agent exists.
2. **Jitter switch:** confirm jitter should always be on.
3. **Rounding:** the prompt leaves delays as fractional milliseconds. If you want whole numbers, note that rounding down can break the 0.5x lower bound when the base delay is very small (e.g. 1 ms).
4. **Upper bound:** the 1.0x limit is written as inclusive, but `Math.random()` never actually reaches it.
5. **Version:** it restarts at 1; change it if you see this as a continuation of `1.2.0`.

## How I checked it
- **Validator:** `ops-validate --resolve` reports the prompt as valid, and the agent, inputs and outputs all resolve.
- **Check commands:** I ran the three `node -e` checks from PowerShell in a temporary copy of the code outside the repo, then deleted the copy.
  - Against the current code, the exact-values check fails, as it should. The bounds and zero-attempts checks pass, because delays without jitter are already inside the bounds. So the exact-values check is the one that catches missing jitter.
  - Against a quick throwaway jitter version, all three pass.
- **Scope check:** the `git diff --quiet` check passes on the current tree.
- **Not run:** the `npm test` check against a jittered version, because its result depends on the tests the executor will write.
