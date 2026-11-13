# Round discounted prices to cents

Discounted prices show up in the checkout with long decimal tails, for example
`16.9915`.

Change `applyDiscount` in `src/discount.mjs` so that the price it returns is
rounded to 2 decimal places, rounding half up.

Examples that must hold:

- `applyDiscount(19.99, 15)` returns `16.99`
- `applyDiscount(2.01, 50)` returns `1.01`. The exact result is 1.005, which a
  computer stores as 1.00499999..., so a naive `Math.round(x * 100) / 100` gives
  1.00. That is wrong here: half rounds up.
- `applyDiscount(100, 10)` still returns `90`

Add tests for these examples to `test/discount.test.mjs`.

Rules:

- Keep the signature `applyDiscount(price, percent)` and the existing argument checks.
- No new dependencies.
- Change only `src/discount.mjs` and `test/discount.test.mjs`.
- The three existing tests keep passing.

Done when `npm test` passes, including the new tests.
