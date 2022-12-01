export function all(array: any[], test: any) {
  const someAreFalse = array.some((x) => !test(x));
  return !someAreFalse;
}

export function uniques(array: any[]) {
  return Array.from(new Set(array));
}

export function toDictionary(items: any[], key: (item: any) => any) {
  return items.reduce(
    (dict: any, item: any) => Object.assign(dict, { [key(item)]: item }),
    {},
  );
}

export function sortBy(
  valueForItem: (item: any) => any,
  order?: 'asc' | 'desc',
) {
  const dir = order && order === 'desc' ? -1 : 1;
  return (a: any, b: any) => (valueForItem(a) < valueForItem(b) ? -1 : 1) * dir;
}
export function sortByDesc(valueForItem: (item: any) => any) {
  return (a: any, b: any) => (valueForItem(a) > valueForItem(b) ? -1 : 1);
}

export default {
  all,
  uniques,
  sortBy,
  sortByDesc,
  toDictionary,
};
