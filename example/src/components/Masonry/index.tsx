/* eslint jsx-quotes: ["error", "prefer-double"] */
import React, { 
  useEffect, 
  useRef, 
  ReactNode, 
  useMemo 
} from 'react';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import logic from '../util/logic';
import {
  PropsDirectives,
  useStyleDirectives,
  useInlineStyle,
} from '../directives';
import './style.css';

/**
 * colSpan: (Optional) number of columns the item spans.  Default is 1.
 * image: (Optional) cover image for the card.
 *
 */
export interface IMasonryItem {
  colSpan?: number;
  image?: any;
  title?: string;
  description?: string;
  onClick?: Function;
}

/**
 * min: Min value for the grid's minmax(min, max) function. Default 150px.
 * max: Max value for the grid's minmax(min, max) function. Default 1fr.
 * items: IMasonryItem[]
 */
export type MasonryProps = {
  min?: any;
  max?: any;
  items: IMasonryItem[];
  elementForItem?: (item: IMasonryItem, index: number) => ReactNode;
  revision: number,
};

const ElementContainer = (props: any) => {
  const { element, colSpan, image } = props;
  const inline = useInlineStyle(() => {
    const root: any = {};
    if (colSpan) {
      root.gridColumnEnd = `span ${colSpan}`;
    }
    return {
      root,
      image: { backgroundImage: `url("${image}")` },
    };
  }, [colSpan, image])();

  return (
    <div className={clsx('masonry-item', 'relative', inline.root)}>
      <div className="content fill">{element}</div>
    </div>
  );
};

export const DefaultMasonryItem = (
  directives: IMasonryItem & PropsDirectives,
) => {
  const {
    colSpan, image, title, description, onClick, ...d
  } = directives;
  const { root } = useStyleDirectives<IMasonryItem>(
    d,
    'MasonryItem',
    'masonry-item',
  );
  const inline = useInlineStyle(() => ({
    root: { gridColumnEnd: colSpan ? `span ${colSpan}` : null },
    image: { backgroundImage: `url("${image}")` },
  }), [colSpan, image])();
  return (
    // eslint-disable-next-line
    <div
      className={clsx(root.className, inline.root)}
      onClick={() => onClick && onClick()}
    >
      <Paper className="content">
        {image && <div className={clsx('cover-image', inline.image)} />}
        {title && <div className="title">{title}</div>}
        {description && <div className="desc">{description}</div>}
      </Paper>
    </div>
  );
};

