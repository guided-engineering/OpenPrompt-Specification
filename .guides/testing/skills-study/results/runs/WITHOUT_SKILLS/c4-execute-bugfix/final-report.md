I fixed `parseCsvLine` so it reads quoted fields correctly. All 7 tests now pass, `src/csv.mjs` is the only product file changed, and the run is recorded in the worklog entry.

**What I did**
1. **Checked the prompt first.** `ops-validate --resolve` said it was valid, both input files exist, and Node is v24.12.0 (the prompt needs 20 or newer).
2. **Reproduced the bug.** Before any change, `node --test` exited 1: 4 passed, 3 failed. The 3 failures were exactly the quoted-field tests. For example, `"Rent, January"` came back as two pieces, `'"Rent'` and `'January"'`. The other tests, including the report test, passed, so none of the prompt's reasons to stop applied.
3. **Fixed the parser.** In `src/csv.mjs` I replaced "split on every comma, then trim" with a scan that tracks whether it is inside quotes:
   - **Quoted fields:** commas and spaces inside the quotes are kept, and `""` becomes one `"`.
   - **Unquoted fields:** handled exactly as before (cut at the next comma, then trimmed).
   - The name, the single argument and the lack of dependencies are unchanged. It took one edit, with no repair attempts used.
4. **Wrote the worklog** at `.guides/operation/worklog/2026-11-13.ledger-csv-quoted-fields.md`. It has the status of each step and check, the failing values from before the fix, exit codes and times, and a table showing which check covers each requirement. `ops-validate` says the entry is valid.

**How I checked it**
- **Tests:** after the last edit, `node --test` exited 0 with 7 of 7 passing. That includes the three quoted-field tests and the report test (`sums the amount column`).
- **Scope:** `git status --short` shows only `src/csv.mjs` modified. The only other new item is the worklog under `.guides/operation/`.
- **Lines without quotes behave as before:** this was an extra check beyond the prompt's own. A throwaway script, deleted afterwards, compared the new parser with the old split-and-trim on 20,010 lines without quotes, both hand-picked and random. They gave identical results every time.

**Your call:** the prompt doesn't cover spaces around a quoted field, as in `a, "x, y" ,c`. I chose to trim them, the same way unquoted fields are trimmed, so the result is `x, y`. The worklog notes this.

Nothing is committed; the change and the worklog are in the working tree for you to review.
