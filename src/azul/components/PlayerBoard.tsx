import { Box, Flex } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';
import { type MutableRefObject, type RefObject, useRef, useState } from 'react';

import { EMPTY } from '../constants/board';
import { type Player } from '../services/player';
import {
  type Pile,
  type PlayedToken,
  type Token as TokenType,
} from '../types/board';

import { Board } from './Board';
import { Graveyard } from './Graveyard';
import { Token } from './Token';

interface Props {
  player: Player;
  expanded: boolean;
  selectedTokenState: Pile | undefined;
  coasterRefs: MutableRefObject<
    Record<string, RefObject<HTMLDivElement | null>>
  >;
}

const WIDTH = 772;
const HEIGHT = 456;

function getShadowTokens(params: {
  selectedToken: TokenType | typeof EMPTY;
  row: Array<TokenType | typeof EMPTY | null>;
  numTokens: number;
}) {
  const { selectedToken, row, numTokens } = params;
  if (selectedToken === EMPTY || row.length === 0) {
    return [];
  }
  const emptySlots = row.filter((value) => value === EMPTY);

  if (emptySlots.length < numTokens) {
    return Array.from(
      { length: numTokens - emptySlots.length },
      () => selectedToken,
    );
  }
  return [];
}

const GRAVEYARD_IDX = 5;

export function PlayerBoard({
  player,
  expanded,
  selectedTokenState,
  coasterRefs,
}: Props) {
  const { tokens = [] } = selectedTokenState ?? {};
  const numTokens = tokens.length;
  const selectedToken = numTokens ? tokens[0].token : EMPTY;
  const tokenRefs = useRef<Array<Array<HTMLDivElement>>>([]);
  const [playingTokens, setPlayingTokens] = useState<Array<PlayedToken>>([]);
  const [hoveringRow, setHoveringRow] = useState(-1);
  const shadowTokens = getShadowTokens({
    selectedToken,
    row: player.board[hoveringRow] ?? [],
    numTokens,
  });
  const playTokens = (rowIdx: number) => {
    const rowRefs = tokenRefs.current[rowIdx] ?? [];
    const row = player.board[hoveringRow] ?? [];

    if (!rowRefs.length || !row.length || !selectedTokenState) {
      return;
    }
    // setPlayingTokens(selectedTokenState.tokens.map(({ position: startingPosition, ...token}) => ({
    //   ...token,
    //   startingPosition,
    //   position:
    // })))
    console.log(shadowTokens, selectedTokenState);
  };
  return (
    <MotionBox
      display="flex"
      flexDirection="column"
      key={player.name}
      style={{
        width: expanded ? WIDTH : WIDTH / 2,
        height: expanded ? HEIGHT : HEIGHT / 2,
      }}
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
            onHover={setHoveringRow}
            renderItem={(token, { idx, rowIdx }) => {
              const showShadow = hoveringRow === rowIdx && 4 - idx < numTokens;

              return token ? (
                <Token
                  ref={(node) => {
                    if (node) {
                      tokenRefs.current[rowIdx] =
                        tokenRefs.current[rowIdx] ?? [];
                      tokenRefs.current[rowIdx][idx] = node;
                    }
                  }}
                  onClick={() => playTokens(rowIdx)}
                  tokenColor={showShadow ? selectedToken : token}
                />
              ) : null;
            }}
            items={player.board}
          >
            {/* {playingTokens.length > 0 && 
              <AnimateTokens
                tokensToAnimate={playingTokens}
                coasterRefs={coasterRefs}
                
              />
            } */}
          </Board>
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
        <Graveyard
          addRef={(idx, node) => {
            tokenRefs.current[GRAVEYARD_IDX] =
              tokenRefs.current[GRAVEYARD_IDX] ?? [];
            tokenRefs.current[GRAVEYARD_IDX][idx] = node;
          }}
          shadowTokens={shadowTokens}
          points={player.graveyard}
        />
      </MotionBox>
    </MotionBox>
  );
}
