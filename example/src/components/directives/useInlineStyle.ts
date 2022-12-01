import { useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import util from '../util';

const useInlineStyle = (style: any, dependencies: any) => {
  const cb = useMemo(() => (
    makeStyles(() => (
      createStyles({ ...util.logic.fnOrValue(style) })
    ))
  ), [style, dependencies]);
  return cb;
};
export default useInlineStyle;
