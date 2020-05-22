import { TerrainEnum } from "../types/tower";
import { ITerrainColors } from "../types";

export const getTerrainColors = new Map<TerrainEnum, ITerrainColors>([
  [
    TerrainEnum.GRASS,
    {
      path: { primary: "#DCC767", secondary: "#A9975D" },
      land: { primary: "#98B866", secondary: "#60944A" },
      water: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
]);
