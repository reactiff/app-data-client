import clsx from 'clsx';
import { StyleBag, createClass } from './functions';
import classSwitches from './classSwitches';
import styleAttributes, { StyleAttributes } from './styleAttributes';

// const $$reactElement = Symbol.for('react.element');
const DEBUG = false;

function parseStyleDirectives(
  directives: any,
  componentOwnProps: any,
  tagName?: string,
  ...baseClasses: string[]
) {
  const {
    id,
    children,
    className,
    ref,
    data,
    innerProps,
    ...nonReact
  } = directives;
  const specialProps = {
    id, children, className, ref, data, innerProps,
  };
  const removeProps: string[] = [];
  const keys = Object.keys(nonReact);
  const bag: StyleBag = { style: {}, classes: [] };
  keys.forEach((key: any) => {
    if (
      !Reflect.has(specialProps, key) && !Reflect.has(componentOwnProps || {}, key)
    ) {
      // ignore special props
      const value = directives[key];
      if (Reflect.has(classSwitches, key)) {
        createClass({
          bag, key, value, debug: DEBUG,
        });
        removeProps.push(key);
      } else if (Reflect.has(styleAttributes, key)) {
        (styleAttributes as any)[key]({ bag, key, value });
        removeProps.push(key);
      } else {
        const type = typeof value;
        if (type === 'boolean' && value === true) {
          createClass({
            bag, key, value, debug: DEBUG,
          });
        }
      }
    }
  });

  const props = { ...nonReact, ...specialProps };
  removeProps.forEach((key) => {
    delete props[key];
  });

  return {
    classes: clsx(tagName, className, baseClasses, bag.classes),
    props,
    inline: Object.keys(bag.style).length > 0 ? { inline: bag.style } : null,
    attr: directives as StyleAttributes,
  };
}

export default parseStyleDirectives;
