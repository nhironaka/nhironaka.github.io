import { type ConstValues } from '@shared/types/utils';

import { type TOKENS } from '../constants/board';
import { type PositionedElements } from '../helpers/placement';

export type Token = ConstValues<typeof TOKENS>;

export interface Position {
  x: number;
  y: number;
}

export interface Pile {
  id: string;
  tokens: Array<
    PositionedElements & {
      token: Token;
    }
  >;
}

export interface PlayedToken extends PositionedElements {
  startingPosition?: Position;
  token: Token;
  pileId: string;
}
