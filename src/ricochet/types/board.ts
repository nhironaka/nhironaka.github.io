import { type ConstValues } from '../../shared/types/utils';
import {
  type DIFFICULTY_TYPES,
  type DIRECTIONS,
  type GOAL_TOKENS,
  type PLAYERS,
  type TOKENS,
  type WALL_CONFIGS,
} from '../constants/board';

export type Direction = ConstValues<typeof DIRECTIONS>;

export type Token = ConstValues<typeof TOKENS>;

export type GoalToken = ConstValues<typeof GOAL_TOKENS>;

export type Difficulty = ConstValues<typeof DIFFICULTY_TYPES>;

export type WallConfig = ConstValues<typeof WALL_CONFIGS>;

export type Player = ConstValues<typeof PLAYERS>;

export type Coord = [x: number, y: number];

export type GoalState = Record<string, GoalToken>;

export type TokenState = Record<Token, Coord>;
