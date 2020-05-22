import {
  IBaseTower,
  AttackTypeEnum,
  AttackSizeEnum,
  TerrainEnum,
  RarityEnum,
} from "../types/tower";
import * as towers from "../towers";
import { RegionsEnum } from "../types/game";
import { bulletColors } from "./bullets";

export const getBaseTowers = () => {
  const baseTowers = new Map<TerrainEnum, Map<RarityEnum, IBaseTower[]>>();
  const towersByTerrain = getBaseTowersByTerrain();
  towersByTerrain.forEach((towers, terrain) => {
    const towersByRarity = getBaseTowersByRarity(towers);
    baseTowers.set(terrain, towersByRarity);
  });
  return baseTowers;
};

export const getBaseTowersByTerrain = () => {
  const towersByTerrain = new Map<TerrainEnum, IBaseTower[]>();
  const airTerrainTowers: IBaseTower[] = [];
  allBaseTowers.forEach((bTower) => {
    bTower.terrain.forEach((terrain) => {
      if (terrain === TerrainEnum.FLYING) {
        airTerrainTowers.push(bTower);
      }
      const towers = towersByTerrain.get(terrain) || [];
      towersByTerrain.set(terrain, [...towers, bTower]);
    });
  });
  // Add air towers to all terrains
  towersByTerrain.forEach((towers, terrain) => {
    if (terrain !== TerrainEnum.FLYING) {
      airTerrainTowers.forEach((airTower) => {
        towersByTerrain.set(terrain, [...towers, airTower]);
      });
    }
  });
  return towersByTerrain;
};

export const getBaseTowersByRarity = (bTowers: IBaseTower[]) => {
  const towersByRarity = new Map<RarityEnum, IBaseTower[]>();
  bTowers.forEach((bTower) => {
    const towerByRarity = towersByRarity.get(bTower.rarity) || [];
    towersByRarity.set(bTower.rarity, [...towerByRarity, bTower]);
  });
  return towersByRarity;
};

// https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VIII-present)
export const allBaseTowers = new Map<number, IBaseTower>([
  [
    1,
    {
      baseId: 1,
      component: towers.Bulbasaur,
      name: "Bulbasaur",
      attackType: AttackTypeEnum.GRASS,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.GRASS)!,
      baseHealth: 45,
      baseAttack: 49,
      baseSpeed: 45,
      range: 1,
      terrain: [TerrainEnum.GRASS],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 2,
      evolutionBaseId: 2,
    },
  ],
  [
    2,
    {
      baseId: 2,
      component: towers.Ivysaur,
      name: "Ivysaur",
      attackType: AttackTypeEnum.GRASS,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.GRASS)!,
      baseHealth: 60,
      baseAttack: 62,
      baseSpeed: 60,
      range: 2,
      terrain: [TerrainEnum.GRASS],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 5,
      evolutionBaseId: 3,
    },
  ],
  [
    3,
    {
      baseId: 3,
      component: towers.Venusaur,
      name: "Venusaur",
      attackType: AttackTypeEnum.GRASS,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.GRASS)!,
      baseHealth: 80,
      baseAttack: 100,
      baseSpeed: 80,
      range: 3,
      terrain: [TerrainEnum.GRASS],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    4,
    {
      baseId: 4,
      component: towers.Charmander,
      name: "Charmander",
      attackType: AttackTypeEnum.FIRE,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.FIRE)!,
      baseHealth: 39,
      baseAttack: 52,
      baseSpeed: 65,
      range: 1,
      terrain: [TerrainEnum.GRASS],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 5,
      evolutionBaseId: 5,
    },
  ],
  [
    5,
    {
      baseId: 5,
      component: towers.Charmeleon,
      name: "Charmeleon",
      attackType: AttackTypeEnum.FIRE,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.FIRE)!,
      baseHealth: 58,
      baseAttack: 64,
      baseSpeed: 65,
      range: 2,
      terrain: [TerrainEnum.GRASS],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 8,
      evolutionBaseId: 6,
    },
  ],
  [
    6,
    {
      baseId: 6,
      component: towers.Charizard,
      name: "Charizard",
      attackType: AttackTypeEnum.FIRE,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.FIRE)!,
      baseHealth: 78,
      baseAttack: 84,
      baseSpeed: 100,
      range: 3,
      terrain: [TerrainEnum.GRASS, TerrainEnum.FLYING],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    7,
    {
      baseId: 7,
      component: towers.Squirtle,
      name: "Squirtle",
      attackType: AttackTypeEnum.WATER,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.WATER)!,
      baseHealth: 44,
      baseAttack: 48,
      baseSpeed: 43,
      range: 1,
      terrain: [TerrainEnum.WATER],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 5,
      evolutionBaseId: 8,
    },
  ],
  [
    8,
    {
      baseId: 8,
      component: towers.Wartortle,
      name: "Wartortle",
      attackType: AttackTypeEnum.WATER,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.WATER)!,
      baseHealth: 59,
      baseAttack: 63,
      baseSpeed: 58,
      range: 2,
      terrain: [TerrainEnum.WATER],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 8,
      evolutionBaseId: 9,
    },
  ],
  [
    9,
    {
      baseId: 9,
      component: towers.Blastoise,
      name: "Blastoise",
      attackType: AttackTypeEnum.WATER,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.WATER)!,
      baseHealth: 79,
      baseAttack: 83,
      baseSpeed: 78,
      range: 3,
      terrain: [TerrainEnum.WATER],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
]);
