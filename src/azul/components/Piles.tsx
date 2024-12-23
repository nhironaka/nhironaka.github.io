import { Box } from '@styled/jsx';
import { Square } from '@ui/Motion';
import {
  useCallback,
  useState,
  type MutableRefObject,
  type RefObject,
} from 'react';

import { NUM_PILES, PILE_SIZE } from '../constants/board';
import { arrangeItemsInCircle } from '../helpers/placement';
import { useAzulContext } from '../hooks/useAzulContext';
import {
  type Pile,
  type PlayedToken,
  type Token as TokenType,
} from '../types/board';

import { Coaster } from './Coaster';
import { DiscardPile } from './DiscardPile';

interface Props {
  coasterRefs: MutableRefObject<
    Record<string, RefObject<HTMLDivElement | null>>
  >;
  selectedTokenState: Pile;
  setSelectedTokenState(pile: Pile): void;
}

export function Piles({
  setSelectedTokenState,
  coasterRefs,
  selectedTokenState,
}: Props) {
  const { game, players } = useAzulContext();

  const [discardedTokens, setDiscardedTokens] = useState<Array<PlayedToken>>(
    [],
  );
  const { elementDiameter: coasterSize, positions } = arrangeItemsInCircle({
    n: NUM_PILES[players],
    radius: PILE_SIZE / 2,
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
      coasterRefs.current[id] = ref;

      return () => {
        delete coasterRefs.current[id];
      };
    },
    [coasterRefs],
  );

  return (
    <Square display="block" position="relative" width="800px" height="800px">
      {positions.map(({ x, y }, idx) => {
        const pile = game.piles[idx];
        return (
          <Box
            key={pile.id}
            position="absolute"
            style={{
              left: x,
              top: y,
              width: coasterSize,
            }}
          >
            <Coaster
              size={coasterSize}
              addRef={addRef}
              returnTokens={returnTokens}
              pile={pile}
              playActive={selectedTokenState.tokens.length > 0}
            />
          </Box>
        );
      })}
      <DiscardPile
        selectedTokenState={selectedTokenState}
        discardedTokens={discardedTokens}
        coasterRefs={coasterRefs}
        coasterSize={coasterSize}
      />
    </Square>
  );
}
