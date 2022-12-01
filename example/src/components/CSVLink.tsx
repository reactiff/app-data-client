import React, { ReactNode } from 'react';
import { CSVLink as ReactCSVLink } from 'react-csv';
import { Div } from './Layout';
import { useInlineStyle } from './directives';

type CSVLinkProps = {
  data: any[];
  text?: string;
  children?: ReactNode;
};

const CSVLink = (props: CSVLinkProps) => {
  const inline = useInlineStyle(
    {
      root: {
        '& a': {
          color: 'inherit',
          textDecoration: 'none',
          fontSize: '1rem',
        },
        '& a:hover': {
          textDecoration: 'underline',
        },
      },
    },
    [],
  )();
  return (
    <Div className={inline.root}>
      <ReactCSVLink data={props.data}>
        {props.text || props.children}
      </ReactCSVLink>
    </Div>
  );
};

export default CSVLink;
