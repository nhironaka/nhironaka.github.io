import { useRefDimensions } from '@shared/hooks/useRefDimensions';
import { Box, type BoxProps } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';

export function ScaleElement({ children, ...rest }: BoxProps) {
  const { ref, boundingClientRect } = useRefDimensions<HTMLDivElement>();

  const { clientWidth = 1 } = ref.current?.children[0]?.children[0] ?? {};
  const scaleChild = (boundingClientRect?.width ?? 0) / clientWidth;

  return (
    <Box ref={ref} {...rest}>
      <MotionBox
        display="flex"
        transformOrigin="top left"
        style={{
          transform: scaleChild ? `scale(${scaleChild})` : undefined,
          width: clientWidth,
        }}
        overflow="hidden"
      >
        {children}
      </MotionBox>
    </Box>
  );
}
