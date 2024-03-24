import { defineSemanticTokens, defineTokens } from '@pandacss/dev';

export const baseColors = defineTokens.colors({
  black: { value: '#010101' },
  blackAlpha: {
    50: { value: 'rgba(0, 0, 0, 0.04)' },
    100: { value: 'rgba(0, 0, 0, 0.06)' },
    200: { value: 'rgba(0, 0, 0, 0.08)' },
    300: { value: 'rgba(0, 0, 0, 0.16)' },
    400: { value: 'rgba(0, 0, 0, 0.24)' },
    500: { value: 'rgba(0, 0, 0, 0.36)' },
    600: { value: 'rgba(0, 0, 0, 0.48)' },
    700: { value: 'rgba(0, 0, 0, 0.64)' },
    800: { value: 'rgba(0, 0, 0, 0.80)' },
    900: { value: 'rgba(0, 0, 0, 0.92)' },
  },
  white: { value: '#FFFFFF' },
  whiteAlpha: {
    50: { value: 'rgba(255, 255, 255, 0.04)' },
    100: { value: 'rgba(255, 255, 255, 0.06)' },
    200: { value: 'rgba(255, 255, 255, 0.08)' },
    300: { value: 'rgba(255, 255, 255, 0.16)' },
    400: { value: 'rgba(255, 255, 255, 0.24)' },
    500: { value: 'rgba(255, 255, 255, 0.36)' },
    600: { value: 'rgba(255, 255, 255, 0.48)' },
    700: { value: 'rgba(255, 255, 255, 0.64)' },
    800: { value: 'rgba(255, 255, 255, 0.80)' },
    900: { value: 'rgba(255, 255, 255, 0.92)' },
  },
  violet: {
    50: { value: '#f5f3ff' },
    100: { value: '#ede9fe' },
    200: { value: '#ddd6fe' },
    300: { value: '#c4b5fd' },
    400: { value: '#a78bfa' },
    500: { value: '#8b5cf6' },
    600: { value: '#7c3aed' },
    700: { value: '#6d28d9' },
    800: { value: '#5b21b6' },
    900: { value: '#4c1d95' },
  },
  indigo: {
    50: { value: '#eef2ff' },
    100: { value: '#e0e7ff' },
    200: { value: '#c7d2fe' },
    300: { value: '#a5b4fc' },
    400: { value: '#818cf8' },
    500: { value: '#6366f1' },
    600: { value: '#4f46e5' },
    700: { value: '#4338ca' },
    800: { value: '#3730a3' },
    900: { value: '#312e81' },
  },
  blue: {
    50: { value: '#eff6ff' },
    100: { value: '#dbeafe' },
    200: { value: '#bfdbfe' },
    300: { value: '#93c5fd' },
    400: { value: '#60a5fa' },
    500: { value: '#3b82f6' },
    600: { value: '#2563eb' },
    700: { value: '#1d4ed8' },
    800: { value: '#1e40af' },
    900: { value: '#1e3a8a' },
  },
  lightBlue: {
    50: { value: '#f0f9ff' },
    100: { value: '#e0f2fe' },
    200: { value: '#bae6fd' },
    300: { value: '#7dd3fc' },
    400: { value: '#38bdf8' },
    500: { value: '#0ea5e9' },
    600: { value: '#0284c7' },
    700: { value: '#0369a1' },
    800: { value: '#075985' },
    900: { value: '#0c4a6e' },
  },
  cyan: {
    50: { value: '#ecfeff' },
    100: { value: '#cffafe' },
    200: { value: '#a5f3fc' },
    300: { value: '#67e8f9' },
    400: { value: '#22d3ee' },
    500: { value: '#06b6d4' },
    600: { value: '#0891b2' },
    700: { value: '#0e7490' },
    800: { value: '#155e75' },
    900: { value: '#164e63' },
  },
  teal: {
    50: { value: '#f0fdfa' },
    100: { value: '#ccfbf1' },
    200: { value: '#99f6e4' },
    300: { value: '#5eead4' },
    400: { value: '#2dd4bf' },
    500: { value: '#14b8a6' },
    600: { value: '#0d9488' },
    700: { value: '#0f766e' },
    800: { value: '#115e59' },
    900: { value: '#134e4a' },
  },
  emerald: {
    50: { value: '#ecfdf5' },
    100: { value: '#d1fae5' },
    200: { value: '#a7f3d0' },
    300: { value: '#6ee7b7' },
    400: { value: '#34d399' },
    500: { value: '#10b981' },
    600: { value: '#059669' },
    700: { value: '#047857' },
    800: { value: '#065f46' },
    900: { value: '#064e3b' },
  },
  green: {
    50: { value: '#f0fdf4' },
    100: { value: '#dcfce7' },
    200: { value: '#bbf7d0' },
    300: { value: '#86efac' },
    400: { value: '#4ade80' },
    500: { value: '#22c55e' },
    600: { value: '#16a34a' },
    700: { value: '#15803d' },
    800: { value: '#166534' },
    900: { value: '#14532d' },
  },
  yellow: {
    50: { value: '#fefce8' },
    100: { value: '#fef9c3' },
    200: { value: '#fef08a' },
    300: { value: '#fde047' },
    400: { value: '#facc15' },
    500: { value: '#eab308' },
    600: { value: '#ca8a04' },
    700: { value: '#a16207' },
    800: { value: '#854d0e' },
    900: { value: '#713f12' },
  },
  orange: {
    50: { value: '#fff7ed' },
    100: { value: '#ffedd5' },
    200: { value: '#fed7aa' },
    300: { value: '#fdba74' },
    400: { value: '#fb923c' },
    500: { value: '#f97316' },
    600: { value: '#ea580c' },
    700: { value: '#c2410c' },
    800: { value: '#9a3412' },
    900: { value: '#7c2d12' },
  },
  red: {
    50: { value: '#fef2f2' },
    100: { value: '#fee2e2' },
    200: { value: '#fecaca' },
    300: { value: '#fca5a5' },
    400: { value: '#f87171' },
    500: { value: '#ef4444' },
    600: { value: '#dc2626' },
    700: { value: '#b91c1c' },
    800: { value: '#991b1b' },
    900: { value: '#7f1d1d' },
  },
  gray: {
    50: { value: '#f8fafc' },
    100: { value: '#f1f5f9' },
    200: { value: '#e2e8f0' },
    300: { value: '#cbd5e1' },
    400: { value: '#94a3b8' },
    500: { value: '#64748b' },
    600: { value: '#475569' },
    700: { value: '#334155' },
    800: { value: '#1e293b' },
    900: { value: '#0f172a' },
  },
  navy: {
    50: { value: '#F2F4F7' },
    100: { value: '#E6E8EE' },
    200: { value: '#BFC6D5' },
    300: { value: '#99A4BB' },
    400: { value: '#4D5F89' },
    500: { value: '#001B56' },
    600: { value: '#00184D' },
    700: { value: '#001034' },
    800: { value: '#000C27' },
    900: { value: '#00081A' },
  },
});

