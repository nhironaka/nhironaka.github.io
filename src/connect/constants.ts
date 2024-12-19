export const BOARD_SIZE = 7;

export const TOKENS = {
  RED: 'red',
  BLACK: 'black',
} as const;

export const TOKEN_COLOR = {
  [TOKENS.RED]: 'colors.indigo.500',
  [TOKENS.BLACK]: 'colors.emerald.500',
} as const;

export const TRAVEL_DIRECTIONS = {
  HORIZONTAL: [
    {
      x: -1,
      y: 0,
      incrX: -1,
      incrY: 0,
    },
    {
      x: 1,
      y: 0,
      incrX: 1,
      incrY: 0,
    },
  ],
  VERTICAL: [
    {
      x: 0,
      y: 1,
      incrX: 0,
      incrY: 1,
    },
  ],
  DIAGONAL_LEFT: [
    {
      x: -1,
      y: 1,
      incrX: -1,
      incrY: 1,
    },
    {
      x: 1,
      y: -1,
      incrX: 1,
      incrY: -1,
    },
  ],
  DIAGONAL_RIGHT: [
    {
      x: -1,
      y: -1,
      incrX: -1,
      incrY: -1,
    },
    {
      x: 1,
      y: 1,
      incrX: 1,
      incrY: 1,
    },
  ],
};
