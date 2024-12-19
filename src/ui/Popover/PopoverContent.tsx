import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { TRANSLATE_MAP } from '@shared/constants/ui';
import { type Direction } from '@shared/types/ui';
import { css, cva } from '@styled/css';
import { type JsxStyleProps } from '@styled/types';
import { MotionBox } from '@ui/Motion';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { forwardRef, type HTMLProps } from 'react';

import { usePopoverContext } from './hooks';

const popoverStyle = cva({
  base: {
    bg: 'white',
    p: '4',
    borderRadius: 'md',
    boxSizing: 'border-box',
    width: 'max-content',
    maxWidth: 'calc(100vw - 10px)',
    boxShadow: 'lg',

    _after: {
      content: '',
      position: 'absolute',
      border: '1px solid',
      borderColor: 'transparent',
    },
    _before: {
      content: '',
      position: 'absolute',
      border: '1px solid',
      borderColor: 'teal.600',
    },
  },
  variants: {
    arrowPlacement: {
      top: {
        _after: {
          borderTopColor: 'white',
          top: '100%',
          marginTop: '-1px',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        _before: {
          borderTopColor: 'teal.600',
          top: '100%',
          marginTop: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
      right: {
        _after: {
          borderRightColor: 'white',
          left: '100%',
          marginLeft: '-1px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        _before: {
          borderRightColor: 'teal.600',
          left: '100%',
          marginLeft: '0',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      bottom: {
        _after: {
          borderBottomColor: 'white',
          bottom: '100%',
          marginBottom: '-1px',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        _before: {
          borderBottomColor: 'teal.600',
          bottom: '100%',
          marginBottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
      left: {
        _after: {
          borderLeftColor: 'white',
          right: '100%',
          marginRight: '-1px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        _before: {
          borderLeftColor: 'teal.600',
          right: '100%',
          marginRight: '0',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
    },
  },
});

export const PopoverContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & {
    styleOverrides?: JsxStyleProps;
  }
>(({ style, className, children, styleOverrides, ...props }, propRef) => {
  const {
    context: floatingContext,
    refs,
    modal,
    open,
    floatingStyles,
    getFloatingProps,
    strategy,
    placement: computedPlacement,
  } = usePopoverContext();
  const ref = useMergeRefs([refs.setFloating, propRef]);

  const tooltipDirection = (
    computedPlacement.includes('-')
      ? computedPlacement.split('-')[0]
      : computedPlacement
  ) as Direction;
  const translate = TRANSLATE_MAP[tooltipDirection];
  const mergedRefs = useMergeRefs([refs.setFloating, ref]);

  if (!floatingContext.open) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={modal}>
        <AnimatePresence>
          <MotionBox
            className={classNames(
              'popover',
              tooltipDirection,
              className,
              css(styleOverrides),
              popoverStyle({
                arrowPlacement: tooltipDirection,
              }),
            )}
            initial={open}
            animate={open}
            variants={{
              true: { opacity: 1, translateX: 0, translateY: 0 },
              false: { opacity: 0, ...translate },
            }}
            transition={{ duration: 0.2 }}
            {...getFloatingProps({
              ...props,
              ref: mergedRefs,
              style: {
                ...style,
                ...floatingStyles,
                position: strategy,
                minWidth: 120,
              },
            })}
          >
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </MotionBox>
          </MotionBox>
        </AnimatePresence>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

PopoverContent.displayName = 'PopoverContent';
