import { useRefDimensions } from '@shared/hooks/useRefDimensions';
import { Box, Flex } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';
import {
  type MutableRefObject,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { EMPTY } from '../constants/board';
import { type Player } from '../services/player';
import {
  type Pile,
  type PlayedToken,
  type Token as TokenType,
} from '../types/board';

import { AnimateTokens } from './AnimateTokens';
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
  finishTurn(): void;
}

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
  finishTurn,
}: Props) {
  const [animationEnded, setAnimationEnded] = useState(false);
  const { tokens = [], id: pileId } = selectedTokenState ?? {};
  const numTokens = tokens.length;
  const selectedToken = numTokens ? tokens[0].token : EMPTY;
  const { ref, boundingClientRect } = useRefDimensions<HTMLDivElement>();
  const boardRef = useRef<HTMLDivElement>(null);
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

    if (!rowRefs.length || !row.length || !selectedTokenState || !pileId) {
      return;
    }
    const emptySlots = row.reduce((acc, token, idx) => {
      if (token === EMPTY) {
        acc.push(rowRefs[idx]);
      }
      return acc;
    }, new Array<HTMLDivElement>());
    setPlayingTokens(
      selectedTokenState.tokens.map(
        ({ position: startingPosition, token }, idx) => {
          const slot = emptySlots[idx];
          const { x, y } = slot.getBoundingClientRect();
          return {
            pileId,
            token,
            width: 60,
            height: 60,
            startingPosition,
            position: {
              x,
              y,
            },
          };
        },
      ),
    );
  };

  useEffect(() => {
    if (animationEnded && playingTokens.length) {
      player.playToken({
        hoveringRow,
        shadowTokens,
        playingTokens,
      });
      setPlayingTokens([]);
      finishTurn();
      setAnimationEnded(false);
    }
  }, [
    animationEnded,
    finishTurn,
    hoveringRow,
    player,
    playingTokens,
    shadowTokens,
  ]);

  return (
    <MotionBox
      display="flex"
      flexDirection="column"
      key={player.name}
      width={expanded ? 'full' : '50%'}
    >
      <Box color="dustyTeal.800">{player.name}</Box>
      <MotionBox
        style={{
          height: expanded ? 'auto' : boundingClientRect?.height,
        }}
      >
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
          ref={ref}
        >
          <Flex flexWrap="nowrap" gap="76px">
            <Board
              boardRef={boardRef}
              onHover={setHoveringRow}
              renderItem={(token, { idx, rowIdx }) => {
                const showShadow =
                  hoveringRow === rowIdx && 4 - idx < numTokens;

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
              <AnimateTokens
                tokensToAnimate={playingTokens}
                coasterRefs={coasterRefs}
                destinationElement={boardRef.current}
                onAnimationComplete={() => {
                  setAnimationEnded(true);
                }}
              />
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
    </MotionBox>
  );
}
