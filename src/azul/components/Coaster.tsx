import { Box, Flex } from '@styled/jsx';
import { type RefObject, useEffect, useRef, useState } from 'react';

import coaster from '../assets/coaster.svg';
import { useAzulContext } from '../hooks/useAzulContext';
import { type Pile, type Token as TokenType } from '../types/board';

import { Token } from './Token';

interface Props {
  size: number;
  pile: Pile;
  returnTokens(tokens: Pile, selectedToken: TokenType): void;
  addRef(id: string, ref: RefObject<HTMLDivElement | null>): () => void;
  playActive: boolean;
}

export function Coaster({
  size,
  playActive,
  pile,
  returnTokens,
  addRef,
}: Props) {
  const { addListener } = useAzulContext();
  const ref = useRef<HTMLDivElement>(null);
  const [selectedTokenColor, setSelectedTokenColor] = useState('');
  const [hoveredColor, setHoveredColor] = useState('');

  useEffect(() => {
    const unsubscribe = addListener(pile.id, (selectedToken: string) => {
      setSelectedTokenColor(selectedToken);
    });

    return () => {
      unsubscribe();
    };
  }, [addListener, pile.id]);

  useEffect(() => {
    const removeRef = addRef(pile.id, ref);

    return () => {
      removeRef();
    };
  }, [addRef, pile.id]);

  return (
    <Box position="relative" ref={ref}>
      <img style={{ width: size }} src={coaster} />
      {pile.tokens.map(
        ({ token, position: { x, y }, width, height }, idx) =>
          (!selectedTokenColor || selectedTokenColor === token) && (
            <Flex
              display="inline-flex"
              position="absolute"
              key={idx}
              style={{
                left: x,
                top: y,
              }}
            >
              <Token
                style={{
                  width,
                  height,
                }}
                cursor={playActive ? 'default' : 'pointer'}
                onClick={() => {
                  if (!playActive) {
                    returnTokens(pile, token);
                  }
                }}
                onMouseEnter={() => setHoveredColor(token)}
                onMouseLeave={() => setHoveredColor('')}
                innerTokenProps={{ boxShadow: 'inner' }}
                boxShadow={
                  (!playActive && hoveredColor === token) ||
                  selectedTokenColor == token
                    ? 'lg'
                    : undefined
                }
                tokenColor={token}
              />
            </Flex>
          ),
      )}
    </Box>
  );
}
