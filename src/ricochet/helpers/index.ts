import { COORD_DELIMITER } from '@shared/constants';

import { type Coord } from '../types/board';

export function fromCoord(xy: string): Coord {
  return xy.split(COORD_DELIMITER).map((str) => +str) as Coord;
}
