/**
 * Recursively builds nested object from path tokens, assigning symbols (if any)
 * to each corresponding namespace, assigning value at the end.
 * @param {*} target
 * @param {*} tokens
 * @param {*} value
 */
function assignPath(target: any, tokens: string[], value: any) {
  let cursor = target;
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    const node = cursor[token];
    const t = typeof node;

    if (t === 'undefined' || node === null) {
      cursor[token] = {};
    } else if (Array.isArray(cursor[token])) {
      cursor[token] = { ...cursor[token] };
    } else if (t === 'object') {
      cursor[token] = { ...node };
    }

    if (i === tokens.length - 1) {
      cursor[token] = value;
      return value; // exit function
    }
    cursor = cursor[token];
  }
  return value;
}

export default assignPath;
