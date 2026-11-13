import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsvLine } from '../src/csv.mjs';

test('splits plain fields', () => {
  assert.deepEqual(parseCsvLine('a,b'), ['a', 'b']);
});
