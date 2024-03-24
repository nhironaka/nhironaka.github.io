import { Cell } from '@components/Cell';
import { BoardState, DEFAULT_GRID_COUNT } from '@services/BoardState';
import { difficultyTypes } from '@shared/constants';
import { coord } from '@shared/helpers';
import { Difficulty } from '@shared/types/board';
import { Box, Grid } from '@styles/jsx';
import { useState } from 'react';

interface Props {
  gridSize?: number;
  difficulty?: Difficulty;
}

export function Board({
  gridSize = DEFAULT_GRID_COUNT,
  difficulty = difficultyTypes.EASY,
}: Props) {
  const [board, setBoard] = useState(new BoardState(gridSize, difficulty));
  return (
    <Box width="100%" height="100%" padding="4" borderRadius="sm">
      <Grid
        width="100%"
        bg="bg.focus"
        gap="px"
        borderRadius="md"
        border="1px solid"
        borderColor="bg.focus"
      >
        {board.cells.map((row, idx) => {
          return (
            <Grid
              key={idx}
              gap="px"
              borderRadius="md"
              style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
              {row.map((cell) => {
                return <Cell key={coord`${[cell.x, cell.y]}`} cell={cell} />;
              })}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
