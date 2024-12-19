import { DIRECTIONS } from '@shared/constants/ui';
import { coord, generateMatrix } from '@shared/helpers/grid';
import type { Direction } from '@shared/types/ui';

import { Randomizer } from '../../shared/services/randomizer';
import {
  DIFFICULTY_CONFIGS,
  DIFFICULTY_TYPES,
  WALL_CONFIGS,
} from '../constants/board';
import { fromCoord } from '../helpers';
import {
  allowedDirection,
  getBoardCenter,
  getInitialTokenState,
  getRandomDifficulty,
  getSurroundingCells,
  isBoardEdge,
  stoppedByCell,
} from '../helpers/board';
import type { Coord, Difficulty, Token } from '../types/board';

import { CellState } from './CellState';

export const DEFAULT_GRID_COUNT = 20;

const TO_DIRECTION = {
  [DIRECTIONS.TOP]: { x: -1, y: 0 },
  [DIRECTIONS.BOTTOM]: { x: 1, y: 0 },
  [DIRECTIONS.LEFT]: { x: 0, y: -1 },
  [DIRECTIONS.RIGHT]: { x: 0, y: 1 },
};

export class BoardState {
  public cells: Array<Array<CellState>>;
  public difficulty: Difficulty;
  public configedCells: Record<string, CellState>;

  constructor(
    gridSize = DEFAULT_GRID_COUNT,
    difficulty: Difficulty = DIFFICULTY_TYPES.EASY,
  ) {
    this.configedCells = {};
    this.difficulty = difficulty;

    this.cells = this.generateCells(gridSize);
  }

  generateCells(gridSize: number) {
    const boardCenter = getBoardCenter(gridSize);
    const difficultyConfig = { ...DIFFICULTY_CONFIGS[this.difficulty] };
    const numConfiguredCells = Object.values(difficultyConfig).reduce(
      (acc, val) => acc + val,
      0,
    );
    const initialTokenState = getInitialTokenState(gridSize);
    const startingPositions = Object.values(initialTokenState).map(
      (xy) => coord`${xy}`,
    );
    const surroundingCells = getSurroundingCells(boardCenter, gridSize);
    const flatBoard = generateMatrix(
      gridSize,
      (row, column) => coord`${[row, column]}`,
    )
      .flat()
      .filter((xy) => {
        const [row, column] = fromCoord(xy);
        const boardEdge = isBoardEdge({ row, column, gridSize }) || [];

        return (
          boardEdge.length < 2 &&
          !surroundingCells.includes(xy) &&
          !startingPositions.includes(xy)
        );
      });
    const randomCellSelector = new Randomizer(flatBoard, numConfiguredCells);
    const configuredCells = randomCellSelector.all();

    return generateMatrix(gridSize, (row, column) => {
      const strCoord = coord`${[row, column]}`;
      const isConfigured = configuredCells.includes(strCoord);
      const isCenter = boardCenter.includes(strCoord);

      const wallConfig = isCenter
        ? WALL_CONFIGS.ALL
        : isConfigured
          ? getRandomDifficulty(difficultyConfig)
          : WALL_CONFIGS.NONE;

      const cell = new CellState({
        x: row,
        y: column,
        wallConfig,
        gridSize,
      });

      if (isConfigured || isCenter) {
        this.configedCells[strCoord] = cell;
      }

      return cell;
    });
  }

  inBounds([row, column]: Coord) {
    return (
      row >= 0 &&
      column >= 0 &&
      row < this.cells.length &&
      column < this.cells[0].length
    );
  }

  getAdjacentCells(coord: Coord) {
    const [x, y] = coord;
    const {
      [DIRECTIONS.TOP]: { x: topX, y: topY },
      [DIRECTIONS.BOTTOM]: { x: bottomX, y: bottomY },
      [DIRECTIONS.LEFT]: { x: leftX, y: leftY },
      [DIRECTIONS.RIGHT]: { x: rightX, y: rightY },
    } = TO_DIRECTION;
    return Object.entries({
      [DIRECTIONS.TOP]: [x + topX, y + topY],
      [DIRECTIONS.BOTTOM]: [x + bottomX, y + bottomY],
      [DIRECTIONS.LEFT]: [x + leftX, y + leftY],
      [DIRECTIONS.RIGHT]: [x + rightX, y + rightY],
    })
      .filter(([_, coord]) => this.inBounds(coord as Coord))
      .reduce(
        (acc, [direction, [row, column]]) => {
          acc[direction as Direction] = this.cells[row][column];

          return acc;
        },
        {} as Record<Direction, CellState>,
      );
  }

  getBlockingCoord(
    xy: Coord,
    direction: Direction,
    tokenState: Record<Token, Coord>,
  ): Coord {
    const [x, y] = xy;
    const { x: x1, y: y1 } = TO_DIRECTION[direction];
    const tokens = Object.values(tokenState).map((xy) => coord`${xy}`);
    const adjacentCoord: Coord = [x + x1, y + y1];
    const adjCoordString = coord`${adjacentCoord}`;

    if (tokens.includes(adjCoordString)) {
      return xy;
    }

    const configuredCell = this.configedCells[adjCoordString];
    const blockedByNextCell =
      configuredCell && stoppedByCell(configuredCell, direction);

    if (this.inBounds(adjacentCoord) && blockedByNextCell) {
      return adjacentCoord;
    }
    const validNextMove =
      !configuredCell || allowedDirection(configuredCell, direction);

    if (this.inBounds(adjacentCoord) && validNextMove) {
      return this.getBlockingCoord(adjacentCoord, direction, tokenState);
    }

    return xy;
  }
}
