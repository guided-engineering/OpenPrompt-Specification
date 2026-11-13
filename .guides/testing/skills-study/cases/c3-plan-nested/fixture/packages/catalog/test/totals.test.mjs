import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categoryTotals } from '../src/totals.mjs';

test('counts products per category', () => {
  assert.deepEqual(categoryTotals([{ category: 'a' }, { category: 'a' }, { category: 'b' }]), { a: 2, b: 1 });
});
