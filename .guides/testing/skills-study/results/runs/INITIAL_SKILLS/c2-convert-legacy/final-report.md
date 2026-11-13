I converted the legacy retry prompt into a new OPS prompt that the project's validator accepts, and wrote the conversion report. Neither the jitter change nor the legacy file was touched.

**Files written**
- `.guides/prompts/prompt.notify.retry-jitter.yaml`: the new prompt.
- `.guides/prompts/prompt.notify.retry-jitter.report.md`: the conversion report (what changed, what was mapped or dropped, open decisions).

**What the new prompt requires**
- **Objective:** `backoffDelays(attempts, baseMs, random = Math.random)` returns `e/2 + random()*e/2` for each retry, where `e = baseMs * 2 ** i`. So each delay falls between 0.5× and 1.0× of the old exponential delay.
- **Requirements:** four of them, taken from the old file's rules plus its "update tests" step.
- **Actions:** each one names the file it changes.
- **Constraints:** only `src/retry.mjs` and `test/retry.test.mjs` may change, with no new dependencies and no on/off flag.
- **Agent:** the old `ReliabilityEngineer` role became `guided-engineer`, since the project defines no other agent.

**How I checked it**
- `node .guides/tools/ops-validate.mjs --resolve .guides/prompts/prompt.notify.retry-jitter.yaml` returned valid. The first run rejected the file because three checks lacked an `expect`; I added them and re-ran.
- I ran the new prompt's command checks against the current code. These runs only read the code; they changed nothing:
  - **Deterministic jitter check:** fails today (exit 1), so it really detects whether the change has been made.
  - **Range check:** passes today, because the current delays sit exactly at the 1.0× limit. It only guards the range; the deterministic check is the one that proves jitter is applied.
  - **Scope check (`git diff`):** passes. It only sees files git already tracks, so a new file would not trip it.
- `git status` shows that only `.guides/prompts/` is new, so `legacy/prompt.retry.yaml`, `src/` and `test/` are untouched.

**Decisions for you** (details in the report):
1. **Jitter always on, or behind a flag?** The old `if: jitterEnabled == true` refers to a flag that nothing in the project defines. I assumed jitter is always on. That means the existing test, which expects exact delays, has to change.
2. **Rounding:** I assumed delays can be fractional milliseconds. If you want whole milliseconds, the formula and the expected values in the checks change.
3. **Repair limit:** the old step's `retries: 3` became a run-wide `repairAttempts: 3`; the contract default is 2.
4. **Author:** I dropped the old `createBy: platform-team`, probably a typo for `createdBy`. Add `createdBy:` if you want the author recorded.
5. **Other callers:** if code outside this repo relies on exact delays, the prompt tells the executor to stop.
