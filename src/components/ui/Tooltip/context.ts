import type { Placement } from '@floating-ui/react';
import { createContext } from 'react';

export const TooltipGroupContext = createContext<{
  groupId: string | undefined;
  placement: Placement;
}>({
  groupId: undefined,
  placement: 'top',
});
