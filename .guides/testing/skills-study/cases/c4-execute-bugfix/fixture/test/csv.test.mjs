import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsvLine } from '../src/csv.mjs';

test('splits plain fields', () => {
  assert.deepEqual(parseCsvLine('2026-01-05,Coffee,3.50'), ['2026-01-05', 'Coffee', '3.50']);
});

test('trims whitespace around unquoted fields', () => {
  assert.deepEqual(parseCsvLine(' a , b ,c '), ['a', 'b', 'c']);
});

test('keeps empty fields', () => {
  assert.deepEqual(parseCsvLine('a,,c'), ['a', '', 'c']);
});

test('keeps a comma inside a quoted field', () => {
  assert.deepEqual(parseCsvLine('2026-01-05,"Rent, January",900.00'), ['2026-01-05', 'Rent, January', '900.00']);
});

test('reads a doubled quote inside a quoted field as one quote', () => {
  assert.deepEqual(parseCsvLine('"say ""hi""",x'), ['say "hi"', 'x']);
});

test('keeps whitespace inside a quoted field', () => {
  assert.deepEqual(parseCsvLine('a," b ",c'), ['a', ' b ', 'c']);
});
