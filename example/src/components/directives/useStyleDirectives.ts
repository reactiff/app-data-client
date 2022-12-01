// import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { StyleBag, createClass } from './functions';
import classSwitches from './classSwitches';
import styleAttributes, { StyleAttributes } from './styleAttributes';
// import { getPropsDescriptor } from './getPropsDescriptor';

// const $$reactElement = Symbol.for('react.element');

function useStyleDirectives<T>(
  directives: any,
  tagName?: string,
  ...baseClasses: string[]
) {
  const {
    id,
    children,
    style,
    className,
    ref,
    data,
    pseudo,
    innerProps,
    ...nonReact
  } = directives;
  const specialProps = {
    id,
    children,
    style,
    className,
    ref,
    data,
    innerProps,
  };
  const removeProps: string[] = [];
  const keys = Object.keys(nonReact);
  const bag: StyleBag = { style: style || {}, classes: [] };
  keys.forEach((key: any) => {
    if (!Reflect.has(specialProps, key)) {
      const value = directives[key];
      if (Reflect.has(classSwitches, key)) {
        createClass({
          bag, key, value, debug: false,
        });
        removeProps.push(key);
      } else if (Reflect.has(styleAttributes, key)) {
        (styleAttributes as any)[key]({ bag, key, value });
        removeProps.push(key);
      } else {
        const type = typeof value;
        if (type === 'boolean' && value === true) {
          createClass({
            bag, key, value, debug: false,
          });
        }
      }
    }
  });

  const props = { ...nonReact };
  removeProps.forEach((key) => {
    delete props[key];
  });

  const pseudoStyles = Object.keys(directives.pseudo || {}).reduce(
    (acc: any, key) => {
      const s = directives.pseudo[key];
      const fullKey = key[0] === '&' ? key : `& :${key}`;
      return Object.assign(acc, { [fullKey]: s });
    },
    {},
  );

  const usedStyles: any = makeStyles(() => {
    const s: any = {};
    if (Object.keys(bag.style).length) s.bag = bag.style;
    if (Object.keys(pseudoStyles).length) s.pseudo = pseudoStyles;
    return s;
  })();

  const { dataProps, ...attr } = (directives as StyleAttributes);
  const result = {
    root: {
      className: clsx(
        className,
        baseClasses,
        tagName,
        bag.classes,
        usedStyles.bag,
        usedStyles.pseudo,
      ),
    },
    props: { ...(props as T), ...specialProps },
    attr,
    data: dataProps,
  };

  return result;
}

export default useStyleDirectives;
