import { Button } from '@components/ui/Button';
import { type ComponentProps, forwardRef } from 'react';
import { usePopoverContext } from './context';

export const PopoverClose = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(({ onClick, ...props }, ref) => {
  const { setOpen } = usePopoverContext();
  return (
    <Button
      type="button"
      ref={ref}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        setOpen(false);
      }}
    />
  );
});

PopoverClose.displayName = 'PopoverClose';
