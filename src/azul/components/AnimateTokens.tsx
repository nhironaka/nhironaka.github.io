import { MotionBox } from '@ui/Motion';
import { Fragment } from 'react';

import { type PlayedToken } from '../types/board';

import { Token } from './Token';

interface Props {
  tokensToAnimate: Array<PlayedToken>;

  onAnimationStart?: (idx: number) => void;
  onAnimationComplete?: (idx: number) => void;
}

export function AnimateTokens({
  tokensToAnimate,
  onAnimationStart,
  onAnimationComplete,
}: Props) {
  return (
    <Fragment>
      {tokensToAnimate.map(
        ({ position, startingPosition, token, width, height }, idx) => {
          return startingPosition ? (
            <MotionBox
              key={idx}
              initial={{
                left: startingPosition.x,
                top: startingPosition.y,
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
