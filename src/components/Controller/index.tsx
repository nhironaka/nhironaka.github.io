import { Divider, Flex, Text } from '@components/ui';
import { Button } from '@components/ui/Button';
import { PLAYERS } from '@shared/constants';
import { useMediaQuery } from '@shared/hooks/useMediaQueries';
import type { Player } from '@shared/types';

interface Props {
  numMoves: number;
  activePlayer: Player;
  atGoal: boolean;
  switchPlayer(player: Player): void;
  resetGame(): void;
  onSubmit?(): void;
  undo?(): void;
}

export function Controller({
  undo,
  onSubmit,
  resetGame,
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
          {atGoal ? 'Confirm player 1' : 'Switch to player 1'}
        </Button>
        <Button onClick={resetGame}>New game</Button>
        <Button
          onClick={() => {
            switchPlayer(PLAYERS.TWO);
          }}
        >
          {atGoal ? 'Confirm player 2' : 'Switch to player 2'}
        </Button>
      </Flex>
    </Flex>
  );
}
