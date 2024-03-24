// @ts-check

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default [eslintPluginPrettierRecommended, tseslint.configs.recommended];
