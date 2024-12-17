import { coord } from '@shared/helpers/grid';
import { cva } from '@styled/css';
import { Circle } from '@styled/jsx';
import { Square, SquareProps } from '@ui/Motion';
import { Token } from '../types';

interface Props extends Omit<SquareProps, 'x' | 'y' | 'children'> {
  x: number;
  y: number;
  token: Token;
}

export const tokenRecipe = cva({
  variants: {
    token: {
      red: {
        bg: 'indigo.500',
      },
      black: {
        bg: 'emerald.500',
      },
    },
  },
});

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
