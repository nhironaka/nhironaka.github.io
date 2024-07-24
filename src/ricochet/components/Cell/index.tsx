import { useMediaQuery } from '@shared/hooks/useMediaQueries';
import { Box } from '@ui/index';
import { Square } from '@ui/Square';
import { WALL_CONFIGS } from '../../constants/board';
import { coord } from '../../helpers';
import { getWallConfig } from '../../helpers/board';
import { type CellState } from '../../services/CellState';
import type {
  GoalToken as GoalTokenType,
  Token as TokenType,
} from '../../types/board';
import { GoalToken } from '../GoalToken';
import { Token } from '../Token';
import { Wall } from './Wall';

import './cell.scss';

interface Props {
  cell: CellState;
  shadowToken?: TokenType;
  goalToken?: GoalTokenType;
}

export function Cell({ cell, goalToken, shadowToken }: Props) {
  const { x, y, wallConfig } = cell;
  const cellPos = coord`${[x, y]}`;
  const walls = getWallConfig({ cell });
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Square
      data-key={cellPos}
      bg="bg.hover"
      borderRadius={isDesktop ? 'md' : 'sm'}
      className="cell"
    >
      <Box
        width="full"
        p={isDesktop ? 'qtr' : 'px'}
        height="full"
        position="relative"
      >
        <Box
          width="full"
          height="full"
          borderRadius={isDesktop ? 'md' : 'sm'}
          position="relative"
          bg={wallConfig === WALL_CONFIGS.ALL ? 'bg.focus' : undefined}
        >
          {walls.map((wall) => (
            <Wall key={wall} direction={wall} />
          ))}
        </Box>
        <Box
          className="inner"
          width="full"
          height="full"
          top="0"
          left="0"
          position="absolute"
        >
          <Box width="full" height="full" position="relative">
            {shadowToken && (
              <Token
                opacity="50"
                position="absolute"
                top="0"
                left="0"
                width="full"
                height="full"
                token={shadowToken}
              />
            )}
            {goalToken && (
              <GoalToken
                position="absolute"
                top="0"
                left="0"
                width="full"
                height="full"
                token={goalToken}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Square>
  );
}
