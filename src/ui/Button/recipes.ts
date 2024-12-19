import { cva } from '@styled/css';
import { token } from '@styled/tokens';

export const buttonRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 'sm',
    transition: 'all 0.2s ease-in-out',

    _focus: {
      outline: 'none',
    },

    _hover: {
      opacity: 0.8,
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
      bg: 'gray.50',
    },
  },

  variants: {
    buttonSize: {
      xs: {
        width: '120px',
        padding: `1px ${token('spacing.1')}`,
        fontSize: 'xs',

        '> svg': {
          width: 'xs',
        },
      },
      sm: {
        width: '180px',
        padding: `1px ${token('spacing.2')}`,
        fontSize: 'sm',

        '> svg': {
          width: 'sm',
        },
      },
      md: {
        width: '240px',
        padding: `1px ${token('spacing.2.5')}`,
        fontSize: 'md',

        '> svg': {
          width: 'md',
        },
      },
      lg: {
        width: '360px',
        padding: `1px ${token('spacing.3')}`,
        fontSize: 'lg',

        '> svg': {
          width: 'lg',
        },
      },
    },
    buttonTheme: {
      primary: {
        color: 'violet.800',
      },
      secondary: {
        color: 'orange.600',
      },
      error: {
        color: 'red.700',
      },
      success: {
        color: 'green.600',
      },
    },
    buttonStyle: {
      text: {
        bg: 'transparent',
        borderColor: 'transparent',
        width: 'auto',
      },

      outline: {
        borderStyle: 'solid',
        borderWidth: '1px',
      },

      filled: {
        color: 'white',
        border: 'none',
      },
    },
  },
  compoundVariants: [
    {
      buttonTheme: 'primary',
      buttonStyle: 'outline',
      css: {
        borderColor: 'violet.800',
      },
    },
    {
      buttonTheme: 'secondary',
      buttonStyle: 'outline',
      css: {
        borderColor: 'orange.600',
      },
    },
    {
      buttonTheme: 'error',
      buttonStyle: 'outline',
      css: {
        borderColor: 'red.700',
      },
    },
    {
      buttonTheme: 'success',
      buttonStyle: 'outline',
      css: {
        borderColor: 'green.600',
      },
    },

    {
      buttonTheme: 'primary',
      buttonStyle: 'filled',
      css: {
        color: 'white',
        bg: 'violet.800',
      },
    },
    {
      buttonTheme: 'secondary',
      buttonStyle: 'filled',
      css: {
        color: 'white',
        bg: 'orange.600',
      },
    },
    {
      buttonTheme: 'error',
      buttonStyle: 'filled',
      css: {
        color: 'white',
        bg: 'red.700',
      },
    },
    {
      buttonTheme: 'success',
      buttonStyle: 'filled',
      css: {
        color: 'white',
        bg: 'green.600',
      },
    },
  ],
});
