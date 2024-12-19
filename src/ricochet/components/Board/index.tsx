import { coord } from '@shared/helpers/grid';
import { Box, Flex, Grid } from '@styled/jsx';
import { token } from '@styled/tokens';
import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { TOKENS } from '../../constants/board';
import { type BoardState } from '../../services/BoardState';
import type { GoalState, Token, TokenState } from '../../types/board';
import { ActiveToken } from '../ActiveToken';
import { Cell } from '../Cell';

interface Props {
  activePlayer: number;
  gridSize: number;
  goalState: GoalState;
  shadowTokenState: Record<string, Token>;
  tokenState: TokenState;
  board: BoardState;
  setTokenState: Dispatch<SetStateAction<TokenState>>;
}

export function Board({
  board,
  goalState,
  shadowTokenState,
  tokenState,
  setTokenState,
  gridSize,
}: Props) {
  const [rendered, setRendered] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setRendered(true);
  }, []);

  return (
    <Box
      width="full"
      height="full"
      borderRadius="md"
      position="relative"
      overflow="auto"
      className="board"
    >
      <Flex
        flexDirection="column"
        bg="amber.900"
        borderRadius={{ base: 'sm', lg: 'md' }}
        borderColor="amber.900"
        border="1px solid"
        gap="1px"
        ref={boardRef}
      >
        {board.cells.map((columns, idx) => {
          return (
            <Grid
              key={idx}
              gap="1px"
              borderRadius={{ base: 'sm', lg: 'md' }}
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minMax(${token('spacing.1')}, 1fr))`,
              }}
            >
              {columns.map((cell) => {
                const xy = coord`${[cell.x, cell.y]}`;
                const goalToken = goalState[xy];
                const shadowToken = shadowTokenState[xy];
                return (
                  <Cell
                    key={xy}
                    cell={cell}
                    shadowToken={shadowToken}
                    goalToken={goalToken}
                  />
                );
              })}
            </Grid>
          );
        })}
      </Flex>
      {rendered &&
        Object.values(TOKENS).map((token) => {
          const coordinates = coord`${tokenState[token]}`;

          const cell = board.cells
            .flatMap((cells) => cells)
            .find(({ x, y }) => coord`${[x, y]}` === coordinates);

          if (!cell) {
            throw new Error(`No cell for token at ${coordinates}`);
          }

          return (
            <ActiveToken
              key={token}
              cell={cell}
              token={token}
              board={board}
              boardRef={boardRef.current}
              tokenState={tokenState}
              setTokenState={setTokenState}
            />
          );
        })}
    </Box>
  );
}
