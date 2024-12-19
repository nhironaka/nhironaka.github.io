import { coord } from '@shared/helpers/grid';
import { Square, type SquareProps } from '@ui/Motion';
import { motion } from 'framer-motion';

interface Props extends Omit<SquareProps, 'x' | 'y' | 'children'> {
  x: number;
  y: number;
  foreground: string;
}

export function EmptyCell({ x, y, className, foreground, ...rest }: Props) {
  const cellPos = coord`${[x, y]}`;

  return (
    <Square
      data-key={cellPos}
      textAlign="center"
      width="full"
      height="full"
      overflow="hidden"
      {...rest}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <mask id="cutout">
          <rect width="100" height="100" fill="white" />
          <circle cx="50" cy="50" r="40" fill="black" />
        </mask>
        <rect width="100" height="100" fill={foreground} mask="url(#cutout)" />
      </motion.svg>
    </Square>
  );
}
