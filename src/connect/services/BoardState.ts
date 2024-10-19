import { coord, generateMatrix } from '@shared/helpers/grid';
import { BOARD_SIZE, TOKENS, TRAVEL_DIRECTIONS } from '../constants';
import { Coord, Token } from '../types';
import { CellState } from './CellState';

export class BoardState {
  public cells: Array<Array<CellState>>;
  public tokenState: Record<string, Token>;
  public winState: Record<Token, number>;

  constructor() {
    this.cells = generateMatrix(BOARD_SIZE, (x, y) => new CellState({ x, y }));
    this.tokenState = {};
    this.winState = { [TOKENS.BLACK]: 0, [TOKENS.RED]: 0 };
  }

  getDroppedTokenLocation(x: number) {
    if (this.cells[x][0].token) {
      return;
    }
    let curr = 0;

    while (curr + 1 < BOARD_SIZE && !this.cells[x][curr + 1].token) {
      curr++;
    }
    return { x, y: curr };
  }

  dropToken({ x, y }: Coord, token: Token) {
    const cell = this.cells[x][y];
    cell.set(token);

    this.cells = [...this.cells];
    this.tokenState = {
      ...this.tokenState,
      [coord`${[x, y]}`]: token,
    };
    this.winState = {
      ...this.winState,
      [token]: this.winState[token] + 1,
    };

    return this.isGameWon({ x, y });
  }

  isGameWon(nextCoord: Coord) {
    const currentToken = this.tokenState[coord`${[nextCoord.x, nextCoord.y]}`];
    return Object.values(TRAVEL_DIRECTIONS).some((movement) => {
      let matchingTokenCount = 1;
      movement.forEach(({ x, y, incrX, incrY }) => {
        let currCoord = coord`${[nextCoord.x + x, nextCoord.y + y]}`;

        while (this.tokenState[currCoord] === currentToken) {
          x += incrX;
          y += incrY;
          matchingTokenCount++;
          currCoord = coord`${[nextCoord.x + x, nextCoord.y + y]}`;
        }
      });

      return matchingTokenCount === 4;
    });
  }

  nextGame() {
    this.tokenState = {};
    this.cells = generateMatrix(BOARD_SIZE, (x, y) => new CellState({ x, y }));
  }
}
