import { ReactNode } from 'react';
import { createStyle } from './functions';

export interface StyleAttributes {

  backgroundColor?: any;
  bgColor?: any;

  backgroundImage?: any,
  backgroundRepeat?: any,
  backgroundPosition?: any,
  backgroundSize?: any,

  border?: any;
  borderTop?: any;
  borderRight?: any;
  borderBottom?: any;
  borderLeft?: any;

  borderRadius?: any;
  borderTopLeftRadius?: any;
  borderTopRightRadius?: any;
  borderBottomLeftRadius?: any;
  borderBottomRightRadius?: any;

  borderColor?: any;

  children?: ReactNode;
  className?: string;
  color?: string;
  cursor?: 'pointer' | string;

  data?: any;
  dataProps?: any;

  fontSize?: any;
  fontStyle?: any;
  fontWeight?: any;

  id?: any;
  innerProps?: any;

  lineHeight?: number;

  margin?: any;
  marginTop?: any;
  marginRight?: any;
  marginBottom?: any;
  marginLeft?: any;

  minHeight?: any;
  minWidth?: any;

  onBlur?: Function;
  onClick?: Function;
  onChange?: Function;
  onFocus?: Function;
  onMouseUp?: Function;
  onMouseDown?: Function;

  opacity?: any;

  padding?: any;
  paddingTop?: any;
  paddingRight?: any;
  paddingBottom?: any;
  paddingLeft?: any;

  pseudo?: any;

  textAlign?: any;
  textTransform?: any;
  title?: any;

  // SPECIAL GROUPS

  // size
  width?: any;
  height?: any;

  // position
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
}

export default {
  backgroundColor: createStyle,
  bgColor: createStyle,

  backgroundImage: createStyle,
  backgroundRepeat: createStyle,
  backgroundPosition: createStyle,
  backgroundSize: createStyle,

  border: createStyle,
  borderTop: createStyle,
  borderRight: createStyle,
  borderBottom: createStyle,
  borderLeft: createStyle,

  borderRadius: createStyle,
  borderTopLeftRadius: createStyle,
  borderTopRightRadius: createStyle,
  borderBottomLeftRadius: createStyle,
  borderBottomRightRadius: createStyle,

  color: createStyle,
  cursor: createStyle,

  dataProps: createStyle,
  fontSize: createStyle,
  fontStyle: createStyle,
  fontWeight: createStyle,

  innerProps: createStyle,
  lineHeight: createStyle,

  margin: createStyle,
  marginTop: createStyle,
  marginRight: createStyle,
  marginBottom: createStyle,
  marginLeft: createStyle,

  minHeight: createStyle,
  minWidth: createStyle,

  opacity: createStyle,

  padding: createStyle,
  paddingTop: createStyle,
  paddingRight: createStyle,
  paddingBottom: createStyle,
  paddingLeft: createStyle,

  pseudo: createStyle,

  textAlign: createStyle,
  textTransform: createStyle,
  title: createStyle,
  width: createStyle,
  height: createStyle,

  // position
  top: createStyle,
  right: createStyle,
  bottom: createStyle,
  left: createStyle,
};
