import { COORD_DELIMITER } from '@shared/constants';
import { type Coord } from '../types/board';

export function fromCoord(xy: string): Coord {
  return xy.split(COORD_DELIMITER).map((str) => +str) as Coord;
}

export const getRandomInt = (max: number, min = 0) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};
