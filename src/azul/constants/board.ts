export const TOKENS = {
  RED: 'red',
  YELLOW: 'yellow',
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
} as const;

export const EMPTY = 'empty' as const;

export const PILE_SIZE = 800;

export const NUM_PILES: Record<number, number> = {
  2: 5,
  3: 7,
  4: 9,
};

export const COLUMNS = 5;
