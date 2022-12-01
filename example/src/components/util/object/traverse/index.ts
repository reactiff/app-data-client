import traverseLeaf from './traverseLeaf';
import { Traverse, TraverseOptions, SelectorFunction } from './types';

const traverse: Traverse = (
  source: any,
  strategy: TraverseOptions | SelectorFunction,
) => {
  const ns =
    typeof strategy === 'object' && Reflect.has(strategy, 'namespace')
      ? (strategy as TraverseOptions).namespace
      : null;
  const initialPathTokens = ns ? [ns] : [];

  const options =
    typeof strategy === 'object'
      ? (strategy as TraverseOptions)
      : { select: strategy as SelectorFunction };

  const results = traverseLeaf(source, {
    ...options,
    path: initialPathTokens,
    depth: 0,
  });

  return results;
};

export default traverse;
