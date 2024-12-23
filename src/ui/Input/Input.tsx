import { styled } from '@styled/jsx';
import { type JsxStyleProps } from '@styled/types';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

const StyledInput = styled('input');

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & JsxStyleProps
>((props, ref) => {
  return <StyledInput borderRadius="lg" px="2" ref={ref} {...props} />;
});

Input.displayName = 'Input';
