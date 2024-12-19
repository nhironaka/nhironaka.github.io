export const TOKENS = {
  RED: 'red',
  YELLOW: 'yellow',
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
} as const;

export const TOKEN_SIZE: Record<number, number> = {
  2: 60,
  3: 55,
  4: 50,
};

export const PILE_RADIUS: Record<number, number> = {
  2: 125,
  3: 100,
  4: 90,
};

export const EMPTY = 'empty' as const;
