import type { Target } from 'framer-motion';

export const floatingStates = {
  UNMOUNTED: 'unmounted',
  INITIAL: 'initial',
  POSITIONED: 'positioned',
} as const;

export const TRANSLATE_MAP: Record<string, Target> = {
  top: { translateY: 5 },
  bottom: { translateY: -5 },
  left: { translateX: 5 },
  right: { translateX: -5 },
};
