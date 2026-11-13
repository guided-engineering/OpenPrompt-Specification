export function applyDiscount(price, percent) {
  return Math.round((price * (1 - percent / 100) + Number.EPSILON) * 100) / 100;
}
