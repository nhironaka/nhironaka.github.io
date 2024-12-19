import { type RecipeVariantProps, css } from '@styled/css';
import { splitCssProps } from '@styled/jsx';
import { buttonRecipe } from '@ui/Button/recipes';
import classNames from 'classnames';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { type PropsWithChildren, forwardRef } from 'react';

type Props = PropsWithChildren<
  {
    buttonTheme?: 'primary' | 'secondary' | 'error' | 'success';
    disabled?: boolean;
  } & RecipeVariantProps<typeof buttonRecipe> &
    HTMLMotionProps<'button'>
>;

export type { Props as ButtonProps };

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      buttonSize = 'sm',
      buttonStyle = 'outline',
      buttonTheme = 'primary',
      disabled,
      ...props
    },
    ref,
  ) => {
    const [cssProps, restProps] = splitCssProps(props);
    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        className={classNames(
          css(cssProps),
          buttonRecipe({
            buttonSize,
            buttonStyle,
            buttonTheme,
          }),
        )}
        whileTap={{ scale: 0.8 }}
        {...restProps}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
