import { useMergeRefs } from '@floating-ui/react';
import {
  type HTMLProps,
  type ReactElement,
  cloneElement,
  forwardRef,
} from 'react';

import { usePopoverContext } from './hooks';

interface PopoverTriggerProps {
  children: ReactElement;
}

export const PopoverTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & PopoverTriggerProps
>(({ children, ...props }, propRef) => {
  const { getReferenceProps, open, refs } = usePopoverContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useMergeRefs([refs.setReference, (children as any).ref, propRef]);

  return cloneElement(
    children,
    getReferenceProps({
      ref,
      ...props,
      ...children.props,
      'data-state': open ? 'open' : 'closed',
    }),
  );
});

PopoverTrigger.displayName = 'PopoverTrigger';
