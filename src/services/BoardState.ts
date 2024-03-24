import { CellState } from '@services/CellState';
import { Randomizer } from '@services/randomizer';
import {
  difficultyConfigs,
  difficultyTypes,
  wallConfigs,
} from '@shared/constants';
import { coord } from '@shared/helpers';
import { Difficulty, WallConfig } from '@shared/types';

export const DEFAULT_GRID_COUNT = 20;

export class BoardState {
  public cells: Array<Array<CellState>>;
  public difficulty: Difficulty;

  constructor(
    gridSize = DEFAULT_GRID_COUNT,
    difficulty: Difficulty = difficultyTypes.EASY,
  ) {
    this.difficulty = difficulty;
    const boardCenter = getBoardCenter(gridSize);
    const difficultyConfig = { ...difficultyConfigs[difficulty] };
    const numConfiguredCells = Object.values(difficultyConfig).reduce(
      (acc, val) => acc + val,
      0,
    );
    const flatBoard = generateMatrix(
      gridSize,
      (row, column) => coord`${[row, column]}`,
    )
      .flat()
      .filter((xy) => {
        const [row, column] = xy.split(', ').map(Number);
        return !isEdge(row, column, gridSize) && !boardCenter.includes(xy);
      });
    const randomCellSelector = new Randomizer(flatBoard, numConfiguredCells);
    const configuredCells = randomCellSelector.all();

    this.cells = generateMatrix(gridSize, (row, column) => {
      const isConfigured = configuredCells.includes(coord`${[row, column]}`);
      const isCenter = boardCenter.includes(coord`${[row, column]}`);
      const wallConfig = isCenter
        ? wallConfigs.ALL
        : isConfigured
          ? getRandomDifficulty(difficultyConfig)
          : wallConfigs.NONE;
      return new CellState(row, column, wallConfig);
    });
  }
}

/* ----- Helpers ----- */

const getBoardCenter = (gridSize: number) => {
  const gridCenter = Math.floor(gridSize / 2);
  const boardCenter = [`${gridCenter},${gridCenter}`];

  if (gridSize % 2 === 0) {
    boardCenter.push(
      coord`${[gridCenter - 1, gridCenter]}`,
      coord`${[gridCenter, gridCenter - 1]}`,
      coord`${[gridCenter - 1, gridCenter - 1]}`,
    );
  }

  return boardCenter;
};

const generateMatrix = <T>(
  gridSize: number,
  output: (row: number, column: number) => T,
) => {
  return new Array(gridSize).fill('').map((_, row) => {
    return new Array(gridSize).fill('').map((_, column) => {
      return output(row, column);
    });
  });
};
const isEdge = (row: number, column: number, gridSize: number) => {
  return (
    row === 0 || column === 0 || row === gridSize - 1 || column === gridSize - 1
  );
};
const getRandomDifficulty = (
  difficultyConfig: Partial<Record<WallConfig, number>>,
) => {
  let wallConfig =
    Math.random() < 0.5 ? wallConfigs.SINGLE : wallConfigs.CORNER;
  let remainingCount = difficultyConfig[wallConfig];
  if (typeof remainingCount === 'number' && remainingCount > 0) {
    difficultyConfig[wallConfig] = remainingCount - 1;

    return wallConfig;
  }

  wallConfig =
    wallConfig === wallConfigs.SINGLE ? wallConfigs.CORNER : wallConfigs.SINGLE;

  remainingCount = difficultyConfig[wallConfig];
  if (typeof remainingCount === 'number' && remainingCount > 0) {
    difficultyConfig[wallConfig] = remainingCount - 1;

    return wallConfig;
  }

  return wallConfigs.NONE;
};
