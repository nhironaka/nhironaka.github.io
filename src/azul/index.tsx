import { Box, Flex } from '@styled/jsx';
import { type RefObject, useCallback, useRef, useState } from 'react';

import { Coaster } from './components/Coaster';
import { DiscardPile } from './components/DiscardPile';
import { PlayerBoard } from './components/PlayerBoard';
import { PILE_RADIUS } from './constants/board';
import { arrangeItemsInCircle } from './helpers/placement';
import { AzulContext, type AzulContextType } from './hooks/useAzulContext';
import { useEvent } from './hooks/useEvent';
import { BoardState } from './services/board';
import {
  type Pile,
  type PlayedToken,
  type Token as TokenType,
} from './types/board';

export function Game() {
  const [numPlayers] = useState<AzulContextType['players']>(4);
  const coasterRefs = useRef<Record<string, RefObject<HTMLDivElement | null>>>(
    {},
  );
  const [selectedTokenState, setSelectedTokenState] = useState<Pile>({
    id: '',
    tokens: [],
  });
  const { addListener, dispatch } = useEvent<string>();
  const [game] = useState(new BoardState(numPlayers));
  const [discardedTokens, setDiscardedTokens] = useState<Array<PlayedToken>>(
    [],
  );
  const [activePlayer] = useState(0);
  const placement = arrangeItemsInCircle({
    n: game.piles.length,
    radius: 400,
    width: PILE_RADIUS[numPlayers] * 2,
    height: PILE_RADIUS[numPlayers] * 2,
  });

  const returnTokens = (pile: Pile, selectedToken: TokenType) => {
    const { id } = pile;
    const { discardedTokens, tokensToPlay } = game.returnTokens({
      pile,
      selectedToken,
    });
    setDiscardedTokens((prev) =>
      prev.map(({ startingPosition, ...rest }) => rest).concat(discardedTokens),
    );
    setSelectedTokenState({
      id,
      tokens: tokensToPlay,
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
    <AzulContext.Provider
      value={{ players: numPlayers, addListener, dispatch }}
    >
      <Flex p="4" width="full" height="full" overflow="auto" flexWrap="wrap">
        <Box zIndex="1" flexGrow="1" minWidth="0" height="full">
          <Flex position="relative" width="800px" height="800px">
            {placement.map(({ position: { x, y } }, idx) => (
              <Box key={idx} position="absolute" style={{ left: x, top: y }}>
                <Coaster
                  addRef={addRef}
                  addEventListener={addListener}
                  returnTokens={returnTokens}
                  key={idx}
                  pile={game.piles[idx]}
                  playActive={selectedTokenState.tokens.length > 0}
                />
              </Box>
            ))}
            <DiscardPile
              selectedTokenState={selectedTokenState}
              discardedTokens={discardedTokens}
              coasterRefs={coasterRefs}
            />
          </Flex>
        </Box>
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          width="772px"
          gap="2"
          height="full"
        >
          {game.players.map((player, idx) => (
            <PlayerBoard
              coasterRefs={coasterRefs}
              selectedTokenState={
                idx === activePlayer ? selectedTokenState : undefined
              }
              key={player.name}
              expanded={idx === activePlayer}
              player={player}
            />
          ))}
        </Flex>
      </Flex>
    </AzulContext.Provider>
  );
}
