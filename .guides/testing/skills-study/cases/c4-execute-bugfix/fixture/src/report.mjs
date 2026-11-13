import { parseCsvLine } from './csv.mjs';

/** Sum of the amount column (third field) of the given CSV lines. */
export function totalAmount(lines) {
  return lines.reduce((sum, line) => sum + Number(parseCsvLine(line)[2]), 0);
}
