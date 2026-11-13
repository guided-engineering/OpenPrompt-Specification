/**
 * Split one line of a CSV file into its fields.
 *
 * @param {string} line
 * @returns {string[]}
 */
export function parseCsvLine(line) {
  const fields = [];
  let field = '';
  let inQuotes = false;
  let quoted = false;
  const push = () => {
    fields.push(quoted ? field : field.trim());
    field = '';
    quoted = false;
  };
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
      quoted = true;
      field = '';
    } else if (ch === ',') push();
    else if (!quoted) field += ch;
  }
  push();
  return fields;
}
