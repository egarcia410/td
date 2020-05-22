import { RegionsEnum } from "./game";

export enum AttackTypeEnum {
  GRASS = "GRASS",
  WATER = "WATER",
  FIRE = "FIRE",
}

export enum AttackSizeEnum {
  SMALL = 16,
  MEDIUM = 32,
  LARGE = 48,
}

export enum TerrainEnum {
  GRASS = "GRASS", // TODO: Make this the generic type
  ROCK = "ROCK",
  FIRE = "FIRE",
  WATER = "WATER",
  ICE = "ICE",
  FLYING = "FLYING",
  ELECTRIC = "ELECTRIC",
  POISON = "POISON",
  PSYCHIC = "PSYCHIC",
}

export enum RarityEnum {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
}

export enum DirectionEnum {
  NONE = "NONE",
  NORTH = "NORTH",
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST",
}

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

export interface ITower extends IBaseTower {
  id: string;
  speed: number;
  attack?: number;
  health: number;
}

export interface IEnemyTower extends ITower {
  coords: { x: number; y: number };
  currentPathWayIndex: number;
  delay: number;
  isActive: boolean;
  direction: DirectionEnum;
  maxHealth: number;
}

export interface IPartyTower extends ITower {}

export interface IFieldTower extends ITower {
  fieldCellId: number;
  lastShotTime: number;
}
