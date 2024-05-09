import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { ActiveToken } from '@components/ActiveToken';
import { type BoardState } from '@services/BoardState';
import { TOKENS } from '@shared/constants';
import { coord } from '@shared/helpers';
import { useMediaQuery } from '@shared/hooks/useMediaQueries';
import type { GoalState, Token, TokenState } from '@shared/types/board';
import { Cell } from '../Cell';
import { Box, Grid } from '../ui';

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
  const isDesktop = useMediaQuery('(min-width: 768px)');

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
      <Grid
        bg="bg.focus"
        borderRadius={isDesktop ? 'md' : 'sm'}
        borderColor="bg.focus"
        border="1px solid"
        gap="px"
        ref={boardRef}
      >
        {board.cells.map((columns, idx) => {
          return (
            <Grid
              key={idx}
              gap="px"
              borderRadius={isDesktop ? 'md' : 'sm'}
              gridTemplateColumns={`${gridSize}-1`}
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
      </Grid>
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
