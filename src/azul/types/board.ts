import { type ConstValues } from '@shared/types/utils';
import { TOKENS } from '../constants/board';

export type Token = ConstValues<typeof TOKENS>;

export interface Position {
  x: number;
  y: number;
}

export interface Pile {
  id: string;
  tokens: Array<{
    position: Position;
    token: Token;
  }>;
}
