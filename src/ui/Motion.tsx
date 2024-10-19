import { type HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

import { css } from '@styled/css';
import { splitCssProps, styled } from '@styled/jsx';
import { type ComponentProps } from '@styled/types';
import classNames from 'classnames';

const Div = styled(motion.div);

interface Props
  extends Omit<
      HTMLMotionProps<'div'>,
      'color' | 'content' | 'transition' | 'translate'
    >,
    Omit<ComponentProps<typeof Div>, 'transition' | 'translate' | 'children'> {
  motionTransition?: HTMLMotionProps<'div'>['transition'];
  motionTranslate?: HTMLMotionProps<'div'>['translate'];
  children?: ReactNode;
}

export type { Props as MotionBoxProps };

export const MotionBox = forwardRef<HTMLDivElement, Props>(
  ({ motionTransition, motionTranslate, className, ...props }, ref) => {
    const [cssProps, restProps] = splitCssProps(props);
    const { css: cssProp, ...styleProps } = cssProps;

    const cssClass = css(styleProps, cssProp);

    return (
      <motion.div
        ref={ref}
        className={classNames(className, cssClass)}
        transition={motionTransition}
        translate={motionTranslate}
        {...restProps}
      />
    );
  },
);
MotionBox.displayName = 'MotionBox';
