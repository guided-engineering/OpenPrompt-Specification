/**
 * Split one line of a CSV file into its fields.
 *
 * Unquoted fields are trimmed. A field whose first non-blank character is a
 * double quote is a quoted field: its content is kept as written, commas
 * inside it do not split it, and a doubled quote (`""`) is read as one quote.
 * A quote that appears in the middle of an unquoted field is kept literally.
 *
 * @param {string} line
 * @returns {string[]}
 */
export function parseCsvLine(line) {
  const fields = [];
  let value = '';
  let quoted = false; // the current field started with a quote
  let inQuotes = false; // the scan is between the field's opening and closing quote

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          value += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        value += ch;
      }
    } else if (ch === ',') {
      fields.push(quoted ? value : value.trim());
      value = '';
      quoted = false;
    } else if (ch === '"' && !quoted && value.trim() === '') {
      value = '';
      quoted = true;
      inQuotes = true;
    } else if (quoted && /\s/.test(ch)) {
      // Whitespace after the closing quote of a quoted field is ignored.
    } else {
      value += ch;
    }
  }

  fields.push(quoted ? value : value.trim());
  return fields;
}
