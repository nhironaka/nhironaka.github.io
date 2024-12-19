import { createContext } from 'react';

import type { usePopover } from './hooks';

export type PopoverContextType = ReturnType<typeof usePopover> | null;

export const PopoverContext = createContext<PopoverContextType>(null);
