export const wallTypes = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export const difficultyTypes = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export const wallConfigs = {
  NONE: 0,
  SINGLE: 1,
  CORNER: 2,
  ALL: 4,
} as const;

export const difficultyConfigs = {
  [difficultyTypes.EASY]: {
    [wallConfigs.SINGLE]: 10,
    [wallConfigs.CORNER]: 9,
  },
  [difficultyTypes.MEDIUM]: {
    [wallConfigs.SINGLE]: 9,
    [wallConfigs.CORNER]: 8,
  },
  [difficultyTypes.HARD]: {
    [wallConfigs.SINGLE]: 8,
    [wallConfigs.CORNER]: 7,
  },
};
