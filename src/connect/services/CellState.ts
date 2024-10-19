import { Token } from '../types';

interface CellStateOptions {
  x: number;
  y: number;
  token?: Token | '';
}

export class CellState {
  public x: number;
  public y: number;
  public token: Token | '';

  constructor(opt: CellStateOptions) {
    const { x, y, token = '' } = opt;
    this.x = x;
    this.y = y;
    this.token = token;
  }

  set(token: Token) {
    this.token = token;
  }
}
