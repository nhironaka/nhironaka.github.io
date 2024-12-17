import { Box, Circle, Flex } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';
import { useState } from 'react';
import { Coaster } from './components/Coaster';
import { PlayerBoard } from './components/PlayerBoard';
import { Token } from './components/Token';
import { PILE_RADIUS } from './constants/board';
import { arrangeItemsInCircle, PositionedElements } from './helpers/placement';
import { useEvent } from './hooks/useEvent';
import { useFlyingElement } from './hooks/useFlyingTarget';
import { BoardState } from './services/board';
import { Pile, Position, Token as TokenType } from './types/board';
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
  const { addListener } = useEvent();
  const [focusedBoard, setFocusedBoard] = useState('');
  const [game, setGame] = useState(new BoardState());
  const [discardedTokens, setDiscardedTokens] = useState<
    Array<
      PositionedElements & {
        startingPosition?: Position;
        token: TokenType;
      }
    >
  >([]);
  const [activePlayer, setActivePlayer] = useState(0);
  const placement = arrangeItemsInCircle({
    n: game.piles.length,
    radius: 400,
    width: PILE_RADIUS * 2,
    height: PILE_RADIUS * 2,
  });
  const { flyToTarget, isFlying, startPosition, endPosition, setIsFlying } =
    useFlyingElement();

  const returnTokens = (tokens: Pile['tokens'], selectedToken: TokenType) => {
    const discardedTokens = game.returnTokens({
      discardTokens: tokens.filter(({ token }) => token !== selectedToken),
      selectedToken,
      activePlayer,
    });
    setDiscardedTokens((prev) =>
      prev.map(({ startingPosition, ...rest }) => rest).concat(discardedTokens),
    );
    setIsFlying(true);

    setActivePlayer((activePlayer + 1) % game.players.length);
  };

  return (
    <Box p="4" width="full" height="full" overflow="auto">
      <Flex position="relative" width="800px" height="800px">
        <Box position="absolute" top="250px" left="250px">
          <Circle position="relative" width="300px" height="300px" bg="gray.50">
            {discardedTokens.map(
              ({ position, startingPosition, token }, idx) =>
                startingPosition ? (
                  <MotionBox
                    key={idx}
                    initial={{ x: startingPosition.x, y: startingPosition.y }}
                    animate={{ x: position.x, y: position.y }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  >
                    <Token tokenColor={token} />
                  </MotionBox>
                ) : (
                  <Token tokenColor={token} />
                ),
            )}
          </Circle>
        </Box>
        {placement.map(({ position: { x, y } }, idx) => (
          <Box key={idx} position="absolute" style={{ left: x, top: y }}>
            <Coaster
              addEventListener={addListener}
              returnTokens={returnTokens}
              key={idx}
              pile={game.piles[idx]}
            />
          </Box>
        ))}
      </Flex>
      <Flex gap="2">
        {game.players.map((player) => (
          <PlayerBoard
            key={player.name}
            toggleSize={setFocusedBoard}
            expanded={focusedBoard === player.name}
            player={player}
          />
        ))}
      </Flex>
    </Box>
  );
}
