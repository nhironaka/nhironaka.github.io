import { Box, Flex } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';
import { Player } from '../services/player';
import { Board } from './Board';
import { Graveyard } from './Graveyard';
import { Token } from './Token';

interface Props {
  player: Player;
  expanded: boolean;
  toggleSize(playerName: string): void;
}

const WIDTH = 704;

export function PlayerBoard({ player, expanded: expanded, toggleSize }: Props) {
  return (
    <MotionBox
      display="flex"
      flexDirection="column"
      boxShadow="md"
      key={player.name}
      width={expanded ? WIDTH : WIDTH / 2}
    >
      <Box color="dustyTeal.800">{player.name}</Box>

      <MotionBox
        display="flex"
        flexDirection="column"
        gap="2"
        borderRadius="md"
        bg="gunmetalBlue.800"
        width="max-content"
        p="4"
        cursor="pointer"
        transformOrigin="top left"
        animate={String(expanded)}
        variants={{
          false: { transform: 'scale(50%)' },
          true: { transform: 'scale(100%)' },
        }}
        onClick={() => {
          toggleSize(expanded ? '' : player.name);
        }}
      >
        <Flex flexWrap="nowrap" gap="2">
          <Board
            renderItem={(token) =>
              token ? <Token tokenColor={token} /> : null
            }
            items={player.board}
          />
          <Board
            renderItem={({ token, played }) => (
              <Flex position="relative">
                <Token tokenColor="empty" />
                <Token
                  position="absolute"
                  left="0"
                  top="0"
                  tokenColor={token}
                  opacity={played ? undefined : '50%'}
                />
              </Flex>
            )}
            items={player.played}
          />
        </Flex>
        <Graveyard points={player.graveyard} />
      </MotionBox>
    </MotionBox>
  );
}
