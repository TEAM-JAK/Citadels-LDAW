// @flow strict

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

// type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
// type Direction = 'horizontal' | 'horizontal-reverse' | 'vertical' | 'vertical-reverse';
// type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
// type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  directionHorizontal: {
    flexDirection: 'row',
  },
  directionHorizontalReverse: {
    flexDirection: 'row-reverse',
  },
  directionVertical: {
    flexDirection: 'column',
  },
  directionVerticalReverse: {
    flexDirection: 'column-reverse',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  alignBaseline: {
    alignItems: 'baseline',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  wrapReverse: {
    flexWrap: 'wrap-reverse',
  },
});

// type Props = $ReadOnly<{
//   align?: Align,
//   children?: ?Node,
//   className?: ?string,
//   direction?: Direction,
//   justify?: Justify,
//   wrap?: Wrap,
// }>;

export default function FlexLayout({
  align = 'start',
  children,
  className,
  direction = 'horizontal',
  justify = 'start',
  wrap = 'nowrap',
}) {
  const classes = useStyles();
  return (
    <div
      className={clsx(className, classes.root, {
        [classes.directionHorizontal]: direction === 'horizontal',
        [classes.directionHorizontalReverse]: direction === 'horizontal-reverse',
        [classes.directionVertical]: direction === 'vertical',
        [classes.directionVerticalReverse]: direction === 'vertical-reverse',
        [classes.justifyStart]: justify === 'start',
        [classes.justifyEnd]: justify === 'end',
        [classes.justifyCenter]: justify === 'center',
        [classes.justifyBetween]: justify === 'between',
        [classes.justifyAround]: justify === 'around',
        [classes.justifyEvenly]: justify === 'evenly',
        [classes.alignStart]: align === 'start',
        [classes.alignEnd]: align === 'end',
        [classes.alignCenter]: align === 'center',
        [classes.alignStretch]: align === 'stretch',
        [classes.alignBaseline]: align === 'baseline',
        // flex-wrap: nowrap is the default
        [classes.wrap]: wrap === 'wrap',
        [classes.wrapReverse]: wrap === 'wrap-reverse',
      })}
    >
      {children}
    </div>
  );
}
