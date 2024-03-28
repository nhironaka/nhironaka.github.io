import { TooltipGroupContext } from '@components/ui/Tooltip/context';
import { FloatingDelayGroup, type Placement } from '@floating-ui/react';
import { LayoutGroup } from 'framer-motion';
import { type ReactNode, useId } from 'react';

interface Props {
  showDelay?: number;
  hideDelay?: number;
  timeout?: number;
  placement?: Placement;
  children: ReactNode;
}

export const TooltipGroup = ({
  showDelay = 120,
  hideDelay = 400,
  timeout = 300,
  placement = 'top',
  children,
}: Props) => {
  const groupId = useId();

  return (
    <TooltipGroupContext.Provider value={{ groupId, placement }}>
      <FloatingDelayGroup
        delay={{ open: showDelay, close: hideDelay }}
        timeoutMs={timeout}
      >
        <LayoutGroup>{children}</LayoutGroup>
      </FloatingDelayGroup>
    </TooltipGroupContext.Provider>
  );
};
