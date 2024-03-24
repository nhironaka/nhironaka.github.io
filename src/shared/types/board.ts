import {
  difficultyTypes,
  wallConfigs,
  wallTypes,
} from '@shared/constants/board';
import { ConstValues } from './utils';

export type Wall = ConstValues<typeof wallTypes>;

export type Difficulty = ConstValues<typeof difficultyTypes>;

export type WallConfig = ConstValues<typeof wallConfigs>;
