import { test } from 'node:test';
import assert from 'node:assert/strict';
import { backoffDelays } from '../src/retry.mjs';

test('doubles the delay on every attempt', () => {
  assert.deepEqual(backoffDelays(3, 100), [100, 200, 400]);
});

test('no attempts means no delays', () => {
  assert.deepEqual(backoffDelays(0, 100), []);
});
