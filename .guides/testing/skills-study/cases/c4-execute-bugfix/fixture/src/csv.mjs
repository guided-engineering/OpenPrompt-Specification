/**
 * Split one line of a CSV file into its fields.
 *
 * @param {string} line
 * @returns {string[]}
 */
export function parseCsvLine(line) {
  return line.split(',').map((field) => field.trim());
}
