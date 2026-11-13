import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyDiscount } from '../src/discount.mjs';

test('applies a percentage discount', () => {
  assert.equal(applyDiscount(100, 10), 90);
});

test('a zero discount leaves the price unchanged', () => {
  assert.equal(applyDiscount(80, 0), 80);
});

test('rejects a negative price', () => {
  assert.throws(() => applyDiscount(-1, 10), RangeError);
});
