import { test } from 'node:test';
import assert from 'node:assert/strict';
import { totalAmount } from '../src/report.mjs';

test('sums the amount column', () => {
  assert.equal(totalAmount(['2026-01-05,Coffee,3.50', '2026-01-06,Tea,2.50']), 6);
});
