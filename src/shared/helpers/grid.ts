import { COORD_DELIMITER } from '@shared/constants';

export const generateMatrix = <T>(
  gridSize: number,
  output: (row: number, column: number) => T,
) => {
  return new Array(gridSize).fill('').map((_, row) => {
    return new Array(gridSize).fill('').map((_, column) => {
      return output(row, column);
    });
  });
};
export function coord(
  _strings: TemplateStringsArray,
  values: number[],
): string {
  return values.join(COORD_DELIMITER);
}
