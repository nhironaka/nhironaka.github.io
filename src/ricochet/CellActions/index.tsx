import {
  ArrowDownCircleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/solid';
import type { Dispatch, SetStateAction } from 'react';

import { Box, Flex, Text } from '@components/ui';
import { Button } from '@components/ui/Button';
import type { BoardState } from '@services/BoardState';
import type { CellState } from '@services/CellState';
import { DIRECTIONS } from '@shared/constants';
import { allowedDirection } from '@shared/helpers/board';
import type { Coord, Direction, Token } from '@shared/types/board';

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
    <Flex flexDirection="column">
      <Box textAlign="center">
        <Button
          buttonStyle="text"
          buttonSize="lg"
          onClick={() => onClick(DIRECTIONS.TOP)}
          disabled={!allowedDirections.top}
        >
          <Text color="board-focus" fontSize="lg">
            <ArrowUpCircleIcon />
          </Text>
        </Button>
      </Box>

      <Flex gap="2">
        <Button
          buttonStyle="text"
          buttonSize="lg"
          onClick={() => onClick(DIRECTIONS.LEFT)}
          disabled={!allowedDirections.left}
        >
          <Text color="board-focus" fontSize="lg">
            <ArrowLeftCircleIcon />
          </Text>
        </Button>
        <Button
          buttonStyle="text"
          buttonSize="lg"
          onClick={() => onClick(DIRECTIONS.RIGHT)}
          disabled={!allowedDirections.right}
        >
          <Text color="board-focus" fontSize="lg">
            <ArrowRightCircleIcon />
          </Text>
        </Button>
      </Flex>
      <Box textAlign="center">
        <Button
          buttonStyle="text"
          buttonSize="lg"
          onClick={() => onClick(DIRECTIONS.BOTTOM)}
          disabled={!allowedDirections.bottom}
        >
          <Text color="board-focus" fontSize="lg">
            <ArrowDownCircleIcon />
          </Text>
        </Button>
      </Box>
    </Flex>
  );
}
