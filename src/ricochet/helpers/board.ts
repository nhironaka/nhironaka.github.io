import { assertNever } from '@shared/helpers';
import { coord, fromCoord } from '.';
import {
  DIRECTIONS,
  GOAL_TOKENS,
  TOKENS,
  WALL_CONFIGS,
} from '../constants/board';
import type { BoardState } from '../services/BoardState';
import type { CellState } from '../services/CellState';
import { Randomizer } from '../services/randomizer';
import type {
  Direction,
  GoalState,
  GoalToken,
  Token,
  TokenState,
  WallConfig,
} from '../types/board';

export const getBoardCenter = (gridSize: number) => {
  const gridCenter = Math.floor(gridSize / 2);

  if (gridSize % 2 === 0) {
    return [
      coord`${[gridCenter - 1, gridCenter - 1]}`,
      coord`${[gridCenter - 1, gridCenter]}`,
      coord`${[gridCenter, gridCenter - 1]}`,
      coord`${[gridCenter, gridCenter]}`,
    ];
  } else {
    return [coord`${[gridCenter, gridCenter]}`];
  }
};

export const generateMatrix = <T>(
  gridSize: number,
  output: (row: number, column: number) => T
) => {
  return new Array(gridSize).fill('').map((_, row) => {
    return new Array(gridSize).fill('').map((_, column) => {
      return output(row, column);
    });
  });
};

export const getSurroundingCells = (grid: string[], gridSize: number) => {
  const {
    x: { minX, maxX },
    y: { minY, maxY },
  } = grid.map(fromCoord).reduce(
    ({ x: { minX, maxX }, y: { minY, maxY } }, [x, y]) => {
      return {
        x: {
          minX: Math.min(minX, Math.max(0, x - 1)),
          maxX: Math.max(maxX, Math.min(x + 1, gridSize - 1)),
        },
        y: {
          minY: Math.min(minY, Math.max(0, y - 1)),
          maxY: Math.max(maxY, Math.min(y + 1, gridSize - 1)),
        },
      };
    },
    {
      x: { maxX: 0, minX: gridSize - 1 },
      y: { maxY: 0, minY: gridSize - 1 },
    }
  );

  const surroundingCells: Array<string> = [];

  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      surroundingCells.push(coord`${[i, j]}`);
    }
  }

  return surroundingCells;
};

export const isBoardEdge = (opt: {
  row: number;
  column: number;
  gridSize: number;
}) => {
  const { row, column, gridSize } = opt;
  const edges = [];
  if (row === 0) {
    edges.push('top');
  }
  if (row === gridSize - 1) {
    edges.push('bottom');
  }
  if (column === 0) {
    edges.push('left');
  }
  if (column === gridSize - 1) {
    edges.push('right');
  }
  return edges.length ? edges : null;
};

export const isBoardCenter = (opt: {
  row: number;
  column: number;
  gridSize: number;
}) => {
  const { row, column, gridSize } = opt;

  const gridCenter = Math.floor(gridSize / 2);
  const isEven = gridSize % 2 === 0;

  if (row === gridCenter) {
    return column === gridCenter || (isEven && column === gridCenter - 1);
  }

  if (row === gridCenter - 1 && isEven) {
    return column === gridCenter || column === gridCenter - 1;
  }

  return false;
};

export const getRandomDifficulty = (
  difficultyConfig: Partial<Record<WallConfig, number>>
) => {
  let wallConfig =
    Math.random() < 0.5 ? WALL_CONFIGS.SINGLE : WALL_CONFIGS.CORNER;
  let remainingCount = difficultyConfig[wallConfig];
  if (typeof remainingCount === 'number' && remainingCount > 0) {
    difficultyConfig[wallConfig] = remainingCount - 1;

    return wallConfig;
  }

  wallConfig =
    wallConfig === WALL_CONFIGS.SINGLE
      ? WALL_CONFIGS.CORNER
      : WALL_CONFIGS.SINGLE;

  remainingCount = difficultyConfig[wallConfig];
  if (typeof remainingCount === 'number' && remainingCount > 0) {
    difficultyConfig[wallConfig] = remainingCount - 1;

    return wallConfig;
  }

  return WALL_CONFIGS.NONE;
};

export const getWallConfig = (opt: { cell: CellState }) => {
  const { cell } = opt;

  const { walls, wallConfig } = cell;

  if (wallConfig === WALL_CONFIGS.ALL) {
    return Object.values(DIRECTIONS);
  }
  if (walls) {
    return Object.entries(walls)
      .filter(([_, isBlocker]) => isBlocker)
      .map(([side]) => side as Direction);
  }

  return [];
};

export const allowedDirection = (cell: CellState, direction: Direction) => {
  const { walls, wallConfig } = cell;

  if (wallConfig === WALL_CONFIGS.NONE) {
    return true;
  }
  if (wallConfig === WALL_CONFIGS.ALL) {
    return false;
  }
  switch (direction) {
    case DIRECTIONS.TOP:
      return !walls?.bottom;
    case DIRECTIONS.BOTTOM:
      return !walls?.top;
    case DIRECTIONS.LEFT:
      return !walls?.right;
    case DIRECTIONS.RIGHT:
      return !walls?.left;
    default:
      assertNever(direction);
  }
};

export const stoppedByCell = (cell: CellState, direction: Direction) => {
  const { walls } = cell;

  switch (direction) {
    case DIRECTIONS.TOP:
      return !!walls?.top;
    case DIRECTIONS.BOTTOM:
      return !!walls?.bottom;
    case DIRECTIONS.LEFT:
      return !!walls?.left;
    case DIRECTIONS.RIGHT:
      return !!walls?.right;
    default:
      assertNever(direction);
  }
};

export const getInitialTokenState = (gridSize: number) => {
  const boardCenter = getBoardCenter(gridSize);

  return Object.values(TOKENS).reduce((acc, token, idx) => {
    let [x, y] = (boardCenter[idx] ?? boardCenter[0]).split(',').map(Number);
    switch (idx) {
      case 0:
        x -= 1;
        break;
      case 1:
        y += 1;
        break;
      case 2:
        y -= 1;
        break;
      case 3:
        x += 1;
        break;
      default:
    }
    acc[token] = [x, y];

    return acc;
  }, {} as TokenState);
};

export const getGoalState = (board: BoardState) => {
  const { configedCells } = board;
  const cornerWallCells = Object.values(configedCells).filter(
    ({ wallConfig }) => wallConfig === WALL_CONFIGS.CORNER
  );
  const cornerWallCoord = cornerWallCells.map(({ x, y }) => coord`${[x, y]}`);
  const goalTokens = Object.values(GOAL_TOKENS);

  const randomCellSelector = new Randomizer(cornerWallCoord, goalTokens.length);
  const goalCells = randomCellSelector.all();

  return goalCells.reduce((acc, xy, index) => {
    acc[xy] = goalTokens[index];
    return acc;
  }, {} as GoalState);
};

export const isAtGoal = (opt: {
  goalState: Record<GoalToken, string>;
  tokenState: Record<string, Token>;
  activeGoal: GoalToken;
}) => {
  const { goalState, tokenState, activeGoal } = opt;

  const goalCoord = goalState[activeGoal];

  const goalTokenColor = activeGoal.replace(/\d+/, '') as Token;

  const tokenCoord = Object.entries(tokenState).find(
    ([_, token]) => goalTokenColor === token
  )?.[0];

  return goalCoord === tokenCoord;
};
