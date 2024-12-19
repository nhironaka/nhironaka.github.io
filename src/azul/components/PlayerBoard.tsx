import { Box, Flex } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';

import { type EMPTY } from '../constants/board';
import { type Player } from '../services/player';
import type { Token as TokenType } from '../types/board';

import { Board } from './Board';
import { Graveyard } from './Graveyard';
import { Token } from './Token';

interface Props {
  player: Player;
  expanded: boolean;
  selectedToken: TokenType | typeof EMPTY;
  numTokens: number;
}

const WIDTH = 770;

export function PlayerBoard({
  player,
  expanded,
  selectedToken,
  numTokens,
}: Props) {
  return (
    <MotionBox
      display="flex"
      flexDirection="column"
      key={player.name}
      width={expanded ? WIDTH : WIDTH / 2}
    >
      <Box color="dustyTeal.800">{player.name}</Box>

      <MotionBox
        display="flex"
        flexDirection="column"
        gap="2"
        boxShadow="md"
        borderRadius="md"
        bg="gunmetalBlue.800"
        width="max-content"
        p="4"
        cursor="pointer"
        transformOrigin="top left"
        initial="false"
        animate={String(expanded)}
        variants={{
          false: { transform: 'scale(50%)' },
          true: { transform: 'scale(100%)' },
        }}
      >
        <Flex flexWrap="nowrap" gap="76px">
          <Board
            renderItem={(token, { hovering, idx }) => {
              const showShadow = hovering && 5 - idx < numTokens;

              return token ? (
                <Token tokenColor={showShadow ? selectedToken : token} />
              ) : null;
            }}
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
