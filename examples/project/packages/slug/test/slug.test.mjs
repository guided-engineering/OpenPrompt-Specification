import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from '../src/slug.mjs';

test('lowercases and joins words with a hyphen', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('strips diacritics', () => {
  assert.equal(slugify('Ação Rápida'), 'acao-rapida');
});

test('collapses repeated separators into one hyphen', () => {
  assert.equal(slugify('a  --  b'), 'a-b');
});

test('never starts or ends with a hyphen', () => {
  assert.equal(slugify('  -Hello!  '), 'hello');
});
