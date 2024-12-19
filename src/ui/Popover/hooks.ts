import {
  type Placement,
  type UseFloatingReturn,
  type UseInteractionsReturn,
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useContext, useMemo, useState } from 'react';

import { PopoverContext, type PopoverContextType } from './context';

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ReturnValue extends UseInteractionsReturn, UseFloatingReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal?: boolean;
}

export function usePopover({
  initialOpen = false,
  placement = 'top',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopoverOptions = {}): ReturnValue {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: (open) => {
      setOpen(open);
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: 16,
      }),
      shift({ padding: 16 }),
    ],
  });
  const { context } = data;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
    }),
    [open, setOpen, interactions, data, modal],
  );
}

export const usePopoverContext = (): NonNullable<PopoverContextType> => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};
