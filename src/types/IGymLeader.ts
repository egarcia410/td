import { TerrainEnum } from "./TerrainEnum";

export interface IGymLeader {
  name: string;
  location: string;
  terrain: TerrainEnum;
  badgeImg: string;
  badgeName: string;
}
