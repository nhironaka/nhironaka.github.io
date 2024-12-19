import { Flex } from '@styled/jsx';
import { type RefObject, useEffect, useRef, useState } from 'react';

import coaster from '../assets/coaster.svg';
import { type AddListener } from '../hooks/useEvent';
import { type Pile, type Token as TokenType } from '../types/board';

import { Token } from './Token';

interface Props {
  addEventListener: AddListener<string>;
  pile: Pile;
  returnTokens(tokens: Pile, selectedToken: TokenType): void;
  addRef(id: string, ref: RefObject<HTMLDivElement | null>): () => void;
}

export function Coaster({
  pile,
  returnTokens,
  addEventListener,
  addRef,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedTokenColor, setSelectedTokenColor] = useState('');
  const [hoveredColor, setHoveredColor] = useState('');

  useEffect(() => {
    const unsubscribe = addEventListener(pile.id, (selectedToken: string) => {
      setSelectedTokenColor(selectedToken);
    });
    const removeRef = addRef(pile.id, ref);

    return () => {
      unsubscribe();
      removeRef();
    };
  }, [addEventListener, addRef, pile.id]);

  return (
    <Flex position="relative" ref={ref}>
      <img width="250px" src={coaster} />
      {pile.tokens.map(
        ({ token, position }, idx) =>
          (!selectedTokenColor || selectedTokenColor === token) && (
            <Flex
              display="inline-flex"
              position="absolute"
              key={idx}
              style={{ top: position.y, left: position.x }}
            >
              <Token
                cursor={selectedTokenColor ? 'default' : 'pointer'}
                onClick={() => {
                  if (!selectedTokenColor) {
                    returnTokens(pile, token);
                  }
                }}
                onMouseEnter={() => setHoveredColor(token)}
                onMouseLeave={() => setHoveredColor('')}
                innerTokenProps={{ boxShadow: 'inner' }}
                boxShadow={
                  hoveredColor === token || selectedTokenColor == token
                    ? 'lg'
                    : undefined
                }
                tokenColor={token}
              />
            </Flex>
          ),
      )}
    </Flex>
  );
}
