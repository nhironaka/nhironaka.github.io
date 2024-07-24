import { forwardRef } from 'react';

import { useMediaQuery } from '@shared/hooks/useMediaQueries';
import type { ComponentAttributes } from '@shared/types/utils';
import { Box } from '@ui/index';

export const Square = forwardRef<
  HTMLDivElement,
  ComponentAttributes<HTMLDivElement>
>(({ children, ...rest }, ref) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Box width="full" position="relative" className="cell" {...rest} ref={ref}>
      <Box mt="full" />

      <Box
        width="full"
        height="full"
        top="0"
        left="0"
        borderRadius={isDesktop ? 'md' : 'sm'}
        position="absolute"
      >
        {children}
      </Box>
    </Box>
  );
});

Square.displayName = 'Square';
