import { GoalToken } from '@components/GoalToken';
import { Box } from '@components/ui';
import { Square } from '@components/ui/Square';
import { type CellState } from '@services/CellState';
import { WALL_CONFIGS } from '@shared/constants/board';
import { coord } from '@shared/helpers';
import { getWallConfig } from '@shared/helpers/board';
import type {
  GoalToken as GoalTokenType,
  Token as TokenType,
} from '@shared/types';
import { Wall } from './Wall';

import { Token } from '@components/Token';
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

  return (
    <Square data-key={cellPos} bg="bg.hover" borderRadius="md" className="cell">
      <Box width="full" p="qtr" height="full" position="relative">
        <Box
          width="full"
          height="full"
          borderRadius="md"
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
