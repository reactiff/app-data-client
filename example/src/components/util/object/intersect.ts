/**
 * @param object Returns a new object having only common top level properties with shape.
 * @param shape A shallow object defining properties to match.
 */
export default function intersect(object: any, shape: any) {
  const keys = Object.keys(shape).filter((k) => Reflect.has(object, k));
  return keys.reduce((target: any, key) => {
    target[key] = object[key];
    return target;
  }, {});
}
