import { TerrainEnum } from "../types";
import { ITerrainColors } from "../types/ITerrainColors";

export const terrainColors = new Map<TerrainEnum, ITerrainColors>([
  [
    TerrainEnum.ROCK,
    {
      path: { primary: "#AD9D61", secondary: "#917547" },
      main: { primary: "#D8C161", secondary: "#CFC493" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.GRASS,
    {
      path: { primary: "#B2D995", secondary: "#8BC560" },
      main: { primary: "#98B866", secondary: "#60944A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.WATER,
    {
      path: { primary: "#A1B8F0", secondary: "#6D91E9" },
      main: { primary: "#7DBDC5", secondary: "#529AA0" },
      other: { primary: "#98B866", secondary: "#60944A" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.ELECTRIC,
    {
      path: { primary: "#FAFA57", secondary: "#F3D054" },
      main: { primary: "#A58A65", secondary: "#87655A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.POISON,
    {
      path: { primary: "#B887BD", secondary: "#94499B" },
      main: { primary: "#A58A65", secondary: "#87655A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.PSYCHIC,
    {
      path: { primary: "#EC98B2", secondary: "#E76488" },
      main: { primary: "#A58A65", secondary: "#87655A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.FIRE,
    {
      path: { primary: "#E38544", secondary: "#EBAE80" },
      main: { primary: "#A58A65", secondary: "#87655A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.GROUND,
    {
      path: { primary: "#E8D6A4", secondary: "#DCC075" },
      main: { primary: "#98B866", secondary: "#60944A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
]);
