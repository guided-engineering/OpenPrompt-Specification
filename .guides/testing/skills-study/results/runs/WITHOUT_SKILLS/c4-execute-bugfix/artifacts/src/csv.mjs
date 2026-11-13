/**
 * Split one line of a CSV file into its fields.
 *
 * Unquoted fields are trimmed. A field whose first non-blank character is a
 * double quote is a quoted field: commas and whitespace inside the quotes are
 * kept, and a doubled quote (`""`) is read as one quote character. Whitespace
 * between the closing quote and the next comma is ignored. An unterminated
 * quoted field runs to the end of the line.
 *
 * @param {string} line
 * @returns {string[]}
 */
export function parseCsvLine(line) {
  const fields = [];
  let i = 0;

  while (true) {
    let end = line.indexOf(',', i);
    if (end === -1) end = line.length;
    const raw = line.slice(i, end);
    const lead = raw.length - raw.trimStart().length;

    if (raw.trimStart().startsWith('"')) {
      // Quoted field: scan from just after the opening quote.
      let pos = i + lead + 1;
      let value = '';
      while (pos < line.length) {
        const ch = line[pos];
        if (ch === '"') {
          if (line[pos + 1] === '"') {
            value += '"';
            pos += 2;
            continue;
          }
          pos += 1;
          break;
        }
        value += ch;
        pos += 1;
      }
      // Anything between the closing quote and the next comma.
      let next = line.indexOf(',', pos);
      if (next === -1) next = line.length;
      value += line.slice(pos, next).trim();
      fields.push(value);
      end = next;
    } else {
      fields.push(raw.trim());
    }

    if (end >= line.length) break;
    i = end + 1;
  }

  return fields;
}
