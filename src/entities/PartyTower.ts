import { Dispatch } from "react";
import { BaseTower } from "./BaseTower";
import {
  AttackTypeEnum,
  AttackSizeEnum,
  TerrainEnum,
  RarityEnum,
  RegionsEnum,
} from "../types";
import { allBaseTowers } from "../utils";

export class PartyTower extends BaseTower {
  speed: number;
  attack: number;
  expNeededToLevel: Map<number, number>;
  speedBonus: number;
  attackBonus: number;
  rangeBonus: number;
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
    super(
      id,
      baseId,
      component,
      name,
      attackType,
      attackSize,
      attackColor,
      baseHealth,
      baseSpeed,
      baseAttack,
      range,
      terrain,
      rarity,
      region,
      exp,
      level,
      levelToEvolve,
      evolutionBaseId
    );
    this.expNeededToLevel = this.generateExpNeededToLevel();
    this.speedBonus = 0;
    this.attackBonus = 0;
    this.rangeBonus = 0;
    this.attack = this.generateAttackStat();
    this.speed = this.generateSpeedStat();
    this.range = range;
  }

  incrementExp = (dispatch: Dispatch<any>) => {
    this.exp += 8;
    const expNeededToLevel = this.expNeededToLevel.get(this.level)!;
    if (this.exp >= expNeededToLevel) {
      this.level += 1;
      if (this.level === this.levelToEvolve && this.evolutionBaseId) {
        this.evolve();
      }
      this.updateStats();
      dispatch(["partyTowers", "fieldTowers"]);
    }
  };

  generateExpNeededToLevel = () => {
    const expNeededToLevel = new Map<number, number>();
    for (let i = 1; i <= 100; i++) {
      expNeededToLevel.set(i, Math.pow(i, 3));
    }
    return expNeededToLevel;
  };

  generateAttackStat = () => {
    return (this.level * 0.5 + this.baseAttack) / 10 + this.attackBonus;
  };

  generateSpeedStat = () => {
    return (this.level * 0.2 + this.baseSpeed) / 10 + this.speedBonus;
  };

  updateStats = () => {
    this.attack = this.generateAttackStat();
    this.speed = this.generateSpeedStat();
  };

  evolve = () => {
    const evolvedTower = allBaseTowers.get(this.evolutionBaseId!)!;
    this.baseId = evolvedTower.baseId;
    this.component = evolvedTower.component;
    this.name = evolvedTower.name;
    this.attackType = evolvedTower.attackType;
    this.attackSize = evolvedTower.attackSize;
    this.baseHealth = evolvedTower.baseHealth;
    this.baseSpeed = evolvedTower.baseSpeed;
    this.baseAttack = evolvedTower.baseAttack;
    this.range = evolvedTower.range + this.rangeBonus;
    this.terrain = evolvedTower.terrain;
    this.rarity = evolvedTower.rarity;
    this.region = evolvedTower.region;
    this.levelToEvolve = evolvedTower.levelToEvolve;
    this.evolutionBaseId = evolvedTower.evolutionBaseId;
  };
}
