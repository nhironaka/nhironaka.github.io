import { DIRECTIONS } from '@shared/constants/ui';
import { assertNever, getRandomInt } from '@shared/helpers';
import { type Direction } from '@shared/types/ui';
import random from 'random';
import { WALL_CONFIGS } from '../constants/board';
import { isBoardEdge } from '../helpers/board';
import { type WallConfig } from '../types/board';

export type WallState = Partial<Record<Direction, boolean>>;

const sides = Object.values(DIRECTIONS);
const getRandomSide = () => getRandomInt(sides.length);

const getAdjacentSide = (idx: number) => {
  if (idx === 0) {
    return random.bool() ? idx + 1 : sides.length - 1;
  }
  if (idx === sides.length - 1) {
    return random.bool() ? idx - 1 : 0;
  }
  const incr = random.bool() ? 1 : -1;

  return idx + incr;
};

interface CellStateOptions {
  x: number;
  y: number;
  wallConfig: WallConfig;
  gridSize: number;
}

export class CellState {
  public x: number;
  public y: number;
  public wallConfig: WallConfig;
  public walls: WallState | null;

  constructor(opt: CellStateOptions) {
    const { x, y, wallConfig, gridSize } = opt;
    this.x = x;
    this.y = y;
    this.wallConfig = wallConfig;
    this.walls = this.generateWalls(gridSize);
  }

  private generateWalls(gridSize: number) {
    const cellArgs = { row: this.x, column: this.y, gridSize };
    const edges = isBoardEdge(cellArgs);
    let wallState: WallState = {};
    let isEdge = false;

    if (edges?.length) {
      wallState = edges.reduce(
        (acc, side) => ({ ...acc, [side]: true }),
        wallState,
      );
      isEdge = true;
    }

    switch (this.wallConfig) {
      case WALL_CONFIGS.ALL:
      case WALL_CONFIGS.NONE: {
        return isEdge ? wallState : null;
      }
      case WALL_CONFIGS.CORNER: {
        const idx = edges?.length
          ? sides.findIndex((side) => side === edges[0])
          : getRandomSide();
        const side = sides[idx];
        const adjacentSideIdx = getAdjacentSide(idx);
        const adjacentSide = sides[adjacentSideIdx];

        return {
          [side]: true,
          [adjacentSide]: true,
        };
      }
      case WALL_CONFIGS.SINGLE: {
        const side = sides[getRandomSide()];

        return {
          [side]: true,
          ...wallState,
        };
      }
      default:
        assertNever(this.wallConfig);
        return null;
    }
  }
}
