import { forwardRef, type ReactNode } from 'react';

import { styled, type FlexProps } from '@styled/jsx';
import type { GoalToken, Token as TokenType } from '../../types/board';

interface Props extends Omit<FlexProps, 'direction'> {
  token: GoalToken | TokenType;
  children?: ReactNode;
}

const getToken = (token: TokenType | GoalToken) => {
  return token.replace(/\d+/, '') as TokenType;
};

const StyledToken = styled('div', {
  base: {
    display: 'flex',
    width: { base: 'calc(100% - 2px)', lg: 'calc(100% - 4px)' },
    height: { base: 'calc(100% - 2px)', lg: 'calc(100% - 4px)' },
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: { base: 'xs', lg: 'sm' },
  },
  variants: {
    tokenColor: {
      red: { bg: 'red.300' },
      purple: { bg: 'violet.300' },
      green: { bg: 'green.200' },
      yellow: { bg: 'orange.300' },
    },
  },
});

export const Token = forwardRef<HTMLDivElement, Props>(
  ({ token, children, ...rest }, ref) => {
    const tokenColor = getToken(token);

    return (
      <StyledToken tokenColor={tokenColor} ref={ref} {...rest}>
        {children}
      </StyledToken>
    );
  },
);

Token.displayName = 'Token';
