import classNames from 'classnames';
import type { CSSProperties } from 'react';

import {
  type ColorsTable,
  type HSLObject,
  type HexOpacity,
  type RGBObject,
  type TintShadesTable,
  type Tints,
} from '../types/styles';

const tints: TintShadesTable = {
  50: 0.95,
  100: 0.9,
  200: 0.75,
  300: 0.5,
  400: 0.2,
};

const shades: TintShadesTable = {
  600: 0.9,
  700: 0.7,
  800: 0.5,
  900: 0.3,
};

export const hexToRgb = (hex: string): RGBObject | null => {
  const components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!components) {
    return null;
  }
  return {
    r: parseInt(components[1], 16),
    g: parseInt(components[2], 16),
    b: parseInt(components[3], 16),
  };
};

export function rgbToHSL(rgb: RGBObject): HSLObject {
  let { r, g, b } = rgb;

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {
    h,
    s,
    l,
  };
}

export function hslToRGB(hsl: HSLObject): RGBObject {
  const { h } = hsl;
  let { s, l } = hsl;
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return {
    r,
    g,
    b,
  };
}

const hexPart = (c: number) => `0${c.toString(16)}`.slice(-2);

export const rgbToHex = (r: number, g: number, b: number) => {
  return `#${hexPart(r)}${hexPart(g)}${hexPart(b)}`;
};

const tintColor = (userHex: string, intensity: number) => {
  if (userHex) {
    const color = hexToRgb(userHex);
    if (color) {
      const r = Math.round(color.r + (255 - color.r) * intensity);
      const g = Math.round(color.g + (255 - color.g) * intensity);
      const b = Math.round(color.b + (255 - color.b) * intensity);
      return rgbToHex(r, g, b);
    }
  }
};

const shadeColor = (userHex: string, intensity: number) => {
  if (userHex) {
    const color = hexToRgb(userHex);
    if (color) {
      const r = Math.round(color.r * intensity);
      const g = Math.round(color.g * intensity);
      const b = Math.round(color.b * intensity);
      return rgbToHex(r, g, b);
    }
  }
};

export const generateColors = (userHex: string | null | undefined) => {
  if (!userHex || !validHex(userHex)) {
    throw new Error('generateColors - Invalid hex passed');
  }

  userHex = hexToSixCharacter(userHex);

  const colors = {} as ColorsTable;

  // Tints
  for (const key in tints) {
    const keyNum = Number(key) as Tints;
    const tint = tints[keyNum];
    colors[keyNum] = tintColor(userHex, tint!)!;
  }

  // Base
  colors[500] = userHex;

  // Shades
  for (const key in shades) {
    const keyNum = Number(key) as Tints;
    const shade = shades[keyNum];
    colors[keyNum] = shadeColor(userHex, shade!)!;
  }

  return colors;
};

export const hexOpacity: HexOpacity = {
  100: 'FF',
  99: 'FC',
  98: 'FA',
  97: 'F7',
  96: 'F5',
  95: 'F2',
  94: 'F0',
  93: 'ED',
  92: 'EB',
  91: 'E8',
  90: 'E6',
  89: 'E3',
  88: 'E0',
  87: 'DE',
  86: 'DB',
  85: 'D9',
  84: 'D6',
  83: 'D4',
  82: 'D1',
  81: 'CF',
  80: 'CC',
  79: 'C9',
  78: 'C7',
  77: 'C4',
  76: 'C2',
  75: 'BF',
  74: 'BD',
  73: 'BA',
  72: 'B8',
  71: 'B5',
  70: 'B3',
  69: 'B0',
  68: 'AD',
  67: 'AB',
  66: 'A8',
  65: 'A6',
  64: 'A3',
  63: 'A1',
  62: '9E',
  61: '9C',
  60: '99',
  59: '96',
  58: '94',
  57: '91',
  56: '8F',
  55: '8C',
  54: '8A',
  53: '87',
  52: '85',
  51: '82',
  50: '80',
  49: '7D',
  48: '7A',
  47: '78',
  46: '75',
  45: '73',
  44: '70',
  43: '6E',
  42: '6B',
  41: '69',
  40: '66',
  39: '63',
  38: '61',
  37: '5E',
  36: '5C',
  35: '59',
  34: '57',
  33: '54',
  32: '52',
  31: '4F',
  30: '4D',
  29: '4A',
  28: '47',
  27: '45',
  26: '42',
  25: '40',
  24: '3D',
  23: '3B',
  22: '38',
  21: '36',
  20: '33',
  19: '30',
  18: '2E',
  17: '2B',
  16: '29',
  15: '26',
  14: '24',
  13: '21',
  12: '1F',
  11: '1C',
  10: '1A',
  9: '17',
  8: '14',
  7: '12',
  6: '0F',
  5: '0D',
  4: '0A',
  3: '08',
  2: '05',
  1: '03',
  0: '00',
};

