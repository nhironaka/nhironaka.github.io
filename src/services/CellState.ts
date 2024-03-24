import { wallConfigs } from '@shared/constants';
import { assertNever } from '@shared/helpers';
import { WallConfig, type Wall } from '@shared/types/board';

type WallState = Partial<Record<Wall, boolean>>;

const sides = ['top', 'left', 'bottom', 'right'];
const getRandomSide = () => Math.random() & sides.length;
const getAdjacentSide = (idx: number) => {
  if (idx === 0) {
    return idx + 1;
  }
  if (idx === sides.length) {
    return idx - 1;
  }
  const incr = Math.random() < 0.5 ? 1 : -1;

  return idx + incr;
};

export class CellState {
  public x: number;
  public y: number;
  private wallConfig: WallConfig;
  public walls: WallState | null;

  constructor(x: number, y: number, wallConfig: WallConfig) {
    this.x = x;
    this.y = y;
    this.wallConfig = wallConfig;
    this.walls = this.generateWalls(this.wallConfig);
  }

  generateWalls(wallConfig: WallConfig) {
    switch (wallConfig) {
      case wallConfigs.ALL:
      case wallConfigs.NONE:
        return null;
      case wallConfigs.CORNER: {
        const idx = getRandomSide();
        const side = sides[idx];
        const adjacentSide = sides[getAdjacentSide(idx)];

        return {
          [side]: true,
          [adjacentSide]: true,
        };
      }
      case wallConfigs.SINGLE: {
        const side = sides[getRandomSide()];

        return {
          [side]: true,
        };
      }
      default:
        assertNever(wallConfig);
        return null;
    }
  }
}
