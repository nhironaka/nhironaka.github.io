import { cva } from '@styled/css';

export const tokenSize = cva({
  variants: {
    numPlayers: {
      2: {
        width: '60px',
        height: '60px',
      },
      3: {
        width: '55px',
        height: '55px',
      },
      4: {
        width: '50px',
        height: '50px',
      },
    },
  },
});
