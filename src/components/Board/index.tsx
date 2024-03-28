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

  useLayoutEffect(() => {
    setRendered(true);
  }, []);

  return (
    <Box
      width="full"
      height="full"
      p="4"
      borderRadius="md"
      position="relative"
      overflow="auto"
    >
      <Grid
        bg="bg.focus"
        borderRadius="md"
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
              borderRadius="md"
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
        Object.values(TOKENS).map((token) => (
          <ActiveToken
            key={token}
            token={token}
            board={board}
            boardRef={boardRef.current}
            tokenState={tokenState}
            setTokenState={setTokenState}
          />
        ))}
    </Box>
  );
}
