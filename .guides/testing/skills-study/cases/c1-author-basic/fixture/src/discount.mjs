/**
 * Price after a percentage discount.
 *
 * @param {number} price    price before the discount, zero or more
 * @param {number} percent  discount in percent, 0 to 100
 * @returns {number}
 */
export function applyDiscount(price, percent) {
  if (!Number.isFinite(price) || price < 0) throw new RangeError('price must be a non-negative number');
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) throw new RangeError('percent must be between 0 and 100');
  return price * (1 - percent / 100);
}
