// Number of products per category.
export function categoryTotals(products) {
  const totals = {};
  for (const p of products) totals[p.category] = (totals[p.category] ?? 0) + 1;
  return totals;
}
