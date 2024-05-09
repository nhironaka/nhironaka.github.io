import { DIRECTIONS, WALL_CONFIGS } from '@shared/constants';
import { assertNever, getRandomInt } from '@shared/helpers';
import { isBoardEdge } from '@shared/helpers/board';
import { type Direction, type WallConfig } from '@shared/types/board';

export type WallState = Partial<Record<Direction, boolean>>;

const sides = Object.values(DIRECTIONS);
const getRandomSide = () => getRandomInt(sides.length);

const getAdjacentSide = (idx: number) => {
  if (idx === 0) {
    return Math.random() < 0.5 ? idx + 1 : sides.length - 1;
  }
  if (idx === sides.length - 1) {
    return Math.random() < 0.5 ? idx - 1 : 0;
  }
  const incr = Math.random() < 0.5 ? 1 : -1;

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
