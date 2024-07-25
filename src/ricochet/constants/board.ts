import { type ConstValues } from '@shared/types/utils';

export const DIFFICULTY_TYPES = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export const WALL_CONFIGS = {
  NONE: 0,
  SINGLE: 1,
  CORNER: 2,
  ALL: 4,
} as const;

export const TOKENS = {
  RED: 'red',
  YELLOW: 'yellow',
  PURPLE: 'purple',
  GREEN: 'green',
} as const;

type TokenKey = keyof typeof TOKENS;
type Token = ConstValues<typeof TOKENS>;
type TokenVar = 1 | 2 | 3 | 4;

export const GOAL_TOKENS: Record<
  `${TokenKey}_${TokenVar}`,
  `${Token}${TokenVar}`
> = {
  RED_1: 'red1',
  RED_2: 'red2',
  RED_3: 'red3',
  RED_4: 'red4',
  YELLOW_1: 'yellow1',
  YELLOW_2: 'yellow2',
  YELLOW_3: 'yellow3',
  YELLOW_4: 'yellow4',
  PURPLE_1: 'purple1',
  PURPLE_2: 'purple2',
  PURPLE_3: 'purple3',
  PURPLE_4: 'purple4',
  GREEN_1: 'green1',
  GREEN_2: 'green2',
  GREEN_3: 'green3',
  GREEN_4: 'green4',
};

export const DIFFICULTY_CONFIGS = {
  [DIFFICULTY_TYPES.EASY]: {
    [WALL_CONFIGS.SINGLE]: 10,
    [WALL_CONFIGS.CORNER]: 20,
  },
  [DIFFICULTY_TYPES.MEDIUM]: {
    [WALL_CONFIGS.SINGLE]: 9,
    [WALL_CONFIGS.CORNER]: 18,
  },
  [DIFFICULTY_TYPES.HARD]: {
    [WALL_CONFIGS.SINGLE]: 8,
    [WALL_CONFIGS.CORNER]: 16,
  },
};

export const PLAYERS = {
  ONE: 1,
  TWO: 2,
} as const;
