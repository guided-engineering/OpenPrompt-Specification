# Conversion report: `legacy/prompt.retry.yaml` → `prompt.notify.retry-jitter.yaml`

- **Source:** `legacy/prompt.retry.yaml` (earlier format `ops/v1`). The file was not changed.
- **Result:** `.guides/prompts/prompt.notify.retry-jitter.yaml`, `version: 1`.
- **Validation:** `node .guides/tools/ops-validate.mjs --resolve .guides/prompts/prompt.notify.retry-jitter.yaml` reports `valid (prompt)`. The agent resolves to `guided-engineer` through the built-in map. The legacy file fails validation with 16 messages.
- **Not executed:** neither `src/retry.mjs` nor `test/retry.test.mjs` was changed.

## What changed

- **Objective added.** The old format had none. The new one is checkable: equal jitter `e/2 + random()*e/2`, an optional `random` argument that defaults to `Math.random`, and `backoffDelays(3, 100, () => 0)` returning `[50, 100, 200]`.
- **Requirements added (R1–R4).** They come from the three old `output[].rules` plus the old step "Update tests as needed". Each requirement is covered by at least one check.
- **Vague actions rewritten.** "Look at the retry code", "Make the delays better" and "Update tests as needed" are now concrete actions that each name a file.
- **Verification added.**
  - `npm test`.
  - `jitter-deterministic` uses an injected `random`. It fails on the current code (confirmed: exit 1).
  - `jitter-bounds-default` checks the range with the default `random`. It passes on the current code too, because the current delays sit at the 1.0x bound. It is a guard, not the proof.
  - A manual `expect` check that the tests inject `random`.
  - A `git diff` scope check. It passes on the current tree.
- **Scope made explicit.** `constraints` limit changes to the two files, keep the name and parameters, forbid new dependencies and forbid adding a flag. There are three `stopConditions`.

## Field mapping

**Mapped**

| Old | New |
|---|---|
| `apiVersion: ops/v1` | `apiVersion: guided-engineering/v1` |
| `id` | `id` (unchanged) |
| `title` | `title`, sharpened |
| `persona: ReliabilityEngineer` | `agent: guided-engineer`. There is no agent map, so the built-in default applies. No persona description existed to carry over. |
| `category: implementation` | `tags: [implementation, reliability]` |
| `workspace: ./` | `workspace: ./` |
| `context` | `context`, expanded with facts from the repo: the test runner, the current test that asserts exact delays, and ESM |
| `dependencies: Node.js 20` | `dependencies` |
| `steps[].actions` | rewritten as imperative, file-specific actions |
| `steps[1].retries: 3` | `limits.repairAttempts: 3`. This now covers the whole run, not one step. |
| `output[].rules` (block string) | split into `requirements` R1/R2 and per-file `output[].rules` lists |
| `version: 1.2.0` | `version: 1` (integer; this is the first version in the new format) |

**Dropped (nothing lost)**

- `$schema: .guided/schema/prompt.schema.json`: the path did not exist. No other prompt uses `$schema`.
- `difficulty`: it had no execution meaning.
- `output[].language: javascript`: the `.mjs` extension already shows the language.
- `steps[1].onFailure: continue`: the contract does not allow skipping a failed check. Failures are repaired within `limits`.

**Could not map / needs a decision**

- `steps[1].if: jitterEnabled == true`: nothing in the project defines `jitterEnabled`. I assumed jitter is always on and recorded that as an `Assumption:` in `context`. A constraint forbids adding a flag, and a stop condition fires if a flag turns out to be needed.
- `createBy: platform-team`: probably a typo for `createdBy`. I left it out because I could not confirm that `platform-team` is the right author. Add `createdBy:` if that is wanted.

## Decisions for a person

1. **Always-on jitter or a flag?** See `if: jitterEnabled` above. With always-on jitter, every caller gets random delays and the existing exact-delay test has to change.
2. **Callers that depend on exact delays.** The prompt does not look outside `src/retry.mjs`; the repo has no sender code. If such a caller exists elsewhere, the stop condition applies.
3. **Rounding.** I assumed delays may be fractional milliseconds. Decide whether you want integer milliseconds (for example `Math.round`). Rounding would change the R2 formula and the expected values in the checks.
4. **Repair limit.** The old per-step `retries: 3` became a run-wide `repairAttempts: 3`. The contract default is 2; keep 3 only if it was intended.
5. **Scope check limits.** The `scope` check sees only tracked files. A new untracked file would not trip it.
