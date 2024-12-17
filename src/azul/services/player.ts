import {
  initializeEmptyPlays,
  initializeEmptyRows,
} from '../helpers/placement';
import { Token } from '../types/board';

export class Player {
  name: string;
  board: Array<Array<Token | 'empty' | null>>;
  played: Array<
    Array<{
      token: Token;
      played?: boolean;
    }>
  >;
  graveyard: Array<Token>;

  constructor(name: string) {
    this.name = name;
    this.board = initializeEmptyRows();
    this.played = initializeEmptyPlays();
    this.graveyard = new Array<Token>();
  }
}