const Masonry = (directives: MasonryProps & PropsDirectives) => {
  const {
    min, max, items, elementForItem, revision, ...d
  } = directives;

  const theme = useTheme();

  const { root } = useStyleDirectives<MasonryProps>(
    d,
    'Masonry',
    'ui-masonry-grid masonry-grid grid',
  );

  const mutable = useRef({ resizing: false, gridItems: [] }).current;

  const g = document.getElementsByClassName('masonry-grid')[0];
  const { 
    grid, 
    rowHeight, 
    rowGap, 
    gridItems 
  } = useMemo(() => {
    if (!g) return { rowHeight: 0, rowGap: 0, gridItems: [] };
    return {
      grid: g,
      rowHeight: parseInt(
        window.getComputedStyle(g).getPropertyValue('grid-auto-rows'), 10,
      ),
      rowGap: parseInt(
        window.getComputedStyle(g).getPropertyValue('grid-row-gap'), 10,
      ),
      gridItems: Array.from(document.getElementsByClassName('masonry-item'))
        .map(
          (e: any) => {
            const innerElement = e.querySelector('.content > *');
            const heightRatio = +innerElement.getAttribute('heightratio');
            return {
              container: e,
              innerElement,
              heightRatio,
            };
          }
        ),
    };
  }, [g, items, revision, mutable.resizing]);
  
  // const resizeGridItem = React.useCallback((item: any) => {
  //   const grid = document.getElementsByClassName('masonry-grid')[0];
  //   const rowHeight = parseInt(
  //     window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10,
  //   );
  //   const rowGap = parseInt(
  //     window.getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10,
  //   );
  //   const innerEllement = item.querySelector('.content > *');
  //   // const heightRatio = innerEllement.get
  //   const rowSpan = Math.ceil(
  //     innerEllement.getBoundingClientRect().height / (rowHeight + rowGap),
  //   );
  //   item.style.gridRowEnd = `span ${rowSpan}`;
  // }, []);

  const resizeGridItem = React.useCallback((gi: any) => {
    
    const rect = gi.innerElement.getBoundingClientRect();
    if (rect.width === 0) {
      return;
    }

    let rowSpan;

    if (gi.heightRatio) {
      const impliedHeight = Math.round(rect.width * gi.heightRatio);
      const heightWithGap = impliedHeight + rowGap;
      const remainder = heightWithGap % (rowHeight + rowGap);
      rowSpan = Math.round((heightWithGap - remainder) / (rowHeight + rowGap));
    } else {
      const heightWithGap = rect.height + rowGap;
      const remainder = heightWithGap % (rowHeight + rowGap);
      rowSpan = Math.round((heightWithGap - remainder) / (rowHeight + rowGap));
    }

    gi.container.style.gridRowEnd = `span ${rowSpan}`;
  }, [grid, items, gridItems, revision, mutable.resizing]);

  const resizeAllGridItems = React.useCallback(() => {
      gridItems.forEach(gi => resizeGridItem(gi));
    },
    [grid, items, gridItems, revision, mutable.resizing, resizeGridItem]
  );

  // Triggers
  const handleResizeAllGridItems = React.useCallback(() => {
    if (mutable.resizing) {
      return;
    }
    mutable.resizing = true;
    const timer = setTimeout(() => {
      mutable.resizing = false;
    }, 100);
    window.requestAnimationFrame(() => {
      clearTimeout(timer);
      resizeAllGridItems();
      mutable.resizing = false;
    });
    
  }, [grid, items, gridItems, revision, mutable.resizing, resizeAllGridItems]);
  
  useEffect(() => {
    window.addEventListener('resize', handleResizeAllGridItems);
    return () => {
      window.removeEventListener('resize', handleResizeAllGridItems);
    };
  }, [grid, items, gridItems, revision, mutable.resizing, handleResizeAllGridItems]);

  useEffect(() => {
    setTimeout(() => handleResizeAllGridItems(), 100);
  }, [grid, items, gridItems, revision, mutable.resizing, handleResizeAllGridItems]);

  setTimeout(() => handleResizeAllGridItems(), 0);

  const inline = useInlineStyle(() => {
    const minval = min || '150px';
    const maxval = max || '1.4fr';
    return {
      root: {
        gridTemplateColumns: `repeat(auto-fill, minmax(${minval},${maxval}))`,
        '& .masonry-item': {
          boxShadow: logic.switch(
            null, 'inherit', 
            () => theme.palette.type === 'light', '2px 2px 4px #9c9c9c',
          ),
          borderRadius: 3,
          overflow: 'hidden',
        },
        '& .masonry-item:hover': {
          boxShadow: logic.switch(
            null, '3px 3px 6px #9c9c9c', 
            () => theme.palette.type === 'dark', '0px 0px 4px #55555522',
          ),
        },
      },
    };
  }, [min, max])();

  return (
    <div className={clsx('root', root.className, inline.root)}>
      {
        /* eslint-disable react/jsx-props-no-spreading */
        /* eslint-disable no-confusing-arrow */
        /* eslint-disable react/no-array-index-key */
        items.map((item, index) => elementForItem
          ? (
            <ElementContainer
              key={index}
              {...item}
              element={elementForItem(item, index)}
            />
          ) : (
            <DefaultMasonryItem key={index} {...item} />
          ))
      }
    </div>
  );
};
export default Masonry;
