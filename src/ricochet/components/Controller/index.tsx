import { useMediaQuery } from '@shared/hooks/useMediaQueries';
import { Button } from '@ui/Button';
import { Divider, Flex, Text } from '@ui/index';
import { PLAYERS } from '../../constants/board';
import type { Player } from '../../types/board';

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
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      gap="2"
      px={isDesktop ? '6' : '2'}
      width="full"
      cursor="pointer"
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
