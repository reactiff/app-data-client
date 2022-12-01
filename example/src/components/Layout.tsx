import React, { ReactNode } from 'react';
import { PropsDirectives, useStyleDirectives } from './directives';

type DivProps = { children?: ReactNode, id?: string };
export const Div = (directives: DivProps & PropsDirectives) => {
  const { children, ...other } = directives;
  const { 
    root, 
    data 
  } = useStyleDirectives<DivProps>(other);
  return (
    <div className={root.className} id={directives.id} {...data}>
      {children}
    </div>
  );
};

type RowProps = { children?: ReactNode, id?: string };
export const Row = (directives: RowProps & PropsDirectives) => {
  const { children, ...other } = directives;
  const { root } = useStyleDirectives<RowProps>(
    other,
    'Row',
    'flex row',
  );
  return (
    <div className={root.className} id={directives.id}>
      {children}
    </div>
  );
};

type ColProps = { children?: ReactNode, id?: string };
export const Col = (directives: ColProps & PropsDirectives) => {
  const { children, ...other } = directives;
  const { root } = useStyleDirectives<ColProps>(
    other,
    'Col',
    'flex column',
  );
  return (
    <div className={root.className} id={directives.id}>
      {children}
    </div>
  );
};

export default {
  Div,
  Row,
  Col,
};
