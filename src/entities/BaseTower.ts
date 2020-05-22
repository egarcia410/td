import {
  AttackTypeEnum,
  AttackSizeEnum,
  TerrainEnum,
  RarityEnum,
  RegionsEnum,
} from "../types";

export class BaseTower {
  id: string;
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
  constructor(
    id: string,
    baseId: number,
    component: React.FC<any>,
    name: string,
    attackType: AttackTypeEnum,
    attackSize: AttackSizeEnum,
    attackColor: string,
    baseHealth: number,
    baseSpeed: number,
    baseAttack: number,
    range: number,
    terrain: TerrainEnum[],
    rarity: RarityEnum,
    region: RegionsEnum,
    exp: number,
    level: number,
    levelToEvolve: number | null,
    evolutionBaseId: number | null
  ) {
    this.id = id;
    this.baseId = baseId;
    this.component = component;
    this.name = name;
    this.attackType = attackType;
    this.attackSize = attackSize;
    this.attackColor = attackColor;
    this.baseHealth = baseHealth;
    this.baseSpeed = baseSpeed;
    this.baseAttack = baseAttack;
    this.range = range;
    this.terrain = terrain;
    this.rarity = rarity;
    this.region = region;
    this.exp = exp;
    this.level = level;
    this.levelToEvolve = levelToEvolve;
    this.evolutionBaseId = evolutionBaseId;
  }
}
