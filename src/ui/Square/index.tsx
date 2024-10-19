import { forwardRef } from 'react';

import { Box } from '@styled/jsx';
import { MotionBox, type MotionBoxProps } from '@ui/Motion';

export const Square = forwardRef<HTMLDivElement, MotionBoxProps>(
  ({ children, ...rest }, ref) => {
    return (
      <MotionBox width="full" position="relative" {...rest} ref={ref}>
        <Box mt="100%" />

        <Box
          width="full"
          height="full"
          top="0"
          left="0"
          borderRadius={{ base: 'sm', lg: 'md' }}
          position="absolute"
        >
          {children}
        </Box>
      </MotionBox>
    );
  },
);

Square.displayName = 'Square';
