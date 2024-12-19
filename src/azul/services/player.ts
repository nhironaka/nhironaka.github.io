import { type EMPTY } from '../constants/board';
import {
  initializeEmptyPlays,
  initializeEmptyRows,
} from '../helpers/placement';
import { type Token } from '../types/board';

export class Player {
  name: string;
  board: Array<Array<Token | typeof EMPTY | null>>;
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
