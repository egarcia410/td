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
      levelToEvolve: 18,
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
      levelToEvolve: 18,
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
      levelToEvolve: 18,
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
      levelToEvolve: 18,
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
      levelToEvolve: 18,
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
      levelToEvolve: 18,
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
