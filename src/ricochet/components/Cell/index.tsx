import { coord } from '@shared/helpers/grid';
import { Box } from '@styled/jsx';
import { Square } from '@ui/Square';

import { WALL_CONFIGS } from '../../constants/board';
import { getWallConfig } from '../../helpers/board';
import { type CellState } from '../../services/CellState';
import type {
  GoalToken as GoalTokenType,
  Token as TokenType,
} from '../../types/board';
import { GoalToken } from '../GoalToken';
import { Token } from '../Token';

import { Wall } from './Wall';

interface Props {
  cell: CellState;
  shadowToken?: TokenType;
  goalToken?: GoalTokenType;
}

export function Cell({ cell, goalToken, shadowToken }: Props) {
  const { x, y, wallConfig } = cell;
  const cellPos = coord`${[x, y]}`;
  const walls = getWallConfig({ cell });

  return (
    <Square
      data-key={cellPos}
      bg="amber.100"
      borderRadius={{ base: 'sm', lg: 'md' }}
      className="cell"
      {...((shadowToken || goalToken) && {
        'data-token': shadowToken || goalToken,
      })}
    >
      <Box
        width="full"
        p={{ base: '0.5', lg: '1' }}
        height="full"
        position="relative"
      >
        <Box
          width="full"
          height="full"
          borderRadius={{ base: 'sm', lg: 'md' }}
          position="relative"
          bg={wallConfig === WALL_CONFIGS.ALL ? 'amber.900' : undefined}
        >
          {walls.map((wall) => (
            <Wall key={wall} direction={wall} />
          ))}
        </Box>
        <Box
          p={{ base: '4px', lg: '6px' }}
          width="full"
          height="full"
          top="0"
          left="0"
          position="absolute"
        >
          <Box className="inner" width="full" height="full" position="relative">
            {shadowToken && (
              <Token
                opacity="50"
                position="absolute"
                top={{ base: '1px', md: '0.5' }}
                left={{ base: '1px', md: '0.5' }}
                token={shadowToken}
              />
            )}
            {goalToken && (
              <GoalToken
                position="absolute"
                top={{ base: '1px', md: '0.5' }}
                left={{ base: '1px', md: '0.5' }}
                token={goalToken}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Square>
  );
}
