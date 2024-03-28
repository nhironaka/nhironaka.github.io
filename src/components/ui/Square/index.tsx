import { forwardRef } from 'react';

import { Box } from '@components/ui';
import type { ComponentAttributes } from '@shared/types';

export const Square = forwardRef<
  HTMLDivElement,
  ComponentAttributes<HTMLDivElement>
>(({ children, ...rest }, ref) => {
  return (
    <Box width="full" position="relative" className="cell" {...rest} ref={ref}>
      <Box mt="full" />

      <Box
        width="full"
        height="full"
        top="0"
        left="0"
        borderRadius="md"
        position="absolute"
      >
        {children}
      </Box>
    </Box>
  );
});

Square.displayName = 'Square';
