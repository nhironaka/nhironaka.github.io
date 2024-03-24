import { definePreset } from '@pandacss/dev';
import {
  backgroundColors,
  baseColors,
  boardPalette,
  borderColors,
  textColors,
} from './colors';
import { globalCss } from './globalCss';
import { fontSizes, radii, shadows, spacing } from './utils';

export const presets = definePreset({
  theme: {
    extend: {
      tokens: {
        colors: { ...baseColors, ...boardPalette },
        fontSizes,
        radii,
        shadows,
        spacing,
      },
      semanticTokens: {
        colors: {
          text: textColors,
          borders: borderColors,
          background: backgroundColors,
        },
      },
    },
  },
  globalCss,
});
