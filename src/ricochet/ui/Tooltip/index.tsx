import { Box } from '@components/ui';
import { TooltipGroupContext } from '@components/ui/Tooltip/context';
import {
  FloatingPortal,
  type Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDelayGroup,
  useDelayGroupContext,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { TRANSLATE_MAP } from '@shared/constants/ui';
import { AnimatePresence, motion } from 'framer-motion';
import {
  type ReactNode,
  cloneElement,
  useContext,
  useId,
  useLayoutEffect,
  useState,
} from 'react';
import './tooltip.scss';

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
  const { delay, isInstantPhase } = useDelayGroupContext();
  const showDelayFinal =
    showDelay ?? (typeof delay === 'number' ? delay : delay.open) ?? 500;
  const hideDelayFinal =
    hideDelay ?? (typeof delay === 'number' ? delay : delay.close) ?? 200;
  const placementFinal = placement || groupPlacement;
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
    placement: placementFinal,
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

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: showDelayFinal, restMs: hideDelayFinal }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const tooltipId = useId();
  useDelayGroup(context, { id: tooltipId });

  useLayoutEffect(() => {
    if (isPositioned && state !== 'positioned') {
      setState('positioned');
    }
  }, [isPositioned]);

  const translate =
    TRANSLATE_MAP[
      computedPlacement.includes('-')
        ? computedPlacement.split('-')[0]
        : computedPlacement
    ];

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
            <motion.div
              initial={isInstantPhase ? {} : { opacity: 0, ...translate }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              exit={{ opacity: 0, ...translate }}
              transition={{ duration: 0.2 }}
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {content}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};
