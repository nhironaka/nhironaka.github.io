import { EMPTY } from '../constants/board';
import {
  initializeEmptyPlays,
  initializeEmptyRows,
} from '../helpers/placement';
import { type PlayedToken, type Token } from '../types/board';

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

  playToken(params: {
    hoveringRow: number;
    shadowTokens: Array<Token>;
    playingTokens: Array<PlayedToken>;
  }) {
    const { hoveringRow, shadowTokens, playingTokens } = params;
    let playedToken = 0;
    this.board[hoveringRow] =
      this.board[hoveringRow]?.map((token) => {
        if (token === EMPTY) {
          return playingTokens[playedToken++]?.token ?? EMPTY;
        }
        return token;
      }) ?? [];
    if (shadowTokens.length > 0) {
      this.graveyard = this.graveyard.concat(shadowTokens);
    }
  }
}
