import { Box, Square as StyledSquare } from '@styled/jsx';
import { motion } from 'framer-motion';
import { type ComponentProps, type ReactNode } from 'react';

export const MotionBox = motion.create(Box);

export interface MotionBoxProps
  extends Omit<ComponentProps<typeof MotionBox>, 'children'> {
  children: ReactNode;
}

export const Square = motion.create(StyledSquare);

export interface SquareProps
  extends Omit<ComponentProps<typeof Square>, 'children'> {
  children: ReactNode;
}
