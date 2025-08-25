import React from 'react';
import type { HTMLAttributes } from 'react';

export const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  'body-r': 'p',
  'body-s': 'p',
  'body-xs': 'p',
};

export type TypographyVariant = keyof typeof variantMapping;

export type TypographyColors = 'white' | 'info';

export type TypographyAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';

export type TypographyFontWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semi-bold'
  | 'bold'

export type TypographyFont = 'figtree' | 'raleway' | 'clashDisplay';

export interface TypographyProps extends HTMLAttributes<HTMLOrSVGElement> {
  tag?: keyof React.JSX.IntrinsicElements;
  variant?: TypographyVariant;
  color?: TypographyColors;
  fontWeight?: TypographyFontWeight;
  gutterBottom?: boolean;
  align?: TypographyAlign;
  noWrap?: boolean;
  underline?: 'none' | 'always' | 'hover';
  customClassName?: string;
  children?: React.ReactNode;
  font?: TypographyFont;
}
