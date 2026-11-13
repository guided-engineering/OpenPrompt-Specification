import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cartTotal } from '../src/totals.mjs';

test('sums unit price times quantity', () => {
  assert.equal(cartTotal([{ unitPrice: 5, quantity: 2 }, { unitPrice: 1, quantity: 3 }]), 13);
});

test('an empty cart costs nothing', () => {
  assert.equal(cartTotal([]), 0);
});
