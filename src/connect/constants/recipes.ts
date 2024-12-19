import { cva } from '@styled/css';

export const tokenRecipe = cva({
  variants: {
    token: {
      red: {
        bg: 'indigo.500',
      },
      black: {
        bg: 'emerald.500',
      },
    },
  },
});
