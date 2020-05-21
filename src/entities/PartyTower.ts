import { Dispatch } from "react";
import { BaseTower } from "./BaseTower";
import {
  AttackTypeEnum,
  AttackSizeEnum,
  TerrainEnum,
  RarityEnum,
} from "../types/tower";
import { RegionsEnum } from "../types/game";
import { allBaseTowers } from "../utils/baseTowers";

export class PartyTower extends BaseTower {
  speed: number;
  attack: number;
  expNeededToLevel: Map<number, number>;
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
    this.attack = this.generateAttackStat();
    this.speed = this.generateSpeedStat();
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
    return (this.level * 0.5 + this.baseAttack) / 10;
  };

  generateSpeedStat = () => {
    return (this.level * 0.2 + this.baseSpeed) / 10;
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
    this.range = evolvedTower.range;
    this.terrain = evolvedTower.terrain;
    this.rarity = evolvedTower.rarity;
    this.region = evolvedTower.region;
    this.levelToEvolve = evolvedTower.levelToEvolve;
    this.evolutionBaseId = evolvedTower.evolutionBaseId;
  };
}
