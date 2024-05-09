import classNames from 'classnames';
import type { ComponentProps, ReactNode } from 'react';

import { TOKENS } from '@shared/constants';
import { useMediaQuery } from '@shared/hooks/useMediaQueries';
import type { GoalToken, Token } from '@shared/types';
import { type Box, Flex } from '../ui';
import './token.scss';

interface Props extends ComponentProps<typeof Box> {
  token: GoalToken | Token;
  children?: ReactNode;
}

const tokenColors: Record<Token, string> = {
  [TOKENS.RED]: 'error-focus',
  [TOKENS.PURPLE]: 'success-focus',
  [TOKENS.GREEN]: 'success-hover',
  [TOKENS.YELLOW]: 'cell-focus',
};

const getToken = (token: Token | GoalToken) => {
  return token.replace(/\d+/, '') as Token;
};

export function Token({ token, children, ...rest }: Props) {
  const tokenColor = getToken(token);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Flex
      borderRadius={isDesktop ? 'md' : 'sm'}
      width="full"
      height="full"
      justifyContent="center"
      alignItems="center"
      className={classNames(
        'token',
        token ? `bg-${tokenColors[tokenColor]}` : '',
      )}
      {...rest}
    >
      {children}
    </Flex>
  );
}
