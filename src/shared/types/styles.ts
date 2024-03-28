export type RGBObject = {
  r: number;
  g: number;
  b: number;
};

export interface HSLObject {
  h: number;
  s: number;
  l: number;
}

export type Tints = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TintShadesTable = {
  [P in Tints]?: number;
};

export type ColorsTable = {
  [P in Tints]: string;
};

export type HexOpacity = {
  [key: number]: string;
};
