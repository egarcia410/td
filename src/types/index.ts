export interface ICoordinates {
  x: number;
  y: number;
}

export interface ITerrainColors {
  path: { primary: string; secondary: string };
  obstacle: { primary: string; secondary: string };
  main: { primary: string; secondary: string };
  other: { primary: string; secondary: string };
}

export enum CellVariantEnum {
  PATH = "PATH",
  OBSTACLE = "OBSTACLE",
  MAIN = "MAIN",
  OTHER = "OTHER",
}
