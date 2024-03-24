import { defineTokens } from '@pandacss/dev';

export const fontSizes = defineTokens.fontSizes({
  '2xs': { value: '0.625rem' },
  xs: { value: '0.75rem' },
  sm: { value: '0.875rem' },
  md: { value: '1rem' },
  lg: { value: '1.125rem' },
  xl: { value: '1.25rem' },
  '2xl': { value: '1.5rem' },
  '3xl': { value: '1.875rem' },
  '4xl': { value: '2.25rem' },
  '5xl': { value: '3rem' },
  '6xl': { value: '3.75rem' },
  '7xl': { value: '4.5rem' },
  '8xl': { value: '6rem' },
  '9xl': { value: '8rem' },
});

export const radii = defineTokens.radii({
  none: { value: '0' },
  sm: { value: '0.125rem' },
  md: { value: '0.25rem' },
  lg: { value: '0.5rem' },
  xl: { value: '0.75rem' },
  '2xl': { value: '1rem' },
  '3xl': { value: '1.5rem' },
  full: { value: '9999px' },
});

export const shadows = defineTokens.shadows({
  base: {
    value: [
      '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      '0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    ],
  },
  sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  md: {
    value: [
      '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    ],
  },
  lg: {
    value: [
      '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      '0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    ],
  },
  xl: {
    value: [
      '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      '0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    ],
  },
  '2xl': { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  baseReverse: {
    value: [
      '0 -1px 3px 0 rgba(0, 0, 0, 0.1)',
      '0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    ],
  },
  smReverse: { value: '0 -1px 2px 0 rgba(0, 0, 0, 0.05)' },
  mdReverse: {
    value: [
      '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
      '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    ],
  },
  lgReverse: {
    value: [
      '0 -10px 15px -3px rgba(0, 0, 0, 0.1)',
      '0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    ],
  },
  xlReverse: {
    value: [
      '0 -20px 25px -5px rgba(0, 0, 0, 0.1)',
      '0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    ],
  },
  '2xlReverse': { value: '0 -25px 50px -12px rgba(0, 0, 0, 0.25)' },
  inner: { value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' },
  noneAnim: { value: '0 0 0 0 rgba(0, 0, 0, 0)' },
  none: { value: 'none' },
});

export const spacing = defineTokens.spacing({
  auto: { value: 'auto' },
  px: { value: '1px' },
  0: { value: '0rem' },
  0.5: { value: '0.125rem' },
  1: { value: '0.25rem' },
  1.5: { value: '0.375rem' },
  2: { value: '0.5rem' },
  2.5: { value: '0.625rem' },
  3: { value: '0.75rem' },
  3.5: { value: '0.875rem' },
  4: { value: '1rem' },
  5: { value: '1.25rem' },
  6: { value: '1.5rem' },
  7: { value: '1.75rem' },
  8: { value: '2rem' },
  9: { value: '2.25rem' },
  10: { value: '2.5rem' },
  11: { value: '2.75rem' },
  12: { value: '3rem' },
  14: { value: '3.5rem' },
  16: { value: '4rem' },
  20: { value: '5rem' },
  24: { value: '6rem' },
  28: { value: '7rem' },
  32: { value: '8rem' },
  36: { value: '9rem' },
  40: { value: '10rem' },
  44: { value: '11rem' },
  48: { value: '12rem' },
  52: { value: '13rem' },
  56: { value: '14rem' },
  60: { value: '15rem' },
  64: { value: '16rem' },
  72: { value: '18rem' },
  80: { value: '20rem' },
  96: { value: '24rem' },
});
