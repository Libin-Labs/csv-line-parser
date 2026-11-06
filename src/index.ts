export function parseCsvLine(line: string): string[] {
  if (typeof line !== 'string') throw new TypeError('Expected CSV line');
  const out: string[] = [];
  let i = 0;
  while (true) {
    let value = '';
    if (line[i] === '"') {
      i++;
      let closed = false;
      while (i < line.length) {
        if (line[i] === '"') {
          if (line[i + 1] === '"') {
            value += '"';
            i += 2;
          } else {
            i++;
            closed = true;
            break;
          }
        } else value += line[i++]!;
      }
      if (!closed) throw new SyntaxError('Unterminated quoted field');
      if (i < line.length && line[i] !== ',')
        throw new SyntaxError('Unexpected text after quoted field');
    } else {
      while (i < line.length && line[i] !== ',') {
        if (line[i] === '"') throw new SyntaxError('Quote inside unquoted field');
        value += line[i++]!;
      }
    }
    out.push(value);
    if (i >= line.length) break;
    i++;
    if (i === line.length) {
      out.push('');
      break;
    }
  }
  return out;
}
