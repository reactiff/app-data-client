import React from 'react';

export default function useDependencies(props: any, additional?: any[]) {
  const m = React.useRef({ count: -1 }).current;
  const count = React.useMemo(() => Object.keys(props).length, [props]);

  if (m.count < 0) {
    m.count = count;
  } else if (m.count !== count) {
    throw new Error(
      'Error parsing Directives: The number of props changed.  Consider passing default values to optional prop.',
    );
  }

  return React.useMemo(
    () => Object.keys(props)
      .filter((key) => {
        if (key === 'color' || key.endsWith('Color')) return true;
        switch (typeof (props as any)[key]) {
          case 'undefined':
          case 'object':
          case 'function':
            return false;
          default:
            return true;
        }
      })
      .map((key) => `${key}=${(props as any)[key]}`)
      .concat(additional || []),
    [props, additional],
  );
}
