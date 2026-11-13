I finished the `juniper.issue-58` run (execute mode). All three verification checks now pass, and the worklog entry is updated and marked `completed`.

**The earlier session's log was partly wrong.** Before changing anything, I checked what it claimed against the actual files:
- **Already in place:** `overlaps` compared with `<`, and `package.json` was at 0.3.3, one patch above 0.3.2. I didn't redo either.
- **`fix` was only half done:** `isFree` still used `<=`, which is why the 2 `isFree` tests were failing.
- **`changelog` never happened:** the log said it was done and that preflight passed, but `CHANGELOG.md` had no 0.3.3 section. `node tools/preflight.mjs` failed with exit 1 ("no section for 0.3.3").

**What I changed:**
- `src/index.mjs`: `isFree` now uses `b.start < end && start < b.end`, so a booking's end time no longer counts as taken. Exported names and signatures are unchanged.
- `CHANGELOG.md`: added a `## 0.3.3` section at the top with one entry. The older sections are untouched.

**Checks, run after the last edit, from the repository root:**

| Check | Command | Result |
|---|---|---|
| unit-tests | `node --test` | exit 0, all 9 tests pass |
| preflight | `node tools/preflight.mjs` | exit 0, "CHANGELOG.md describes 0.3.3" |
| scope | `git status --short` | exit 0; under `src/`, `test/` and `tools/`, only `src/index.mjs` changed |

Before editing, I confirmed the prompt is valid with `ops-validate --resolve`. I also ran the tests and preflight to reproduce both failures. After updating the worklog entry, I ran the validator on it and it passed.

**Not mine:** `README.md` already had uncommitted edits (a Rooms table) before I started. I left them alone; they show up in `git status` but aren't part of this task.

**Worklog:** `.guides/operation/worklog/2026-11-12.juniper-issue-58.md`. I kept the first session's notes and added a section on the resume, including the corrections above. Nothing is committed; there's nothing left to do under this prompt.
