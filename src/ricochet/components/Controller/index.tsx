import { PLAYERS } from '@shared/constants';
import type { Player } from '@shared/types';
import { Flex } from '@styled/jsx';
import { Button } from '@ui/Button';
import { Divider, Text } from '@ui/index';

interface Props {
  numMoves: number;
  activePlayer: Player;
  atGoal: Record<Player, boolean>;
  switchPlayer(player: Player): void;
  onSubmit?(): void;
  undo?(): void;
}

export function Controller({
  undo,
  onSubmit,
  switchPlayer,
  atGoal,
  activePlayer,
  numMoves,
}: Props) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      gap="2"
      px={{ base: '2', lg: '6' }}
      width="full"
      className="controller"
    >
      <Flex
        width="full"
        justifyContent="space-between"
        gap="4"
        alignItems="center"
      >
        <Text>{`Current player: ${activePlayer}`}</Text>
        <Text>{`${numMoves} moves`}</Text>
      </Flex>

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
      <Divider my="4" />

      <Flex
        display="flex"
        width="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={() => {
            switchPlayer(PLAYERS.ONE);
          }}
        >
          {atGoal[PLAYERS.ONE] ? 'Confirm player 1' : 'Switch to player 1'}
        </Button>
        <Button
          onClick={() => {
            switchPlayer(PLAYERS.TWO);
          }}
        >
          {atGoal[PLAYERS.TWO] ? 'Confirm player 2' : 'Switch to player 2'}
        </Button>
      </Flex>
    </Flex>
  );
}
