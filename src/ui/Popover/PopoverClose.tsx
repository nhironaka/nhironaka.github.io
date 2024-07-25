import { forwardRef } from 'react';
import { Button, type ButtonProps } from '../Button';
import { usePopoverContext } from './hooks';

export const PopoverClose = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, ...props }, ref) => {
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
  },
);

PopoverClose.displayName = 'PopoverClose';
