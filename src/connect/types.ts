import { type ConstValues } from '@shared/types/utils';

import { type TOKENS } from './constants';

export type Token = ConstValues<typeof TOKENS>;

export interface Coord {
  x: number;
  y: number;
}

export type TokenState = Record<string, Token>;
