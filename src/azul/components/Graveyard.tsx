import { Flex } from '@styled/jsx';

import { EMPTY } from '../constants/board';
import { type Token as TokenType } from '../types/board';

import { Token } from './Token';

interface Props {
  points: Array<TokenType>;
  shadowTokens: Array<TokenType | null>;
  addRef: (idx: number, ref: HTMLDivElement) => void;
}

const POINTS = [-1, -1, -2, -2, -3, -3];

export function Graveyard({ points, shadowTokens, addRef }: Props) {
  return (
    <Flex gap="2">
      {POINTS.map((point, idx) => {
        const shadowToken = shadowTokens[points.length + idx];
        return (
          <Token
            key={idx}
            tokenColor={points[idx] ?? shadowToken ?? EMPTY}
            position="relative"
            ref={(node) => {
              if (node) {
                addRef(idx, node);
              }
            }}
          >
            <Flex
              width="full"
              height="full"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              top="0"
              left="0"
            >
              {points[idx] || shadowToken ? null : point}
            </Flex>
          </Token>
        );
      })}
    </Flex>
  );
}
