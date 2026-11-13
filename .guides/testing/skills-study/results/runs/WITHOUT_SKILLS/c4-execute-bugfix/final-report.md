I ran the prompt in execute mode and it completed: `parseCsvLine` now reads quoted CSV fields correctly, and all 7 tests pass.

**What I did**
1. **Reproduced the failure.** Before any change, `node --test` exited with code 1: 4 tests passed and 3 failed. The 3 failures were exactly the quoted-field tests. For example, `2026-01-05,"Rent, January",900.00` came back as `'"Rent'` and `'January"'`. The report test passed, so no stop condition applied.
2. **Fixed the parser** in `src/csv.mjs` (the only product file I changed). It no longer splits on every comma; it reads the line one field at a time:
   - A field whose first non-blank character is `"` is a quoted field. Commas and whitespace inside the quotes are kept, and `""` becomes a single `"`.
   - Any other field runs to the next comma and is trimmed, as before.
   - The export name and single-argument signature are the same, no dependencies were added, and no tests were touched.
3. **Wrote the worklog entry** at `.guides/operation/worklog/2026-11-13.ledger-csv-quoted-fields.md`, with status `completed`, all three steps `done` and both checks `pass`.

**How I checked it**
- **Tests:** after the last edit, `node --test` exited with 0, with 7 of 7 passing. That includes the 3 quoted-field tests and the report test.
- **Scope:** `git status --short` shows only ` M src/csv.mjs`, plus the new worklog folder `.guides/operation/`.
- **Lines without quotes:** to confirm these parse exactly as before, I compared 200,000 random quote-free lines against the old `split(',').map(trim)` and found 0 differences. The scratch script lived in the temp folder and is deleted.
- **Edge cases:** an unclosed quote runs to the end of the line; spaces after a closing quote are dropped; a quote in the middle of an unquoted field such as `a"b` stays as a literal character.
- **Validation:** `ops-validate` accepts both the prompt and the worklog entry.

None of the 2 allowed repair attempts were used. Nothing is committed yet.
