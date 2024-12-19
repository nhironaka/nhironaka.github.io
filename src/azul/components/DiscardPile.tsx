import { Box, Circle, styled } from '@styled/jsx';
import { type MutableRefObject, type RefObject, useRef, useState } from 'react';

import { useAzulContext } from '../hooks/useAzulContext';
import { type Pile, type PlayedToken } from '../types/board';

import { AnimateTokens } from './AnimateTokens';

interface Props {
  discardedTokens: Array<PlayedToken>;
  selectedTokenState: Pile;
  coasterRefs: MutableRefObject<
    Record<string, RefObject<HTMLDivElement | null>>
  >;
}

const DiscardCenter = styled(Circle, {
  base: {
    position: 'relative',
  },
  variants: {
    numPlayers: {
      2: {
        width: '300px',
        height: '300px',
      },
      3: {
        width: '400px',
        height: '400px',
      },
      4: {
        width: '440px',
        height: '440px',
      },
    },
  },
});

const PileWrapper = styled(Box, {
  base: {
    position: 'absolute',
  },
  variants: {
    numPlayers: {
      2: {
        top: '250px',
        left: '250px',
      },
      3: {
        top: '200px',
        left: '200px',
      },
      4: {
        top: '180px',
        left: '180px',
      },
    },
  },
});

export function DiscardPile({
  selectedTokenState,
  discardedTokens,
  coasterRefs,
}: Props) {
  const [animating, setAnimating] = useState(false);
  const { players, dispatch } = useAzulContext();
  const discardPileRef = useRef<HTMLDivElement>(null);

  return (
    <PileWrapper zIndex={animating ? '1' : undefined} numPlayers={players}>
      <DiscardCenter numPlayers={players} ref={discardPileRef}>
        <AnimateTokens
          tokensToAnimate={discardedTokens}
          coasterRefs={coasterRefs}
          relativeElement={() => {
            return discardPileRef.current;
          }}
          onAnimationStart={() => {
            const {
              id,
              tokens: [{ token }],
            } = selectedTokenState;
            dispatch(id, token);

            setAnimating(true);
          }}
          onAnimationEnd={() => {
            setAnimating(false);
          }}
        />
      </DiscardCenter>
    </PileWrapper>
  );
}
