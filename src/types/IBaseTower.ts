import { RarityEnum } from "./RarityEnum";
import { AttackSizeEnum } from "./AttackSizeEnum";
import { TerrainEnum } from "./TerrainEnum";
import { AttackTypeEnum } from "./AttackTypeEnum";
import { RegionsEnum } from "./RegionsEnum";

export interface IBaseTower {
  baseId: number;
  component: React.FC<any>;
  name: string;
  attackType: AttackTypeEnum;
  attackSize: AttackSizeEnum;
  attackColor: string;
  baseHealth: number;
  baseSpeed: number;
  baseAttack: number;
  range: number;
  terrain: TerrainEnum[];
  rarity: RarityEnum;
  region: RegionsEnum;
  exp: number;
  level: number;
  levelToEvolve: number | null;
  evolutionBaseId: number | null;
}
