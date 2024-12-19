import { MotionBox } from '@ui/Motion';
import { Fragment, type MutableRefObject, type RefObject } from 'react';

import { tokenSize } from '../constants/recipes';
import { getRelativePosition } from '../helpers/placement';
import { useAzulContext } from '../hooks/useAzulContext';
import { type PlayedToken } from '../types/board';

import { Token } from './Token';

interface Props {
  tokensToAnimate: Array<PlayedToken>;
  coasterRefs: MutableRefObject<
    Record<string, RefObject<HTMLDivElement | null>>
  >;
  relativeElement(idx: number): HTMLElement | null;
  onAnimationStart?: (idx: number) => void;
  onAnimationEnd?: (idx: number) => void;
}

export function AnimateTokens({
  tokensToAnimate,
  coasterRefs,
  relativeElement,
  onAnimationStart,
  onAnimationEnd,
}: Props) {
  const { players } = useAzulContext();

  return (
    <Fragment>
      {tokensToAnimate.map(
        ({ position, startingPosition, token, pileId }, idx) => {
          const { x: relativeX, y: relativeY } = getRelativePosition(
            coasterRefs.current[pileId].current,
            relativeElement(idx),
          );
          return startingPosition ? (
            <MotionBox
              key={idx}
              initial={{
                left: startingPosition.x - relativeX,
                top: startingPosition.y - relativeY,
              }}
              position="absolute"
              animate={{ left: position.x, top: position.y }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              onAnimationStart={() => onAnimationStart?.(idx)}
              onAnimationEnd={() => onAnimationEnd?.(idx)}
            >
              <Token
                className={tokenSize({
                  numPlayers: players,
                })}
                tokenColor={token}
              />
            </MotionBox>
          ) : (
            <Token
              key={idx}
              position="absolute"
              className={tokenSize({
                numPlayers: players,
              })}
              tokenColor={token}
              style={{ top: position.y, left: position.x }}
            />
          );
        },
      )}
    </Fragment>
  );
}
