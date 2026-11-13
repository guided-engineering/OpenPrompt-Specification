// Legacy monthly report totals. Not used by any package.
export function monthlyTotal(rows) {
  return rows.reduce((sum, row) => sum + row.amount, 0);
}
