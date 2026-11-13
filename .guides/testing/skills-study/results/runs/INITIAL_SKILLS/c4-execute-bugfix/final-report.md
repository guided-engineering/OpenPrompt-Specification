I ran the prompt in execute mode and it's finished: all 7 tests pass, and `src/csv.mjs` is the only product file that changed.

**What I did**
1. **Checked the prompt.** The project's validator (`node .guides/tools/ops-validate.mjs --resolve …`) accepted it.
2. **Reproduced the bug.** Before any change, `node --test` exited with code 1: 4 tests passed and 3 failed. The 3 failures were exactly the three quoted-field tests. For example, `"Rent, January"` came out as `'"Rent'` and `'January"'`. The report test and the plain-field tests passed, so nothing triggered a stop condition.
3. **Fixed the parser.** In `src/csv.mjs`, I replaced `line.split(',')` with a character-by-character scan that tracks whether it is inside quotes:
   - A field whose first non-blank character is `"` is a quoted field. Its content is kept as written, a comma inside it doesn't split it, and `""` becomes one `"`.
   - Unquoted fields are still trimmed, and a quote in the middle of an unquoted field is kept as a literal character, as before.
   - The export name, the one-argument signature and the lack of dependencies are unchanged.

**How I checked it** (run after the last edit, from the workspace)
- **unit-tests:** `node --test` exited with code 0; all 7 tests passed, including the three quoted-field tests and the report test.
- **scope:** `git status --short` exited with code 0 and showed only ` M src/csv.mjs`.
- **Extra check (not in the prompt):** for 8 edge-case lines without quotes, the new parser gives exactly the same output as the old `split`/`trim` version, which covers the requirement that lines without quotes parse as before.
- **Worklog:** the validator accepted the entry.

No repairs were needed.

**Worth knowing:** the prompt and tests don't say what to do with malformed input. My version treats an unclosed quote as running to the end of the line, and appends any non-blank text after a closing quote to the field. I noted this in the worklog. The changes are not committed.

Worklog entry: `.guides/operation/worklog/2026-11-13.ledger-csv-quoted-fields.md` (status `completed`).
