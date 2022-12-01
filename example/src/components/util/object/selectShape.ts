import _ from 'lodash';
import traverse from './traverse';
import assignPath from './assignPath';

export default function selectShape(object: any, shape: any) {
  const selectors = traverse(shape, {
    select: (x: any) => ({ tokens: x.tokens, key: x.key, alias: x.value }),
  });
  const result = selectors.reduce((map: any, selector: any) => {
    const tokens = selector.tokens.slice(0, selector.tokens.length - 1);

    const sourcePath = [...tokens, selector.key].join('.');
    const value = _.get(object, sourcePath);

    const targetPathTokens = [...tokens, selector.alias];

    assignPath(map, targetPathTokens, value);

    return map;
  }, {});

  return result;
}
