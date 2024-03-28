import { type HTMLProps, type ReactElement } from 'react';

import { PopoverContext } from './context';
import { type PopoverOptions, usePopover } from './hooks';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';

export function Popover({
  children,
  popoverContent,
  modal = false,
  className,
  style,
  ...restOptions
}: {
  children: ReactElement;
  popoverContent: ReactElement;
  className?: string;
  style?: HTMLProps<HTMLDivElement>['style'];
} & PopoverOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className={className} style={style}>
        {popoverContent}
      </PopoverContent>
    </PopoverContext.Provider>
  );
}
