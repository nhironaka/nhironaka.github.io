import { type DIRECTIONS, type floatingStates } from '../constants/ui';
import { type ConstValues } from './utils';

export type FloatingState = ConstValues<typeof floatingStates>;
export type Direction = ConstValues<typeof DIRECTIONS>;
