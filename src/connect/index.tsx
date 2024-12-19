import { Flex } from '@styled/jsx';
import { useState } from 'react';

import { Board } from './components/Board';
import { TOKENS } from './constants';
import { BoardState } from './services/BoardState';
import { type Token } from './types';

export function Game() {
  const [activePlayer, setActivePlayer] = useState<Token>(TOKENS.RED);
  const [board] = useState(new BoardState());

  return (
    <Flex justifyContent="center" width="full">
      <Flex maxWidth="1200px" width="full" px={{ base: '1', lg: '6' }}>
        <Board
          activePlayer={activePlayer}
          board={board}
          setActivePlayer={setActivePlayer}
        />
      </Flex>
    </Flex>
  );
}
