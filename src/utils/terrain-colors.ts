import { TerrainEnum } from "../types";
import { ITerrainColors } from "../types/ITerrainColors";

export const terrainColors = new Map<TerrainEnum, ITerrainColors>([
  [
    TerrainEnum.GRASS,
    {
      path: { primary: "#DCC767", secondary: "#A9975D" },
      main: { primary: "#98B866", secondary: "#60944A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.WATER,
    {
      path: { primary: "#529AA0", secondary: "#7DBDC5" },
      main: { primary: "#7DBDC5", secondary: "#529AA0" },
      other: { primary: "#98B866", secondary: "#60944A" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
]);
