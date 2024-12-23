import { COLUMNS, EMPTY } from '../constants/board';
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
  points = 0;

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

  countTurn() {
    const { board, played } = this;
    let score = 0;

    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      const rowFull = row.every((token) => token == null || token !== EMPTY);
      const tokenColor = row.find((token) => token != null && token !== EMPTY);
      const idxToPlay = played[i].findIndex(
        ({ token }) => token === tokenColor,
      );

      if (rowFull) {
        if (tokenColor && idxToPlay !== -1) {
          board[i] = row.map((token) => (token == null ? token : EMPTY));

          played[i][idxToPlay].played = true;
          score += this.countPoints(i, idxToPlay);
        } else {
          throw new Error(`Unexpected row full`);
        }
      }
    }

    this.points += score;
  }

  countPoints(x: number, y: number) {
    const { played } = this;
    let score = 0;

    // Count vertical
    for (let i = 0; i < COLUMNS; i++) {
      const cell = played[x][i];
      if (cell.played) {
        score++;
      }
    }
    // Count horizontal
    for (let i = 0; i < COLUMNS; i++) {
      const cell = played[i][y];
      if (cell.played) {
        score++;
      }
    }

    return score;
  }
}
