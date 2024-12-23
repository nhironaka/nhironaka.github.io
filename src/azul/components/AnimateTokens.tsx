import { MotionBox } from '@ui/Motion';
import { Fragment, type MutableRefObject, type RefObject } from 'react';

import { getRelativePosition } from '../helpers/placement';
import { type PlayedToken } from '../types/board';

import { Token } from './Token';

interface Props {
  tokensToAnimate: Array<PlayedToken>;
  coasterRefs: MutableRefObject<
    Record<string, RefObject<HTMLDivElement | null>>
  >;
  destinationElement: HTMLElement | null;
  onAnimationStart?: (idx: number) => void;
  onAnimationComplete?: (idx: number) => void;
}

export function AnimateTokens({
  tokensToAnimate,
  coasterRefs,
  destinationElement,
  onAnimationStart,
  onAnimationComplete,
}: Props) {
  return (
    <Fragment>
      {tokensToAnimate.map(
        ({ position, startingPosition, token, pileId, width, height }, idx) => {
          const { x: relativeX, y: relativeY } = getRelativePosition(
            coasterRefs.current[pileId]?.current,
            destinationElement,
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
              onAnimationComplete={() => {
                onAnimationComplete?.(idx);
              }}
            >
              <Token style={{ width, height }} tokenColor={token} />
            </MotionBox>
          ) : (
            <Token
              key={idx}
              position="absolute"
              tokenColor={token}
              style={{ width, height, top: position.y, left: position.x }}
            />
          );
        },
      )}
    </Fragment>
  );
}
