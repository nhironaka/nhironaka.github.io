import { coord } from '@shared/helpers/grid';
import { Circle } from '@styled/jsx';
import { Square, type SquareProps } from '@ui/Motion';

import { tokenRecipe } from '../constants/recipes';
import { type Token } from '../types';

interface Props extends Omit<SquareProps, 'x' | 'y' | 'children'> {
  x: number;
  y: number;
  token: Token;
}

export function Cell({ x, y, token, ...rest }: Props) {
  const cellPos = coord`${[x, y]}`;

  return (
    <Square
      data-key={cellPos}
      {...(token && {
        'data-token': token,
      })}
      width="full"
      height="full"
      {...rest}
    >
      <Circle
        mx="auto"
        mt="10%"
        width="80%"
        height="80%"
        className={tokenRecipe({ token })}
      />
    </Square>
  );
}
