import {
  ArrowDownCircleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/solid';
import type { Dispatch, SetStateAction } from 'react';

import { DIRECTIONS } from '@shared/constants/ui';
import type { Direction } from '@shared/types/ui';
import { Box, Flex } from '@styled/jsx';
import { Button } from '@ui/Button';
import { allowedDirection } from '../../helpers/board';
import type { BoardState } from '../../services/BoardState';
import type { CellState } from '../../services/CellState';
import type { Coord, Token } from '../../types/board';

interface Props {
  coord: Coord;
  board: BoardState;
  token: Token;
  tokenState: Record<Token, Coord>;
  setTokenState: Dispatch<SetStateAction<Record<Token, Coord>>>;
}

export function CellAction({
  coord,
  board,
  token,
  tokenState,
  setTokenState,
}: Props) {
  const getAllowedDirections = () => {
    const adjacentCells = board.getAdjacentCells(coord);

    return (Object.entries(adjacentCells) as Array<[Direction, CellState]>)
      .filter(([direction, adjCell]) => {
        return allowedDirection(adjCell, direction);
      })
      .reduce(
        (acc, [direction]) => {
          acc[direction] = true;

          return acc;
        },
        {} as Record<Direction, boolean>,
      );
  };
  const allowedDirections = getAllowedDirections();
  const onClick = (direction: Direction) => {
    const blockingCoord = board.getBlockingCoord(coord, direction, tokenState);
    setTokenState((prev) => ({
      ...prev,
      [token]: blockingCoord,
    }));
  };

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Button
        buttonStyle="text"
        buttonSize="lg"
        onClick={() => onClick(DIRECTIONS.TOP)}
        disabled={!allowedDirections.top}
      >
        <Box height="6" width="6" color="violet.600" fontSize="lg">
          <ArrowUpCircleIcon />
        </Box>
      </Button>

      <Flex gap="2" alignItems="center" justifyContent="center">
        <Button
          buttonStyle="text"
          buttonSize="lg"
          onClick={() => onClick(DIRECTIONS.LEFT)}
          disabled={!allowedDirections.left}
        >
          <Box height="6" width="6" color="violet.600" fontSize="lg">
            <ArrowLeftCircleIcon />
          </Box>
        </Button>
        <Button
          buttonStyle="text"
          buttonSize="lg"
          onClick={() => onClick(DIRECTIONS.RIGHT)}
          disabled={!allowedDirections.right}
        >
          <Box height="6" width="6" color="violet.600" fontSize="lg">
            <ArrowRightCircleIcon />
          </Box>
        </Button>
      </Flex>
      <Button
        buttonStyle="text"
        buttonSize="lg"
        onClick={() => onClick(DIRECTIONS.BOTTOM)}
        disabled={!allowedDirections.bottom}
      >
        <Box height="6" width="6" color="violet.600" fontSize="lg">
          <ArrowDownCircleIcon />
        </Box>
      </Button>
    </Flex>
  );
}
