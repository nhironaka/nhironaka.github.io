import { useState } from 'react';

import { Box, Flex, Text } from '@components/ui';
import { Button } from '@components/ui/Button';
import type { Player } from '@shared/types';

interface Props {
  numMoves: number;
  activePlayer: Player;
  onSubmit?(): void;
  undo?(): void;
}

export function Controller({ undo, onSubmit, activePlayer, numMoves }: Props) {
  const [submittedMoves, setSubmittedMoves] = useState(new Array<number>());
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      gap="6"
      px="6"
      width="full"
      cursor="pointer"
      className="controller"
    >
      <Text>{`Current player: ${activePlayer}. No. moves: ${numMoves}`}</Text>

      <Flex alignItems="center" gap="10">
        <Button onClick={undo}>Undo</Button>

        <Button
          onClick={() => {
            if (onSubmit) {
              onSubmit();
              setSubmittedMoves((prev) => prev.concat(numMoves));
            }
          }}
          disabled={!onSubmit}
        >
          Submit
        </Button>
      </Flex>
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
    </Flex>
  );
}
