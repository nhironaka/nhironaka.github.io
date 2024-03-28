import { Box } from '@components/ui';
import { DIRECTIONS } from '@shared/constants/board';
import type { Direction } from '@shared/types';

interface Props {
  direction: Direction;
}

export const Wall = ({ direction }: Props) => {
  const height =
    direction === DIRECTIONS.TOP || direction === DIRECTIONS.BOTTOM
      ? 'qtr'
      : 'full';
  const width =
    direction === DIRECTIONS.TOP || direction === DIRECTIONS.BOTTOM
      ? 'full'
      : 'qtr';

  return (
    <Box
      borderRadius="md"
      position="absolute"
      bg="bg.focus"
      data-log="true"
      top={direction === DIRECTIONS.BOTTOM ? undefined : 0}
      bottom={direction === DIRECTIONS.BOTTOM ? 0 : undefined}
      left={direction === DIRECTIONS.RIGHT ? undefined : 0}
      right={direction === DIRECTIONS.RIGHT ? 0 : undefined}
      width={width}
      height={height}
    />
  );
};
