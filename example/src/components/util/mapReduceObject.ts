function sum(args: number[]) {
  return args.reduce((acc, item) => acc + item, 0);
}

export type SelectorFunction = (value: any, key: any, object: any) => any;

const aggregate = (
  source: any,
  fn: Function,
  select: SelectorFunction,
  defaultValue: any,
) => {
  if (!source) {
    return defaultValue;
  }

  return Object.keys(source)
    .map((key) => {
      const item = { key, item: source[key] };
      return item;
    })
    .reduce((acc, elem) => {
      const itemValue = select(elem.item, elem.key, source);
      const result = fn(acc, itemValue);

      return result;
    }, defaultValue);
};

const fnConcat = (acc: any[], arr: any[]) => {
  return acc.concat(arr);
};

export default class MapReduceObject {
  object: any;

  constructor(object: any) {
    this.object = object;
  }

  count() {
    return Object.keys(this.object).length;
  }

  map(select?: SelectorFunction) {
    return Object.entries(this.object).map(([key, value]) => {
      if (select) {
        return select(value, key, this.object);
      }  
      return value;
    });
  }

  concat(select: SelectorFunction) {
    return aggregate(this.object, fnConcat, select, []);
  }

  min(select: SelectorFunction) {
    return aggregate(this.object, Math.min, select, Number.MAX_VALUE);
  }

  max(select: SelectorFunction) {
    return aggregate(this.object, Math.max, select, Number.MIN_VALUE);
  }

  sum(select: SelectorFunction) {
    return sum(this.map(select));
  }

  avg(select: SelectorFunction) {
    const values = this.map(select);
    if (values.length === 0) return 0;
    return sum(values) / values.length;
  }
}
