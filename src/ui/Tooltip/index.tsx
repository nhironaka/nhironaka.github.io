import {
  FloatingPortal,
  type Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDelayGroup,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { AnimatePresence } from 'framer-motion';
import {
  type ReactNode,
  cloneElement,
  useContext,
  useId,
  useLayoutEffect,
  useState,
} from 'react';

import { TRANSLATE_MAP } from '@shared/constants/ui';
import { type Direction } from '@shared/types/ui';
import { Box } from '@styled/jsx';
import { MotionBox } from '@ui/Motion';
import { TooltipGroupContext } from './context';

interface Props {
  content: ReactNode;
  showDelay?: number;
  hideDelay?: number;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = ({
  content,
  showDelay = 0,
  hideDelay = 200,
  placement,
  children,
}: Props) => {
  const { placement: groupPlacement, groupId } =
    useContext(TooltipGroupContext);

  const tooltipId = useId();
  const [open, setOpen] = useState(true);
  // unmounted -> initial -> positioned -> unmounted
  const [state, setState] = useState<'unmounted' | 'initial' | 'positioned'>(
    'unmounted',
  );

  const {
    x,
    y,
    strategy,
    context,
    isPositioned,
    placement: computedPlacement,
  } = useFloating({
    placement: placement || groupPlacement,
    open,
    onOpenChange(open) {
      setOpen(open);

      if (open && state === 'unmounted') {
        setState('initial');
      }
    },
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { delay, isInstantPhase } = useDelayGroup(context, { id: tooltipId });

  const showDelayFinal =
    showDelay ?? (typeof delay === 'number' ? delay : delay.open) ?? 500;
  const hideDelayFinal =
    hideDelay ?? (typeof delay === 'number' ? delay : delay.close) ?? 200;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: showDelayFinal, restMs: hideDelayFinal }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  useLayoutEffect(() => {
    if (isPositioned && state !== 'positioned') {
      setState('positioned');
    }
  }, [isPositioned, state]);

  const direction = (
    computedPlacement.includes('-')
      ? computedPlacement.split('-')[0]
      : computedPlacement
  ) as Direction;

  const translate = TRANSLATE_MAP[direction];

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({
          ref: context.refs.setReference,
          ...children.props,
        }),
      )}

      <FloatingPortal>
        {/* This element used to measure its size for position calculation, and later we render true tooltip */}
        {open && state === 'initial' && (
          <Box
            color="white"
            borderRadius="sm"
            width="max-content"
            maxWidth="calc(100vw - 10px)"
            px="1"
            py="2"
            {...getFloatingProps({
              ref: context.refs.setFloating,
              className: 'Tooltip',
              style: {
                position: strategy,
                visibility: 'hidden',
                top: 0,
                left: 0,
              },
            })}
          >
            {content}
          </Box>
        )}
        <AnimatePresence
          onExitComplete={() => {
            setState('unmounted');
          }}
        >
          {open && state === 'positioned' && (
            <MotionBox
              initial={isInstantPhase ? {} : { opacity: 0, ...translate }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              exit={{ opacity: 0, ...translate }}
              motionTransition={{ duration: 0.2 }}
              layoutId={groupId}
              {...getFloatingProps({
                ref: context.refs.setFloating,
                className: 'tooltip',
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                },
              })}
            >
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {content}
              </MotionBox>
            </MotionBox>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};
