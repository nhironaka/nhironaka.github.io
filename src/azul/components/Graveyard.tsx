import { Flex } from '@styled/jsx';
import { Token as TokenType } from '../types/board';
import { Token } from './Token';

interface Props {
  points: Array<TokenType>;
}

const POINTS = [-1, -1, -2, -2, -3, -3];

export function Graveyard({ points }: Props) {
  return (
    <Flex gap="2">
      {POINTS.map((point, idx) => (
        <Token
          key={idx}
          tokenColor={points[idx] ?? 'empty'}
          position="relative"
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
            {points[idx] ? null : point}
          </Flex>
        </Token>
      ))}
    </Flex>
  );
}
