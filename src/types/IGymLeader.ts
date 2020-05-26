import { TerrainEnum } from "./TerrainEnum";
import { AttackTypeEnum } from "./AttackTypeEnum";

export interface IGymLeader {
  name: string;
  location: string;
  terrain: TerrainEnum;
  terrainTypes: TerrainEnum[];
  badgeImg: string;
  badgeName: string;
}
