import { defineConfig } from '@pandacss/dev';
import { presets as custom } from './panda/presets';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: ['./src/config'],

  presets: [custom],

  importMap: '@styles',

  // The output directory for your css system
  outdir: 'src/styled-system',
  jsxFramework: 'react',
});
