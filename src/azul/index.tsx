import { Flex } from '@styled/jsx';
import { Input } from '@ui/Input/Input';
import { type RefObject, useRef, useState } from 'react';

import { Piles } from './components/Piles';
import { PlayerBoard } from './components/PlayerBoard';
import { ScaleElement } from './components/ScaleElement';
import { AzulContext, type AzulContextType } from './hooks/useAzulContext';
import { useEvent } from './hooks/useEvent';
import { BoardState } from './services/board';
import { type Pile } from './types/board';

const coasters: Record<string, RefObject<HTMLDivElement | null>> = {};

export function Game() {
  const [numPlayers, setNumPlayers] = useState<AzulContextType['players']>(2);
  const coasterRefs = useRef(coasters);
  const [selectedTokenState, setSelectedTokenState] = useState<Pile>({
    id: '',
    tokens: [],
  });
  const { addListener, dispatch } = useEvent<string>();

  const [game, setGame] = useState(() => new BoardState(numPlayers));
  const finishTurn = () => {
    if (selectedTokenState.id) {
      game.finishTurn(selectedTokenState.id);
      setSelectedTokenState({ id: '', tokens: [] });

      if (game.piles.every(({ tokens }) => tokens.length === 0)) {
        if (game.randomizer.isEmpty()) {
          game.players.forEach((player) => player.countTurn());
        }
        game.shuffleTokens();
      }
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
        flexDirection="column"
        overflow="auto"
        gap="4"
      >
        <Flex
          justifyContent="flex-end"
          borderBottom="1px solid"
          borderBottomColor="amber.900"
          pb="4"
        >
          <Input
            borderColor="amber.900"
            border="1px solid"
            minWidth="250px"
            type="number"
            value={numPlayers}
            min={2}
            max={4}
            onChange={({ target: { value } }) => {
              const newPlayerCount = +value as AzulContextType['players'];
              setNumPlayers(newPlayerCount);
              setGame(new BoardState(newPlayerCount));
            }}
          />
        </Flex>
        <Flex
          width="full"
          gap="4"
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
              coasterRefs={coasterRefs}
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
      </Flex>
    </AzulContext.Provider>
  );
}
