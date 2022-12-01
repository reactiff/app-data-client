import traverseLeaf from './traverseLeaf';
import { RecursiveContext } from './types';

export default function traverseArray(value: any, ctx: RecursiveContext) {
  if (ctx.debug)
    console.log(
      new Array(ctx.depth).fill(' ').join('') + 'traverseArray value:',
      value,
      ' ctx:',
      ctx,
    );

  let results: any[] = [];

  const { path, depth, ...other } = ctx;

  for (let index = 0; index < value.length; index++) {
    results = results.concat(
      traverseLeaf(value[index], {
        ...other,
        path: path.concat(`[${index}]`),
        depth: depth + 1,
        key: index,
        index,
      }),
    );
  }

  return results;
}
