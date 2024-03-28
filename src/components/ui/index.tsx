import { motion, type MotionProps } from 'framer-motion';
import { forwardRef } from 'react';

import type { ComponentAttributes } from '@shared/types';
import { parseProps } from '../../shared/helpers/styles';

export const Box = forwardRef<
  HTMLDivElement,
  ComponentAttributes<HTMLDivElement>
>(({ children, style, ...attr }, ref) => {
  return (
    <div ref={ref} style={style} {...parseProps(attr)}>
      {children}
    </div>
  );
});

Box.displayName = 'Box';

export const MotionBox = forwardRef<
  HTMLDivElement,
  MotionProps & ComponentAttributes<HTMLDivElement>
>(({ children, style, ...attr }, ref) => {
  return (
    <motion.div ref={ref} style={style} {...parseProps(attr)}>
      {children}
    </motion.div>
  );
});

MotionBox.displayName = 'MotionBox';

export const Flex = forwardRef<
  HTMLDivElement,
  ComponentAttributes<HTMLDivElement>
>(({ display = 'flex', ...props }, ref) => {
  return <Box ref={ref} display={display} {...props} />;
});

Flex.displayName = 'Flex';

export const Grid = forwardRef<
  HTMLDivElement,
  ComponentAttributes<HTMLDivElement>
>(({ display = 'grid', ...props }, ref) => {
  return <Box ref={ref} display={display} {...props} />;
});

Grid.displayName = 'Grid';

export const Text = forwardRef<
  HTMLSpanElement,
  ComponentAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => (
  <span ref={ref} {...parseProps(props)}>
    {children}
  </span>
));

Text.displayName = 'Text';