export const backgroundColors = defineSemanticTokens.colors({
  primary: { value: '{colors.gray.50}' },
  secondary: { value: '{colors.gray.100}' },
  success: { value: '{colors.green.100}' },
  warning: { value: '{colors.orange.100}' },
  error: { value: '{colors.red.50}' },
  info: { value: '{colors.blue.50}' },
});

export const borderColors = defineSemanticTokens.colors({
  DEFAULT: { value: '{colors.gray.300}' },
  light: { value: '{colors.gray.200}' },
  heavy: { value: '{colors.gray.400}' },
  success: { value: '{colors.green.700}' },
  warning: { value: '{colors.orange.700}' },
  error: { value: '{colors.red.700}' },
  info: { value: '{colors.blue.700}' },
});

export const textColors = defineSemanticTokens.colors({
  primary: { value: '{colors.gray.700}' },
  secondary: { value: '{colors.gray.500}' },
  disabled: { value: '{colors.gray.300}' },
  success: { value: '{colors.green.700}' },
  warning: { value: '{colors.orange.700}' },
  error: { value: '{colors.red.700}' },
  info: { value: '{colors.blue.700}' },
});

export const boardPalette = defineTokens.colors({
  cell: {
    focus: { value: '#f5c24c' },
    body: { value: '#fcea64' },
    hover: { value: '#f7d359' },
  },
  board: {
    focus: { value: '#017c74' },
    body: { value: '#8ecfca' },
    hover: { value: '#7cc9c3' },
  },
  error: {
    focus: { value: '#ff7c69' },
    body: { value: '#ef758a' },
    hover: { value: '#febdc3' },
  },
  success: {
    focus: { value: '#686893' },
    body: { value: '#a4d4a2' },
    hover: { value: '#88c9a1' },
  },
  bg: {
    focus: { value: '#786951' },
    body: { value: '#f8eebc' },
    hover: { value: '#fff9e5' },
  },
});
