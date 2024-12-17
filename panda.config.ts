import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          ivory: { value: '#f4f1de' },
          peach: {
            950: { value: '#160f02' },
            900: { value: '#2d1e05' },
            800: { value: '#5b3c0a' },
            700: { value: '#895a0f' },
            600: { value: '#b67815' },
            500: { value: '#e4961a' },
            400: { value: '#e9ab48' },
            300: { value: '#efc075' },
            200: { value: '#f4d5a3' },
            100: { value: '#f9ead1' },
            50: { value: '#fcf4e8' },
          },
          terraCotta: {
            950: { value: '#150704' },
            900: { value: '#2a0f08' },
            800: { value: '#551e10' },
            700: { value: '#802e18' },
            600: { value: '#aa3d21' },
            500: { value: '#d54d29' },
            400: { value: '#dd7054' },
            300: { value: '#e6947e' },
            200: { value: '#eeb7a9' },
            100: { value: '#f6dbd4' },
            50: { value: '#faede9' },
          },
          dustyTeal: {
            950: { value: '#090f0c' },
            900: { value: '#131f19' },
            800: { value: '#263f33' },
            700: { value: '#3a5e4c' },
            600: { value: '#4d7e66' },
            500: { value: '#609e80' },
            400: { value: '#80b199' },
            300: { value: '#a0c4b2' },
            200: { value: '#bfd8cc' },
            100: { value: '#dfebe5' },
            50: { value: '#eff5f2' },
          },
          gunmetalBlue: {
            950: { value: '#0a0a0f' },
            900: { value: '#14151e' },
            800: { value: '#282a3d' },
            700: { value: '#3d405b' },
            600: { value: '#51557a' },
            500: { value: '#666b98' },
            400: { value: '#8488ad' },
            300: { value: '#a3a6c1' },
            200: { value: '#c1c3d6' },
            100: { value: '#e0e1ea' },
            50: { value: '#eff0f4' },
          },
          darkViolet: {
            50: { value: '#0d0a0e' },
            100: { value: '#1a151d' },
            200: { value: '#342b3a' },
            300: { value: '#4f4058' },
            400: { value: '#695675' },
            500: { value: '#836b93' },
            600: { value: '#9c89a8' },
            700: { value: '#b5a6be' },
            800: { value: '#cdc4d3' },
            900: { value: '#e6e1e9' },
            950: { value: '#f2f0f4' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  jsxFramework: 'react',
  importMap: '@styled',
});
