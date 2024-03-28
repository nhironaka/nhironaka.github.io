import { useMergeRefs } from '@floating-ui/react';
import {
  cloneElement,
  forwardRef,
  type HTMLProps,
  type ReactElement,
} from 'react';

import { usePopoverContext } from './context';

interface PopoverTriggerProps {
  children: ReactElement;
}

export const PopoverTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & PopoverTriggerProps
>(({ children, ...props }, propRef) => {
  const { getReferenceProps, open, refs, setOpen } = usePopoverContext();
  const ref = useMergeRefs([refs.setReference, propRef]);

  return cloneElement(
    children,
    getReferenceProps({
      ref,
      ...props,
      ...children.props,
      onMouseEnter() {
        setOpen(true);
      },
      'data-state': open ? 'open' : 'closed',
    }),
  );
});

PopoverTrigger.displayName = 'PopoverTrigger';
