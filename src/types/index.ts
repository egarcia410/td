export interface ICoordinates {
  x: number;
  y: number;
}

export interface ITerrainColors {
  path: { primary: string; secondary: string };
  obstacle: { primary: string; secondary: string };
  land: { primary: string; secondary: string };
  water: { primary: string; secondary: string };
}

export enum CellVariantEnum {
  PATH = "PATH",
  OBSTACLE = "OBSTACLE",
  LAND = "LAND",
  WATER = "WATER",
}
