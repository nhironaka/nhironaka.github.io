import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  html: {
    height: '100%',
    fontSize: '100%',
    letterSpacing: '-0.01em',
    lineHeight: 'base',
    fontFamily: 'sans',
    fontFeatureSettings: "'liga' 1, 'calt' 1",
  },
  '@supports (font-variation-settings: normal)': {
    html: {
      fontFamily: 'InterVariable, sans-serif',
    },
  },
  body: {
    color: 'gray.500',
    background: 'gray.50',
    lineHeight: 'base',
    margin: 0,
  },
  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
  a: {
    color: 'blue.500',
    transition: 'color 300ms ease',
    _hover: {
      color: 'blue.700',
    },
  },
  'h1, h2, h3, h4, h5, h6': {
    display: 'block',
    color: 'gray.700',
    fontWeight: 'semibold',
    textAlign: 'left',
  },
  h1: {
    fontSize: '4xl',
  },
  h2: {
    fontSize: '3xl',
  },
  h3: {
    fontSize: '2xl',
  },
  h4: {
    fontSize: 'xl',
  },
  h5: {
    fontSize: 'md',
  },
  h6: {
    fontSize: 'sm',
  },
  'b, strong': {
    fontWeight: 'bold',
  },
  'em, i': {
    fontStyle: 'italic',
  },
  '.product-tour-element': {
    borderRadius: '4px',
    outlineWidth: '4px',
    outlineStyle: 'solid',
    outlineColor: 'amber.500',
    animation: 'productTourPulse 1500ms ease-in-out infinite',
  },
  '[role="button"]': {
    cursor: 'pointer',
  },
});
