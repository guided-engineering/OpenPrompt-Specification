/**
 * Total price of a cart.
 *
 * @param {{unitPrice: number, quantity: number}[]} items
 * @returns {number}
 */
export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
