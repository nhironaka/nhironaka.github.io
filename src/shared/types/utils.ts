import type { CSSProperties, HTMLAttributes } from 'react';

export type ConstValues<T extends { [key: string]: unknown }> = T[keyof T];

export interface CustomDisplayProperties {
  p: CSSProperties['padding'];
  pl: CSSProperties['padding'];
  pr: CSSProperties['padding'];
  pt: CSSProperties['padding'];
  pb: CSSProperties['padding'];
  px: CSSProperties['padding'];
  py: CSSProperties['padding'];
  // margins
  ml: CSSProperties['margin'];
  mr: CSSProperties['margin'];
  mt: CSSProperties['margin'];
  mb: CSSProperties['margin'];
  mm: CSSProperties['margin'];
  mx: CSSProperties['margin'];
  my: CSSProperties['margin'];

  bg: CSSProperties['background'];
}

export type ComponentAttributes<E extends HTMLElement = HTMLElement> =
  HTMLAttributes<E> & CSSProperties & Partial<CustomDisplayProperties>;
