import { Flex } from '@styled/jsx';
import { type RefObject, useRef, useState } from 'react';

import { Piles } from './components/Piles';
import { PlayerBoard } from './components/PlayerBoard';
import { ScaleElement } from './components/ScaleElement';
import { AzulContext, type AzulContextType } from './hooks/useAzulContext';
import { useEvent } from './hooks/useEvent';
import { BoardState } from './services/board';
import { type Pile } from './types/board';

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

  const [game] = useState(() => new BoardState(numPlayers));
  const finishTurn = () => {
    if (selectedTokenState.id) {
      game.finishTurn(selectedTokenState.id);
      setSelectedTokenState({ id: '', tokens: [] });
    }
  };

  return (
    <AzulContext.Provider
      value={{
        players: numPlayers,
        game,
        addListener,
        dispatch,
      }}
    >
      <Flex
        p="4"
        width="full"
        height="full"
        overflow="auto"
        flexDirection={{ base: 'column', '2xl': 'row' }}
      >
        <ScaleElement
          zIndex="1"
          flexGrow={{ '2xl': '1' }}
          minWidth={{ '2xl': '0' }}
          height={{ '2xl': 'full' }}
          width={{ base: 'full', '2xl': 'auto' }}
        >
          <Piles
            setSelectedTokenState={setSelectedTokenState}
            selectedTokenState={selectedTokenState}
          />
        </ScaleElement>

        <Flex
          width={{ base: 'full', '2xl': '772px' }}
          gap="2"
          height={{ '2xl': 'full' }}
          flexWrap="wrap"
        >
          {game.players.map((player, idx) => (
            <PlayerBoard
              coasterRefs={coasterRefs}
              selectedTokenState={
                idx === game.activePlayer ? selectedTokenState : undefined
              }
              finishTurn={finishTurn}
              key={player.name}
              expanded={idx === game.activePlayer}
              player={player}
            />
          ))}
        </Flex>
      </Flex>
    </AzulContext.Provider>
  );
}
