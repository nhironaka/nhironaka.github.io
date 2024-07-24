import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, type HTMLProps } from 'react';

import { TRANSLATE_MAP } from '@shared/constants/ui';
import { usePopoverContext } from './context';
import './popover.scss';

export const PopoverContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ style, className, children, ...props }, propRef) => {
  const {
    context: floatingContext,
    refs,
    modal,
    open,
    getFloatingProps,
    strategy,
    placement: computedPlacement,
    x,
    y,
    setOpen,
  } = usePopoverContext();
  const ref = useMergeRefs([refs.setFloating, propRef]);

  const tooltipDirection = computedPlacement.includes('-')
    ? computedPlacement.split('-')[0]
    : computedPlacement;
  const translate = TRANSLATE_MAP[tooltipDirection];

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={modal}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, ...translate }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              exit={{ opacity: 0, ...translate }}
              transition={{ duration: 0.2 }}
              {...getFloatingProps({
                ...props,
                ref: refs.setFloating,
                className: classNames('popover', tooltipDirection, className),
                onMouseLeave() {
                  setOpen(false);
                },
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  ...style,
                },
              })}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

PopoverContent.displayName = 'PopoverContent';
