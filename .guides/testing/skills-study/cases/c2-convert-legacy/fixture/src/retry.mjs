/**
 * Delays, in milliseconds, to wait before each retry attempt.
 *
 * @param {number} attempts  number of retries
 * @param {number} baseMs    delay before the first retry
 * @returns {number[]} exponential delays: baseMs, 2 * baseMs, 4 * baseMs, ...
 */
export function backoffDelays(attempts, baseMs) {
  return Array.from({ length: attempts }, (_, i) => baseMs * 2 ** i);
}
