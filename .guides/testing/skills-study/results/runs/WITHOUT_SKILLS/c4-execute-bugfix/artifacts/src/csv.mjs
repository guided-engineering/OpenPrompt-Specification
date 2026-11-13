/**
 * Split one line of a CSV file into its fields.
 *
 * Unquoted fields are trimmed. A field whose first non-whitespace character is
 * a double quote is a quoted field: commas and whitespace inside the quotes are
 * kept, and a doubled quote (`""`) is read as one quote character. Whitespace
 * around the quotes is dropped. An unterminated quoted field runs to the end of
 * the line.
 *
 * @param {string} line
 * @returns {string[]}
 */
export function parseCsvLine(line) {
  const fields = [];
  let i = 0;

  for (;;) {
    const start = i;
    while (i < line.length && /\s/.test(line[i])) i++;

    if (line[i] === '"') {
      i++;
      let value = '';
      while (i < line.length) {
        if (line[i] === '"') {
          if (line[i + 1] === '"') {
            value += '"';
            i += 2;
          } else {
            i++;
            break;
          }
        } else {
          value += line[i];
          i++;
        }
      }
      // Anything between the closing quote and the next comma is kept as
      // written, apart from surrounding whitespace.
      let end = line.indexOf(',', i);
      if (end === -1) end = line.length;
      value += line.slice(i, end).trim();
      fields.push(value);
      i = end;
    } else {
      let end = line.indexOf(',', start);
      if (end === -1) end = line.length;
      fields.push(line.slice(start, end).trim());
      i = end;
    }

    if (i >= line.length) return fields;
    i++; // skip the comma
  }
}
