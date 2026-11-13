import { test } from 'node:test';
import assert from 'node:assert/strict';
import { conflicts, isFree, overlaps } from '../src/index.mjs';

const standup = { id: 'standup', room: 'aspen', start: 540, end: 570 };
const review = { id: 'review', room: 'aspen', start: 570, end: 630 };
const workshop = { id: 'workshop', room: 'aspen', start: 600, end: 720 };
const interview = { id: 'interview', room: 'birch', start: 540, end: 600 };

test('bookings that share time in one room overlap', () => {
  assert.equal(overlaps(review, workshop), true);
});

test('bookings in different rooms do not overlap', () => {
  assert.equal(overlaps(standup, interview), false);
});

test('a booking that starts when another one ends does not overlap it', () => {
  assert.equal(overlaps(standup, review), false);
  assert.equal(overlaps(review, standup), false);
});

test('conflicts lists each overlapping pair once', () => {
  assert.deepEqual(conflicts([workshop, review, interview]), [['workshop', 'review']]);
});

test('back-to-back bookings are not conflicts', () => {
  assert.deepEqual(conflicts([standup, review]), []);
});

test('a slot inside a booking is taken', () => {
  assert.equal(isFree([workshop], 'aspen', 630, 660), false);
});

test('a slot in another room is free', () => {
  assert.equal(isFree([workshop], 'birch', 630, 660), true);
});

test('a slot that starts a minute after a booking ends is free', () => {
  assert.equal(isFree([standup], 'aspen', 571, 600), true);
});

test('a slot that ends a minute before a booking starts is free', () => {
  assert.equal(isFree([review], 'aspen', 540, 569), true);
});
