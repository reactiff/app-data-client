import traverseObject from './traverseObject';
import traverseArray from './traverseArray';

import { RecursiveContext, CallbackContext } from './types';

export default function traverseLeaf(value: any, ctx: RecursiveContext) {
  if (ctx.debug)
    console.log(
      new Array(ctx.depth).fill(' ').join('') + 'traverseLeaf value:',
      value,
      ' ctx:',
      ctx,
    );

  let results: any[] = [];

  const cbContext: CallbackContext = {
    value,
    type: typeof value,
    contructorName: value ? value.constructor.name : undefined,
    key: ctx.key,
    path: ctx.path
      .map((t: any) => {
        const token = typeof t === 'string' ? t : t.toString();
        return token[0] === '[' ? token : '.' + token;
      })
      .join('')
      .substring(1),
    tokens: ctx.path,
  };

  // if find and select are both present
  if (ctx.find && ctx.select && ctx.find(cbContext)) {
    return ctx.select(cbContext);
  }

  if (ctx.filter) {
    // if filter present
    if (ctx.filter(cbContext)) {
      if (ctx.visit) {
        ctx.visit(cbContext);
      }
      if (ctx.select) {
        results = results.concat(ctx.select(cbContext));
      }
    }
  } else {
    // no filter present
    if (ctx.visit) {
      ctx.visit(cbContext);
    }
    if (ctx.select) {
      results = results.concat(ctx.select(cbContext));
    }
  }

  if (Array.isArray(value)) {
    if (!ctx.expand || ctx.expand(cbContext)) {
      results = results.concat(traverseArray(value, ctx));
    }
  } else if (typeof value === 'object') {
    if (!ctx.expand || ctx.expand(cbContext)) {
      results = results.concat(traverseObject(value, ctx));
    }
  }

  return results;
}
