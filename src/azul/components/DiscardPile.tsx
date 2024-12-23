import { Circle } from '@styled/jsx';
import { type MutableRefObject, type RefObject, useRef, useState } from 'react';

import { PILE_SIZE } from '../constants/board';
import { useAzulContext } from '../hooks/useAzulContext';
import { type Pile, type PlayedToken } from '../types/board';

import { AnimateTokens } from './AnimateTokens';

interface Props {
  discardedTokens: Array<PlayedToken>;
  selectedTokenState: Pile;
  coasterRefs: MutableRefObject<
    Record<string, RefObject<HTMLDivElement | null>>
  >;
  coasterSize: number;
}

export function DiscardPile({
  selectedTokenState,
  discardedTokens,
  coasterRefs,
  coasterSize,
}: Props) {
  const [animating, setAnimating] = useState(false);
  const { dispatch } = useAzulContext();
  const discardPileRef = useRef<HTMLDivElement>(null);
  const pileSize = Math.sqrt((PILE_SIZE - 2 * coasterSize) ** 2);

  return (
    <Circle
      position="absolute"
      ref={discardPileRef}
      zIndex={animating ? '1' : undefined}
      style={{
        width: pileSize,
        height: pileSize,
        top: coasterSize,
        left: coasterSize,
      }}
    >
      <AnimateTokens
        tokensToAnimate={discardedTokens}
        coasterRefs={coasterRefs}
        destinationElement={discardPileRef.current}
        onAnimationStart={() => {
          const {
            id,
            tokens: [{ token }],
          } = selectedTokenState;
          dispatch(id, token);

          setAnimating(true);
        }}
        onAnimationComplete={() => {
          setAnimating(false);
        }}
      />
    </Circle>
  );
}
