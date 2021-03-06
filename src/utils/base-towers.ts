import {
  AttackTypeEnum,
  AttackSizeEnum,
  TerrainEnum,
  RarityEnum,
  RegionsEnum,
} from "../types";
import { IBaseTower } from "../types/IBaseTower";
import * as towers from "../towers";
import { bulletColors } from "./bullet-colors";

export const getBaseTowersByRegion = (region: RegionsEnum) => {
  const baseTowers = new Map<TerrainEnum, Map<RarityEnum, IBaseTower[]>>();
  const towersByTerrain = sortBaseTowersByTerrainAndRegion(region);
  towersByTerrain.forEach((towers, terrain) => {
    const towersByRarity = sortBaseTowersByRarity(towers);
    baseTowers.set(terrain, towersByRarity);
  });
  return baseTowers;
};

export const sortBaseTowersByTerrainAndRegion = (region: RegionsEnum) => {
  const towersByTerrain = new Map<TerrainEnum, IBaseTower[]>();
  const airTerrainTowers: IBaseTower[] = [];
  allBaseTowers.forEach((bTower) => {
    if (bTower.region === region) {
      bTower.terrain.forEach((terrain) => {
        if (terrain === TerrainEnum.FLYING) {
          airTerrainTowers.push(bTower);
        }
        const towers = towersByTerrain.get(terrain) || [];
        towersByTerrain.set(terrain, [...towers, bTower]);
      });
    }
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

export const getAllBaseTowers = () => {
  const baseTowers = new Map<TerrainEnum, Map<RarityEnum, IBaseTower[]>>();
  const towersByTerrain = sortAllBaseTowersByTerrain();
  towersByTerrain.forEach((towers, terrain) => {
    const towersByRarity = sortBaseTowersByRarity(towers);
    baseTowers.set(terrain, towersByRarity);
  });
  return baseTowers;
};

export const sortAllBaseTowersByTerrain = () => {
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

export const sortBaseTowersByRarity = (bTowers: IBaseTower[]) => {
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
      levelToEvolve: 10,
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
      levelToEvolve: 16,
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
      terrain: [TerrainEnum.FIRE],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
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
      terrain: [TerrainEnum.FIRE],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
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
      terrain: [TerrainEnum.FIRE, TerrainEnum.FLYING],
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
      levelToEvolve: 10,
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
      levelToEvolve: 16,
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
  [
    10,
    {
      baseId: 10,
      component: towers.Caterpie,
      name: "Caterpie",
      attackType: AttackTypeEnum.BUG,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.BUG)!,
      baseHealth: 45,
      baseAttack: 30,
      baseSpeed: 45,
      range: 1,
      terrain: [TerrainEnum.GRASS, TerrainEnum.BUG],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 11,
    },
  ],
  [
    11,
    {
      baseId: 11,
      component: towers.Metapod,
      name: "Metapod",
      attackType: AttackTypeEnum.BUG,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.BUG)!,
      baseHealth: 50,
      baseAttack: 20,
      baseSpeed: 30,
      range: 2,
      terrain: [TerrainEnum.GRASS, TerrainEnum.BUG],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 12,
    },
  ],
  [
    12,
    {
      baseId: 12,
      component: towers.Butterfree,
      name: "Butterfree",
      attackType: AttackTypeEnum.FLYING,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.FLYING)!,
      baseHealth: 60,
      baseAttack: 45,
      baseSpeed: 70,
      range: 3,
      terrain: [TerrainEnum.GRASS, TerrainEnum.BUG, TerrainEnum.FLYING],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    13,
    {
      baseId: 13,
      component: towers.Weedle,
      name: "Weedle",
      attackType: AttackTypeEnum.BUG,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.BUG)!,
      baseHealth: 40,
      baseAttack: 35,
      baseSpeed: 50,
      range: 1,
      terrain: [TerrainEnum.GRASS, TerrainEnum.BUG, TerrainEnum.POISON],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 14,
    },
  ],
  [
    14,
    {
      baseId: 14,
      component: towers.Kakuna,
      name: "Kakuna",
      attackType: AttackTypeEnum.BUG,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.BUG)!,
      baseHealth: 45,
      baseAttack: 25,
      baseSpeed: 35,
      range: 2,
      terrain: [TerrainEnum.GRASS, TerrainEnum.BUG, TerrainEnum.POISON],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 15,
    },
  ],
  [
    15,
    {
      baseId: 15,
      component: towers.Beedrill,
      name: "Beedrill",
      attackType: AttackTypeEnum.BUG,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.BUG)!,
      baseHealth: 55,
      baseAttack: 90,
      baseSpeed: 75,
      range: 3,
      terrain: [TerrainEnum.GRASS, TerrainEnum.BUG, TerrainEnum.POISON],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    16,
    {
      baseId: 16,
      component: towers.Pidgey,
      name: "Pidgey",
      attackType: AttackTypeEnum.FLYING,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.FLYING)!,
      baseHealth: 40,
      baseAttack: 45,
      baseSpeed: 56,
      range: 1,
      terrain: [TerrainEnum.GRASS, TerrainEnum.NORMAL, TerrainEnum.FLYING],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 17,
    },
  ],
  [
    17,
    {
      baseId: 17,
      component: towers.Pidgeotto,
      name: "Pidgeotto",
      attackType: AttackTypeEnum.FLYING,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.FLYING)!,
      baseHealth: 63,
      baseAttack: 60,
      baseSpeed: 71,
      range: 2,
      terrain: [TerrainEnum.GRASS, TerrainEnum.NORMAL, TerrainEnum.FLYING],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 18,
    },
  ],
  [
    18,
    {
      baseId: 18,
      component: towers.Pidgeot,
      name: "Pidgeot",
      attackType: AttackTypeEnum.FLYING,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.FLYING)!,
      baseHealth: 83,
      baseAttack: 80,
      baseSpeed: 101,
      range: 3,
      terrain: [TerrainEnum.GRASS, TerrainEnum.NORMAL, TerrainEnum.FLYING],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    19,
    {
      baseId: 19,
      component: towers.Rattata,
      name: "Rattata",
      attackType: AttackTypeEnum.NORMAL,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.NORMAL)!,
      baseHealth: 30,
      baseAttack: 56,
      baseSpeed: 72,
      range: 1,
      terrain: [TerrainEnum.GRASS, TerrainEnum.NORMAL],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 20,
    },
  ],
  [
    20,
    {
      baseId: 20,
      component: towers.Raticate,
      name: "Raticate",
      attackType: AttackTypeEnum.NORMAL,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.NORMAL)!,
      baseHealth: 55,
      baseAttack: 81,
      baseSpeed: 97,
      range: 2,
      terrain: [TerrainEnum.GRASS, TerrainEnum.NORMAL],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    21,
    {
      baseId: 21,
      component: towers.Spearow,
      name: "Spearow",
      attackType: AttackTypeEnum.FLYING,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.FLYING)!,
      baseHealth: 40,
      baseAttack: 60,
      baseSpeed: 70,
      range: 2,
      terrain: [TerrainEnum.GRASS, TerrainEnum.NORMAL, TerrainEnum.FLYING],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 22,
    },
  ],
  [
    22,
    {
      baseId: 22,
      component: towers.Fearow,
      name: "Fearow",
      attackType: AttackTypeEnum.FLYING,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.FLYING)!,
      baseHealth: 65,
      baseAttack: 90,
      baseSpeed: 100,
      range: 3,
      terrain: [TerrainEnum.GRASS, TerrainEnum.NORMAL, TerrainEnum.FLYING],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    23,
    {
      baseId: 23,
      component: towers.Ekans,
      name: "Ekans",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 35,
      baseAttack: 60,
      baseSpeed: 55,
      range: 2,
      terrain: [TerrainEnum.GRASS, TerrainEnum.GROUND, TerrainEnum.POISON],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 24,
    },
  ],
  [
    24,
    {
      baseId: 24,
      component: towers.Arbok,
      name: "Arbok",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 60,
      baseAttack: 95,
      baseSpeed: 80,
      range: 3,
      terrain: [TerrainEnum.GRASS, TerrainEnum.GROUND, TerrainEnum.POISON],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    25,
    {
      baseId: 25,
      component: towers.Pikachu,
      name: "Pikachu",
      attackType: AttackTypeEnum.ELECTRIC,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.ELECTRIC)!,
      baseHealth: 33,
      baseAttack: 55,
      baseSpeed: 90,
      range: 2,
      terrain: [TerrainEnum.ELECTRIC],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 26,
    },
  ],
  [
    26,
    {
      baseId: 26,
      component: towers.Raichu,
      name: "Raichu",
      attackType: AttackTypeEnum.ELECTRIC,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.ELECTRIC)!,
      baseHealth: 60,
      baseAttack: 90,
      baseSpeed: 110,
      range: 3,
      terrain: [TerrainEnum.ELECTRIC],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    27,
    {
      baseId: 27,
      component: towers.Sandshrew,
      name: "Sandshrew",
      attackType: AttackTypeEnum.GROUND,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.GROUND)!,
      baseHealth: 50,
      baseAttack: 75,
      baseSpeed: 40,
      range: 1,
      terrain: [TerrainEnum.GROUND],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 28,
    },
  ],
  [
    28,
    {
      baseId: 28,
      component: towers.Sandslash,
      name: "Sandslash",
      attackType: AttackTypeEnum.GROUND,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.GROUND)!,
      baseHealth: 75,
      baseAttack: 100,
      baseSpeed: 65,
      range: 2,
      terrain: [TerrainEnum.GROUND],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    29,
    {
      baseId: 29,
      component: towers.NidoranF,
      name: "Nidoran ♀",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 55,
      baseAttack: 47,
      baseSpeed: 41,
      range: 1,
      terrain: [TerrainEnum.POISON],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 30,
    },
  ],
  [
    30,
    {
      baseId: 30,
      component: towers.Nidorina,
      name: "Nidorina",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 70,
      baseAttack: 62,
      baseSpeed: 56,
      range: 2,
      terrain: [TerrainEnum.POISON],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 31,
    },
  ],
  [
    31,
    {
      baseId: 31,
      component: towers.Nidoqueen,
      name: "Nidoqueen",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 90,
      baseAttack: 92,
      baseSpeed: 76,
      range: 3,
      terrain: [TerrainEnum.POISON, TerrainEnum.GROUND],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    32,
    {
      baseId: 32,
      component: towers.NidoranM,
      name: "Nidoran ♂",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 46,
      baseAttack: 57,
      baseSpeed: 50,
      range: 1,
      terrain: [TerrainEnum.POISON, TerrainEnum.GROUND],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 33,
    },
  ],
  [
    33,
    {
      baseId: 33,
      component: towers.Nidorino,
      name: "Nidorino",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 61,
      baseAttack: 72,
      baseSpeed: 65,
      range: 2,
      terrain: [TerrainEnum.POISON, TerrainEnum.GROUND],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 34,
    },
  ],
  [
    34,
    {
      baseId: 34,
      component: towers.Nidoking,
      name: "Nidoking",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 81,
      baseAttack: 102,
      baseSpeed: 85,
      range: 3,
      terrain: [TerrainEnum.POISON, TerrainEnum.GROUND],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    35,
    {
      baseId: 35,
      component: towers.Clefairy,
      name: "Clefairy",
      attackType: AttackTypeEnum.NORMAL,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.NORMAL)!,
      baseHealth: 70,
      baseAttack: 45,
      baseSpeed: 35,
      range: 1,
      terrain: [TerrainEnum.GROUND, TerrainEnum.NORMAL],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 36,
    },
  ],
  [
    36,
    {
      baseId: 36,
      component: towers.Clefable,
      name: "Clefable",
      attackType: AttackTypeEnum.NORMAL,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.NORMAL)!,
      baseHealth: 95,
      baseAttack: 70,
      baseSpeed: 60,
      range: 2,
      terrain: [TerrainEnum.GROUND, TerrainEnum.NORMAL],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    37,
    {
      baseId: 37,
      component: towers.Vulpix,
      name: "Vulpix",
      attackType: AttackTypeEnum.FIRE,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.FIRE)!,
      baseHealth: 38,
      baseAttack: 41,
      baseSpeed: 65,
      range: 1,
      terrain: [TerrainEnum.FIRE, TerrainEnum.GROUND],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 38,
    },
  ],
  [
    38,
    {
      baseId: 38,
      component: towers.Ninetales,
      name: "Ninetales",
      attackType: AttackTypeEnum.FIRE,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.FIRE)!,
      baseHealth: 73,
      baseAttack: 76,
      baseSpeed: 100,
      range: 2,
      terrain: [TerrainEnum.FIRE, TerrainEnum.GROUND],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    39,
    {
      baseId: 39,
      component: towers.Jigglypuff,
      name: "Jigglypuff",
      attackType: AttackTypeEnum.NORMAL,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.NORMAL)!,
      baseHealth: 115,
      baseAttack: 45,
      baseSpeed: 20,
      range: 1,
      terrain: [TerrainEnum.NORMAL, TerrainEnum.GROUND],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 40,
    },
  ],
  [
    40,
    {
      baseId: 40,
      component: towers.Wigglytuff,
      name: "Wigglytuff",
      attackType: AttackTypeEnum.NORMAL,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.NORMAL)!,
      baseHealth: 140,
      baseAttack: 70,
      baseSpeed: 45,
      range: 2,
      terrain: [TerrainEnum.NORMAL, TerrainEnum.GROUND],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    41,
    {
      baseId: 41,
      component: towers.Zubat,
      name: "Zubat",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 40,
      baseAttack: 45,
      baseSpeed: 55,
      range: 1,
      terrain: [TerrainEnum.POISON, TerrainEnum.FLYING],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 42,
    },
  ],
  [
    42,
    {
      baseId: 42,
      component: towers.Golbat,
      name: "Golbat",
      attackType: AttackTypeEnum.POISON,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.POISON)!,
      baseHealth: 75,
      baseAttack: 80,
      baseSpeed: 90,
      range: 2,
      terrain: [TerrainEnum.POISON, TerrainEnum.FLYING],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    43,
    {
      baseId: 43,
      component: towers.Oddish,
      name: "Oddish",
      attackType: AttackTypeEnum.GRASS,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.GRASS)!,
      baseHealth: 45,
      baseAttack: 50,
      baseSpeed: 30,
      range: 1,
      terrain: [TerrainEnum.POISON, TerrainEnum.GRASS],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 44,
    },
  ],
  [
    44,
    {
      baseId: 44,
      component: towers.Gloom,
      name: "Gloom",
      attackType: AttackTypeEnum.GRASS,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.GRASS)!,
      baseHealth: 60,
      baseAttack: 65,
      baseSpeed: 40,
      range: 2,
      terrain: [TerrainEnum.POISON, TerrainEnum.GRASS],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 45,
    },
  ],
  [
    45,
    {
      baseId: 45,
      component: towers.Vileplume,
      name: "Vileplume",
      attackType: AttackTypeEnum.GRASS,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.GRASS)!,
      baseHealth: 75,
      baseAttack: 80,
      baseSpeed: 50,
      range: 3,
      terrain: [TerrainEnum.POISON, TerrainEnum.GRASS],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    63,
    {
      baseId: 63,
      component: towers.Abra,
      name: "Abra",
      attackType: AttackTypeEnum.PSYCHIC,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.PSYCHIC)!,
      baseHealth: 25,
      baseAttack: 20,
      baseSpeed: 90,
      range: 1,
      terrain: [TerrainEnum.PSYCHIC],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 64,
    },
  ],
  [
    64,
    {
      baseId: 64,
      component: towers.Kadabra,
      name: "Kadabra",
      attackType: AttackTypeEnum.PSYCHIC,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.PSYCHIC)!,
      baseHealth: 40,
      baseAttack: 35,
      baseSpeed: 105,
      range: 2,
      terrain: [TerrainEnum.PSYCHIC],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 65,
    },
  ],
  [
    65,
    {
      baseId: 65,
      component: towers.Alakazam,
      name: "Alakazam",
      attackType: AttackTypeEnum.PSYCHIC,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.PSYCHIC)!,
      baseHealth: 55,
      baseAttack: 50,
      baseSpeed: 120,
      range: 3,
      terrain: [TerrainEnum.PSYCHIC],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    74,
    {
      baseId: 74,
      component: towers.Geodude,
      name: "Geodude",
      attackType: AttackTypeEnum.ROCK,
      attackSize: AttackSizeEnum.SMALL,
      attackColor: bulletColors.get(AttackTypeEnum.ROCK)!,
      baseHealth: 40,
      baseAttack: 80,
      baseSpeed: 20,
      range: 1,
      terrain: [TerrainEnum.ROCK, TerrainEnum.GROUND],
      rarity: RarityEnum.COMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 10,
      evolutionBaseId: 75,
    },
  ],
  [
    75,
    {
      baseId: 75,
      component: towers.Graveler,
      name: "Graveler",
      attackType: AttackTypeEnum.ROCK,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.ROCK)!,
      baseHealth: 55,
      baseAttack: 95,
      baseSpeed: 35,
      range: 2,
      terrain: [TerrainEnum.ROCK, TerrainEnum.GROUND],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 16,
      evolutionBaseId: 76,
    },
  ],
  [
    76,
    {
      baseId: 76,
      component: towers.Golem,
      name: "Golem",
      attackType: AttackTypeEnum.ROCK,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.ROCK)!,
      baseHealth: 80,
      baseAttack: 120,
      baseSpeed: 45,
      range: 3,
      terrain: [TerrainEnum.ROCK, TerrainEnum.GROUND],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
  [
    104,
    {
      baseId: 104,
      component: towers.Cubone,
      name: "Cubone",
      attackType: AttackTypeEnum.GROUND,
      attackSize: AttackSizeEnum.MEDIUM,
      attackColor: bulletColors.get(AttackTypeEnum.GROUND)!,
      baseHealth: 50,
      baseAttack: 50,
      baseSpeed: 35,
      range: 2,
      terrain: [TerrainEnum.GROUND],
      rarity: RarityEnum.UNCOMMON,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: 12,
      evolutionBaseId: 105,
    },
  ],
  [
    105,
    {
      baseId: 105,
      component: towers.Marowak,
      name: "Marowak",
      attackType: AttackTypeEnum.GROUND,
      attackSize: AttackSizeEnum.LARGE,
      attackColor: bulletColors.get(AttackTypeEnum.GROUND)!,
      baseHealth: 60,
      baseAttack: 80,
      baseSpeed: 45,
      range: 2,
      terrain: [TerrainEnum.GROUND],
      rarity: RarityEnum.RARE,
      region: RegionsEnum.KANTO,
      exp: 0,
      level: 1,
      levelToEvolve: null,
      evolutionBaseId: null,
    },
  ],
]);
