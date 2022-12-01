import React, { ReactNode } from 'react';
import { useTheme } from '@material-ui/core';
import JsonInspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import clsx from 'clsx';
import { Div } from './Layout';
import { PropsDirectives, useStyleDirectives, useInlineStyle } from './directives';

type InspectorProps = {
  data: any;
  expanded?: (keypath: string, query: any) => true;
  interactiveLabel?: (
    value: any,
    originalValue: any,
    isKey: boolean,
    keyPath: string,
  ) => ReactNode;
};

export default (directives: InspectorProps & PropsDirectives) => {
  const { data, ...d } = directives;
  const { root } = useStyleDirectives<InspectorProps>(d);
  const theme = useTheme();
  const inline = useInlineStyle(
    () => ({
      root: {
        backgroundColor:
          theme.palette.type === 'dark' ? 'transparent' : '#f6f6f6',
          overflow: 'hidden',
        padding: 8,
        paddingTop: 0,
        '& .json-inspector__search': {
          backgroundColor:
            theme.palette.type === 'dark' ? '#11111133' : '#eeeeee33',
          color: theme.palette.type === 'dark' ? '#eee' : '#333',
          border: 'thin solid #80808033',
          padding: '5px 7px',
          margin: '8px 0',
          outline: 'none',
          borderRadius: 3,
          width: '100%',
        },
        '& .json-inspector__search:focus': {
          backgroundColor:
            theme.palette.type === 'dark' ? '#111111ee' : '#eeeeeeee',
          color: theme.palette.type === 'dark' ? '#eee' : '#333',
        },
      },
    }),
    [theme],
  )();
  return (
    <Div className={clsx(root.className, inline.root)}>
      <JsonInspector 
        data={data} 
        isExpanded={directives.expanded} 
        interactiveLabel={directives.interactiveLabel} 
      />
    </Div>
  );
};
