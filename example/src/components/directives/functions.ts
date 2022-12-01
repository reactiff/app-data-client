import attributeMap from './attributeMap';
import resolveAttributeValue from './resolveAttributeValue';
import classMap from './classMap';
import str from '../util/string';

export type StyleBag = { style: any; classes: string[] };
export type BagKeyValue = {
  bag: StyleBag;
  key: string;
  value?: any;
  debug: boolean;
};

export function getOrMakeStyle(x: BagKeyValue) {
  const resolvedKey = Reflect.has(attributeMap, x.key)
    ? (attributeMap as any)[x.key]
    : x.key;
  return { [resolvedKey]: resolveAttributeValue(x.value) };
}

export function createStyle(x: BagKeyValue) {
  Object.assign(x.bag.style, getOrMakeStyle(x));
  return true;
}

export function createClass(x: BagKeyValue) {
  const resolvedClass = Reflect.has(classMap, x.key)
    ? (classMap as any)[x.key]
    : str.camelToKebabCase(x.key);
  x.bag.classes.push(resolvedClass);
  return true;
}
