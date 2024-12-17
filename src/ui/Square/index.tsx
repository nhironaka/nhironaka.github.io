import { Square as StyledSquare } from '@styled/jsx';
import { motion } from 'framer-motion';

export const Square = motion.create(StyledSquare, { forwardMotionProps: true });
