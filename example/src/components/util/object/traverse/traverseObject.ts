import traverseLeaf from './traverseLeaf';
import { RecursiveContext } from './types';
import isNullOrUndefined from './isNullOrUndefined';

export default function traverseObject(value: any, ctx: RecursiveContext) {
  if (ctx.debug)
    console.log(
      new Array(ctx.depth).fill(' ').join('') + 'traverseObject value:',
      value,
      ' ctx:',
      ctx,
    );

  let results: any[] = [];

  if (isNullOrUndefined(value)) {
    return results;
  }

  const { path, depth, ...other } = ctx;

  // traverse own properties
  for (let key of Object.keys(value)) {
    results = results.concat(
      traverseLeaf(value[key], {
        ...other,
        path: path.concat(key),
        depth: depth + 1,
        key,
        index: key,
      }),
    );
  }

  // traverse symbol properties too
  const symbols = Object.getOwnPropertySymbols(value);
  if (symbols.length) {
    for (let symbol of symbols) {
      results = results.concat(
        traverseLeaf(value[symbol], {
          ...other,
          path: path.concat(symbol),
          depth: depth + 1,
          key: symbol,
          index: symbol,
        }),
      );
    }
  }

  return results;
}
