import { useState } from 'react';

import { Box, Flex } from '@components/ui';
import { Button } from '@components/ui/Button';
import type { Player } from '@shared/types';

interface Props {
  numMoves: number;
  activePlayer: Player;
  setActivePlayer(activePlayer: Player): void;
  onSubmit?(): void;
  undo?(): void;
  thisPlayer: Player;
}

export function Controller({
  undo,
  onSubmit,
  setActivePlayer,
  thisPlayer,
  activePlayer,
  numMoves,
}: Props) {
  const [submittedMoves, setSubmittedMoves] = useState(new Array<number>());
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      px="4"
      py="6"
      gap="6"
      height="full"
      cursor="pointer"
      onClick={() => setActivePlayer(thisPlayer)}
    >
      <Flex flexDirection="column" flexGrow="1" minHeight="0">
        {submittedMoves.map((num, idx) => {
          return (
            <Box key={idx}>
              {idx + 1}. {num} moves
            </Box>
          );
        })}
        {submittedMoves.length > 0 && (
          <Box
            display="block"
            borderTop="1px solid"
            borderTopColor="border.default"
          >
            Total moves:{' '}
            {submittedMoves.reduce((acc, numMoves) => acc + numMoves, 0)}
          </Box>
        )}
      </Flex>
      {activePlayer === thisPlayer && (
        <Box textAlign="center">Current moves: {numMoves}</Box>
      )}
      <Flex alignItems="center" gap="10" justifyContent="center">
        <Button onClick={undo} disabled={thisPlayer !== activePlayer || !undo}>
          Undo
        </Button>

        <Button
          onClick={() => {
            if (onSubmit) {
              onSubmit();
              setSubmittedMoves((prev) => prev.concat(numMoves));
            }
          }}
          disabled={thisPlayer !== activePlayer || !onSubmit}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
