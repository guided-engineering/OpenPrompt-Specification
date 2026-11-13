export function cartTotal(items) {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity * (i.quantity >= 10 ? 0.9 : 1), 0);
}
