import { DIRECTIONS } from '@shared/constants/ui';
import type { Direction } from '@shared/types/ui';
import { Box, styled } from '@styled/jsx';
import classNames from 'classnames';

interface Props {
  direction: Direction;
}

const StyledWall = styled(Box, {
  base: {
    borderRadius: { base: 'sm', lg: 'md' },
    position: 'absolute',
    bg: 'amber.900',
  },
  variants: {
    wallDirection: {
      vertical: {
        height: { base: '0.5', lg: '3px' },
        width: 'full',
      },
      horizontal: {
        width: { base: '0.5', lg: '3px' },
        height: 'full',
      },
    },
  },
});

const VERTICAL: Array<Direction> = [DIRECTIONS.TOP, DIRECTIONS.BOTTOM];

export const Wall = ({ direction }: Props) => {
  return (
    <StyledWall
      position="absolute"
      bg="amber.900"
      className={classNames('wall', direction)}
      wallDirection={VERTICAL.includes(direction) ? 'vertical' : 'horizontal'}
      top={direction === DIRECTIONS.BOTTOM ? undefined : 0}
      bottom={direction === DIRECTIONS.BOTTOM ? 0 : undefined}
      left={direction === DIRECTIONS.RIGHT ? undefined : 0}
      right={direction === DIRECTIONS.RIGHT ? 0 : undefined}
    />
  );
};
