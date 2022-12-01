import { ClassSwitches } from './classSwitches';
import { StyleAttributes } from './styleAttributes';
import parseStyleDirectives from './parseStyleDirectives';
import useDependencies from './useDependencies';

export { default as useInlineStyle } from './useInlineStyle';

export type { ClassSwitches } from './classSwitches';
export type { StyleAttributes } from './styleAttributes';

export { default as parseStyleDirectives } from './parseStyleDirectives';
export { default as useStyleDirectives } from './useStyleDirectives';

export type PropsDirectives = ClassSwitches | StyleAttributes;

export default {
  parse: parseStyleDirectives,
  useDependencies,
};
