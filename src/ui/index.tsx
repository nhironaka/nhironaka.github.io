import { styled } from '@styled/jsx';

export const Text = styled('span');
export const Li = styled('li');
export const Ul = styled('ul');

export const Divider = styled('div', {
  base: {
    display: 'block',
    width: 'full',
    height: '1px',
    borderTop: '1px solid',
    borderTopColor: 'primary',
  },
});
