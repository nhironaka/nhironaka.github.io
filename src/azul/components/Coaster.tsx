import { Flex } from '@styled/jsx';
import { useEffect, useState } from 'react';
import coaster from '../assets/coaster.svg';
import { AddListener } from '../hooks/useEvent';
import { Pile, Token as TokenType } from '../types/board';
import { Token } from './Token';

interface Props {
  addEventListener: AddListener;
  pile: Pile;
  returnTokens(tokens: Pile['tokens'], selectedToken: TokenType): void;
}

export function Coaster({ pile, returnTokens }: Props) {
  const [selectedToken, setSelectedToken] = useState('');
  const [removeTokens, setRemoveTokens] = useState('');
  const [hoveredColor, setHoveredColor] = useState('');

  useEffect(() => {
    const unsubscribe = addEventListener(pile.id, () => {
      setRemoveTokens(selectedToken);
    });

    return unsubscribe;
  }, [addEventListener]);

  return (
    <Flex position="relative">
      <img width="250px" src={coaster} />
      {pile.tokens.map(
        ({ token, position }, idx) =>
          removeTokens &&
          removeTokens === token && (
            <Flex
              display="inline-flex"
              position="absolute"
              key={idx}
              style={{ top: position.y, left: position.x }}
            >
              <Token
                cursor="pointer"
                onClick={() => {
                  returnTokens(pile.tokens, token);
                  setSelectedToken(token);
                }}
                onMouseEnter={() => setHoveredColor(token)}
                onMouseLeave={() => setHoveredColor('')}
                innerTokenProps={{ boxShadow: 'inner' }}
                boxShadow={hoveredColor === token ? 'lg' : undefined}
                tokenColor={token}
              />
            </Flex>
          ),
      )}
    </Flex>
  );
}