interface GetColorContrastProps {
  baseColor: string;
  contrastColors: {
    _: string;
    [key: string]: string;
  };
}

/**
 * Get the contrasting color for any hex color
 * @param props.baseColor - Base Hex code to check against.
 * @param props.contrastColors - An object of contrast numbers to return from. '_' is the fallback and required in the object.
 * This is the value used upto the first defined contrast number. The remaining keys can be any contrast number from 0 to 255.
 */
export const getContrastColor = ({
  baseColor,
  contrastColors,
}: GetColorContrastProps): string => {
  if (!validHex(baseColor)) {
    console.warn(`baseColor ${baseColor} is not a valid hex`);
    baseColor = '#000000';
  }

  baseColor = hexToSixCharacter(baseColor).replace(/^#/, '');

  // Get YIQ ratio
  const yiq = yiqRatio(baseColor);

  const { _: fallbackColor, ...contrastLevels } = contrastColors;

  // Sort the contrast keys largest first
  const sortedKeys = Object.keys(contrastLevels).sort((a, b) =>
    b.localeCompare(a, undefined, {
      numeric: true,
    }),
  );

  let returnValue = fallbackColor;

  // Find matching contrast ratio
  for (const key of sortedKeys) {
    const currentKeyAsNumber = parseInt(key, 10);

    // If the ratio is smaller than the value
    // of the key move onto the next key
    if (yiq < currentKeyAsNumber) {
      continue;
    }

    // else just return the color for the current key
    // and break
    returnValue = contrastColors[key];
    break;
  }

  return returnValue;
};

/** Get YIQ ratio
 *  The YIQ equation converts an RGB color to a YIQ value.
 *  YIQ is the standard formula for calculating the perceived brightness of a color,
 *  recommended by the W3C.
 *
 *  W3C Spec - https://www.w3.org/TR/AERT/#color-contrast
 */
export function yiqRatio(hexValue: string): number {
  // Convert to RGB value
  const { r, g, b } = hexToRgb(hexValue) as RGBObject;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Validates whether the given value is a valid hex code
 * @param {string} value Value to check if it's a valid hex
 * @returns {boolean}
 */
export function validHex(value: string): boolean {
  const matcher = /^#?([0-9A-F]{3,8})$/i;
  const match = matcher.exec(value);
  const length = match ? match[1].length : 0;

  return (
    length === 3 || // '#rgb' format
    length === 6 // '#rrggbb' format
  );
}

/**
 * Take a hex code and ensure it is a 6 character code
 * @param hexVal hex string
 * @returns hex string
 */
export function hexToSixCharacter(hexVal: string): string {
  if (!validHex(hexVal)) {
    throw new Error('Invalid hex passed to hexSixCharacter');
  }

  let strippedHex = hexVal.replace(/^#/, '');

  if (strippedHex.length === 3) {
    strippedHex = strippedHex.repeat(2);
  }

  return `#${strippedHex}`;
}

/**
 * Escapes all non-hexadecimal characters including "#"
 * @param {string} value Value remove non hex characters
 * @returns {string} string with only hex valid characters
 */
export function escapeNonHex(value: string): string {
  return value.replace(/([^0-9A-F]+)/gi, '').substring(0, 6);
}

const separator = ['-', '_', ' ', '.'];

const kebabCase = (str: string, separator: string[] = []) => {
  const tokens = new RegExp(`([A-Z${separator.join('')}])`, 'g');

  return str.replace(tokens, (val) => {
    return /[A-Z]/.test(val) ? `-${val.toLowerCase()}` : '-';
  });
};

export function parseProps({
  className,
  ...attr
}: CSSProperties & {
  className?: string;
}) {
  const classAttr: Record<string, boolean> = {};
  const dataAttr: Record<string, unknown> = {};
  Object.entries(attr).forEach(([property, style]) => {
    if (/^(data-|on[A-Z]|aria-)/.test(property)) {
      dataAttr[property] = style;
    } else if (style != null) {
      classAttr[
        `${kebabCase(property)}-${kebabCase(style.toString(), separator)}`
      ] = true;
    }
  }, {});

  return {
    ...dataAttr,
    className: classNames(className, classAttr),
  };
}

export function invertColor(hex: string) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str: string, len = 2) {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}
