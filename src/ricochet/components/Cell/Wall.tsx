import classNames from 'classnames';

import { Box } from '@ui/index';
import { DIRECTIONS } from '../../constants/board';
import type { Direction } from '../../types/board';

interface Props {
  direction: Direction;
}

export const Wall = ({ direction }: Props) => {
  return (
    <Box
      borderRadius="md"
      position="absolute"
      bg="bg.focus"
      data-log="true"
      className={classNames('wall', direction)}
      top={direction === DIRECTIONS.BOTTOM ? undefined : 0}
      bottom={direction === DIRECTIONS.BOTTOM ? 0 : undefined}
      left={direction === DIRECTIONS.RIGHT ? undefined : 0}
      right={direction === DIRECTIONS.RIGHT ? 0 : undefined}
    />
  );
};
