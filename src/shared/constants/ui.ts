import type { Target } from 'framer-motion';

import { type Direction } from '@shared/types/ui';

export const floatingStates = {
  UNMOUNTED: 'unmounted',
  INITIAL: 'initial',
  POSITIONED: 'positioned',
} as const;

export const TRANSLATE_MAP: Record<Direction, Target> = {
  top: { translateY: 5 },
  bottom: { translateY: -5 },
  left: { translateX: 5 },
  right: { translateX: -5 },
};
export const DIRECTIONS = {
  LEFT: 'left',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
} as const;
