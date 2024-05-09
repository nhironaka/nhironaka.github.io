import classNames from 'classnames';
import { motion, type MotionProps } from 'framer-motion';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import './button.scss';

interface Props
  extends MotionProps,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonStyle?: 'text' | 'outline' | 'filled';
  buttonTheme?: 'primary' | 'secondary' | 'error' | 'success';
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      buttonSize = 'sm',
      buttonStyle = 'outline',
      buttonTheme = 'primary',
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        className={classNames('button', buttonSize, buttonStyle, buttonTheme, {
          disabled,
        })}
        whileTap={{ scale: 0.8 }}
        {...rest}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
