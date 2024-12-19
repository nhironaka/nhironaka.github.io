import { Box, Circle, Flex } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';
import { type RefObject, useCallback, useRef, useState } from 'react';

import { Coaster } from './components/Coaster';
import { PlayerBoard } from './components/PlayerBoard';
import { Token } from './components/Token';
import { EMPTY, PILE_RADIUS } from './constants/board';
import { arrangeItemsInCircle, getRelativePosition } from './helpers/placement';
import { useEvent } from './hooks/useEvent';
import { BoardState } from './services/board';
import {
  type DiscardedToken,
  type Pile,
  type Token as TokenType,
} from './types/board';
/*
(
    <div>
      <div
        ref={sourceRef}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "blue",
          position: "absolute",
          left: "50px",
          top: "50px",
        }}
      >
        <button onClick={flyToTarget} style={{ color: "white" }}>
          Fly
        </button>
      </div>

      <div
        ref={targetRef}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "green",
          position: "absolute",
          left: "300px",
          top: "200px",
        }}
      />

      
    </div>
  )
  */

export function Game() {
  const discardPileRef = useRef<HTMLDivElement>(null);
  const coasterRefs = useRef<Record<string, RefObject<HTMLDivElement | null>>>(
    {},
  );
  const [selectedToken, setSelectedToken] = useState<{
    pileId: string;
    token: TokenType | typeof EMPTY;
    numTokens: number;
  }>({ pileId: '', token: EMPTY, numTokens: 0 });
  const { addListener, dispatch } = useEvent<string>();
  const [game] = useState(new BoardState(4));
  const [discardedTokens, setDiscardedTokens] = useState<Array<DiscardedToken>>(
    [],
  );
  const [activePlayer] = useState(0);
  const placement = arrangeItemsInCircle({
    n: game.piles.length,
    radius: 400,
    width: PILE_RADIUS * 2,
    height: PILE_RADIUS * 2,
  });

  const returnTokens = (pile: Pile, selectedToken: TokenType) => {
    const { id } = pile;
    const discardedTokens = game.returnTokens({
      pile,
    });
    console.log(discardedTokens);
    setDiscardedTokens((prev) =>
      prev.map(({ startingPosition, ...rest }) => rest).concat(discardedTokens),
    );
    setSelectedToken({
      pileId: id,
      token: selectedToken,
      numTokens: pile.tokens.length - discardedTokens.length,
    });
  };

  const addRef = useCallback(
    (id: string, ref: RefObject<HTMLDivElement | null>) => {
      const { current } = coasterRefs;
      current[id] = ref;

      return () => {
        delete current[id];
      };
    },
    [],
  );

  return (
    <Flex p="4" width="full" height="full" overflow="auto" flexWrap="wrap">
      <Box width="50%" height="full">
        <Flex position="relative" width="800px" height="800px">
          <Box position="absolute" top="250px" left="250px">
            <Circle
              ref={discardPileRef}
              position="relative"
              width="300px"
              height="300px"
              bg="gray.50"
            >
              {discardedTokens.map(
                ({ position, startingPosition, token, pileId }, idx) => {
                  const { x: relativeX, y: relativeY } = getRelativePosition(
                    discardPileRef.current,
                    coasterRefs.current[pileId].current,
                  );
                  return startingPosition ? (
                    <MotionBox
                      key={idx}
                      initial={{
                        x: startingPosition.x - relativeX,
                        y: startingPosition.y - relativeY,
                      }}
                      animate={{ x: position.x, y: position.y }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                      onAnimationStart={() => {
                        const { pileId, token } = selectedToken;
                        dispatch(pileId, token);
                        console.log(startingPosition, position);
                      }}
                    >
                      <Token tokenColor={token} />
                    </MotionBox>
                  ) : (
                    <Token
                      key={idx}
                      position="absolute"
                      tokenColor={token}
                      style={{ top: position.y, left: position.x }}
                    />
                  );
                },
              )}
            </Circle>
          </Box>
          {placement.map(({ position: { x, y } }, idx) => (
            <Box key={idx} position="absolute" style={{ left: x, top: y }}>
              <Coaster
                addRef={addRef}
                addEventListener={addListener}
                returnTokens={returnTokens}
                key={idx}
                pile={game.piles[idx]}
              />
            </Box>
          ))}
        </Flex>
      </Box>
      <Flex flexDirection="column" width="50%" gap="2" height="full">
        {game.players.map((player, idx) => (
          <PlayerBoard
            selectedToken={idx === activePlayer ? selectedToken.token : EMPTY}
            numTokens={selectedToken.numTokens}
            key={player.name}
            expanded={idx === activePlayer}
            player={player}
          />
        ))}
      </Flex>
    </Flex>
  );
}
