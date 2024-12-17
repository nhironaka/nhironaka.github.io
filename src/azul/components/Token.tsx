import { styled } from '@styled/jsx';
import { JsxStyleProps } from '@styled/types';
import { Square, type SquareProps } from '@ui/Motion';
import { Token as TokenType } from '../types/board';

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
  tokenColor: TokenType | 'empty';
  innerTokenProps?: Partial<JsxStyleProps>;
}

export function Token({
  tokenColor,
  children,
  innerTokenProps,
  ...rest
}: Props) {
  return (
    <Square width="60px" height="60px" borderRadius="lg" {...rest}>
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
}
