import { type JsxStyleProps } from '@styled/types';
import { type ReactElement } from 'react';

import { PopoverContext } from './context';
import { type PopoverOptions, usePopover } from './hooks';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';

interface Props extends PopoverOptions {
  children: ReactElement;
  popoverContent: ReactElement;
  className?: string;
  styleOverrides?: JsxStyleProps;
}

export function Popover({
  children,
  popoverContent,
  modal = false,
  className,
  styleOverrides,
  ...restOptions
}: Props) {
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className={className} styleOverrides={styleOverrides}>
        {popoverContent}
      </PopoverContent>
    </PopoverContext.Provider>
  );
}
