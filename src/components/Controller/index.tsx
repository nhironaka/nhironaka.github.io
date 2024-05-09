import { Flex, Text } from '@components/ui';
import { Button } from '@components/ui/Button';
import type { Player } from '@shared/types';

interface Props {
  numMoves: number;
  activePlayer: Player;
  onSubmit?(): void;
  undo?(): void;
}

export function Controller({ undo, onSubmit, activePlayer, numMoves }: Props) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      gap="1"
      px="6"
      width="full"
      cursor="pointer"
      className="controller"
    >
      <Text>{`Current player: ${activePlayer}`}</Text>
      <Text>{`${numMoves} moves`}</Text>

      <Flex
        width="full"
        justifyContent="space-between"
        gap="4"
        alignItems="center"
      >
        <Button onClick={undo}>Undo</Button>

        <Button onClick={onSubmit} disabled={!onSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
