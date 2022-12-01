export interface ClassSwitches {
  absolute?: boolean;

  alignStart?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  alignStretch?: boolean;
  alignBaseline?: boolean;
  alignAuto?: boolean;

  alignSelfStart?: boolean;
  alignSelfCenter?: boolean;
  alignSelfEnd?: boolean;
  alignSelfStretch?: boolean;
  alignSelfBaseline?: boolean;

  anchorBottom?: boolean;
  anchorLeft?: boolean;
  anchorRight?: boolean;
  anchorTop?: boolean;

  beveled?: boolean;
  block?: boolean;
  borderBox?: boolean;

  centerX?: boolean;
  centerXY?: boolean;
  centerY?: boolean;
  clickable?: boolean;
  coverImage?: boolean;

  fill?: boolean;
  fixed?: boolean;
  fullWidth?: boolean;
  fullWidthAlways?: boolean;

  grow?: boolean;

  hidden?: boolean;
  horizontal?: boolean;

  inline?: boolean;
  inlineBlock?: boolean;

  justifyStart?: boolean;
  justifyCenter?: boolean;
  justifyEnd?: boolean;

  mobileCenter?: boolean;
  mobileColumn?: boolean;
  mobileOnly?: boolean;

  noBr?: boolean;
  noBreak?: boolean;
  noMargin?: boolean;
  noMobile?: boolean;
  noOverflow?: boolean;
  noPadding?: boolean;
  noSelect?: boolean;
  noTransform?: boolean;
  noWrap?: boolean;

  opaque?: boolean;
  overlay?: boolean;

  relative?: boolean;
  root?: boolean;
  round?: boolean;
  rounded?: boolean;

  scrollable?: boolean;
  scrollableX?: boolean;
  scrollableY?: boolean;
  shrink?: boolean;
  small?: boolean;
  smaller?: boolean;
  solid?: boolean;
  spaced?: boolean;
  square?: boolean;
  sticky?: boolean;

  tall?: boolean;
  translucent?: boolean;

  vertical?: boolean;

  wide?: boolean;
}

const switches: ClassSwitches = {
  absolute: true,

  alignStart: true,
  alignCenter: true,
  alignEnd: true,
  alignStretch: true,
  alignBaseline: true,
  alignAuto: true,

  alignSelfStart: true,
  alignSelfCenter: true,
  alignSelfEnd: true,
  alignSelfStretch: true,
  alignSelfBaseline: true,

  anchorBottom: true,
  anchorLeft: true,
  anchorRight: true,
  anchorTop: true,

  beveled: true,
  block: true,
  borderBox: true,

  centerX: true,
  centerXY: true,
  centerY: true,
  clickable: true,
  coverImage: true,

  fill: true,
  fixed: true,
  fullWidth: true,
  fullWidthAlways: true,

  grow: true,

  hidden: true,
  horizontal: true,

  inline: true,
  inlineBlock: true,

  justifyStart: true,
  justifyCenter: true,
  justifyEnd: true,

  mobileCenter: true,
  mobileColumn: true,
  mobileOnly: true,

  noBr: true,
  noBreak: true,
  noMargin: true,
  noMobile: true,
  noOverflow: true,
  noPadding: true,
  noSelect: true,
  noTransform: true,
  noWrap: true,

  opaque: true,
  overlay: true,

  relative: true,
  round: true,
  rounded: true,

  scrollable: true,
  scrollableX: true,
  scrollableY: true,
  shrink: true,
  small: true,
  smaller: true,
  solid: true,
  spaced: true,
  sticky: true,

  tall: true,
  translucent: true,

  vertical: true,

  wide: true,
};

export default switches;
