import { styled } from '@styled/jsx';
import { type JsxStyleProps } from '@styled/types';
import { Square, type SquareProps } from '@ui/Motion';
import { forwardRef } from 'react';

import { type EMPTY } from '../constants/board';
import { type Token as TokenType } from '../types/board';

const StyledToken = styled('div', {
  variants: {
    tokenColor: {
      red: { bg: 'terraCotta.400' },
      yellow: { bg: 'peach.400' },
      green: { bg: 'dustyTeal.400' },
      blue: { bg: 'gunmetalBlue.400' },
      purple: { bg: 'darkViolet.400' },
      empty: {
        bg: 'ivory',
      },
    },
  },
});

interface Props extends Partial<SquareProps> {
  tokenColor: TokenType | typeof EMPTY;
  innerTokenProps?: Partial<JsxStyleProps>;
}

export const Token = forwardRef<HTMLDivElement, Props>(
  ({ tokenColor, children, innerTokenProps, ...rest }, ref) => {
    return (
      <Square width="60px" height="60px" borderRadius="lg" {...rest} ref={ref}>
        <StyledToken
          width="full"
          height="full"
          borderRadius="lg"
          {...innerTokenProps}
          tokenColor={tokenColor}
        />
        {children}
      </Square>
    );
  },
);

Token.displayName = 'Token';
