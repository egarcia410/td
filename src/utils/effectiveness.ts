import { AttackTypeEnum } from "../types";

export const attackMultiplier = (
  attackerType: AttackTypeEnum,
  defenderType: AttackTypeEnum
) => {
  return effectiveness.get(attackerType)![defenderType]
    ? effectiveness.get(attackerType)![defenderType]!
    : 1;
};

export const effectiveness = new Map([
  [
    AttackTypeEnum.NORMAL,
    {
      [AttackTypeEnum.ROCK]: 0.5,
      [AttackTypeEnum.GHOST]: 0,
    },
  ],
  [
    AttackTypeEnum.FIGHT,
    {
      [AttackTypeEnum.NORMAL]: 2,
      [AttackTypeEnum.FLYING]: 0.5,
      [AttackTypeEnum.POISON]: 0.5,
      [AttackTypeEnum.ROCK]: 2,
      [AttackTypeEnum.BUG]: 0.5,
      [AttackTypeEnum.GHOST]: 0,
      [AttackTypeEnum.PSYCHIC]: 0.5,
      [AttackTypeEnum.ICE]: 2,
    },
  ],
  [
    AttackTypeEnum.FLYING,
    {
      [AttackTypeEnum.FIGHT]: 2,
      [AttackTypeEnum.ROCK]: 0.5,
      [AttackTypeEnum.BUG]: 2,
      [AttackTypeEnum.GRASS]: 2,
      [AttackTypeEnum.ELECTRIC]: 0.5,
    },
  ],
  [
    AttackTypeEnum.POISON,
    {
      [AttackTypeEnum.POISON]: 0.5,
      [AttackTypeEnum.GROUND]: 0.5,
      [AttackTypeEnum.ROCK]: 0.5,
      [AttackTypeEnum.BUG]: 2,
      [AttackTypeEnum.GHOST]: 0.5,
      [AttackTypeEnum.GRASS]: 2,
    },
  ],
  [
    AttackTypeEnum.GROUND,
    {
      [AttackTypeEnum.FLYING]: 0,
      [AttackTypeEnum.POISON]: 2,
      [AttackTypeEnum.ROCK]: 2,
      [AttackTypeEnum.BUG]: 0.5,
      [AttackTypeEnum.FIRE]: 2,
      [AttackTypeEnum.GRASS]: 0.5,
      [AttackTypeEnum.ELECTRIC]: 2,
    },
  ],
  [
    AttackTypeEnum.ROCK,
    {
      [AttackTypeEnum.FIGHT]: 0.5,
      [AttackTypeEnum.FLYING]: 2,
      [AttackTypeEnum.GROUND]: 0.5,
      [AttackTypeEnum.BUG]: 2,
      [AttackTypeEnum.FIRE]: 2,
      [AttackTypeEnum.ICE]: 2,
    },
  ],
  [
    AttackTypeEnum.BUG,
    {
      [AttackTypeEnum.FIGHT]: 0.5,
      [AttackTypeEnum.FLYING]: 0.5,
      [AttackTypeEnum.POISON]: 2,
      [AttackTypeEnum.GHOST]: 0.5,
      [AttackTypeEnum.FIRE]: 0.5,
      [AttackTypeEnum.GRASS]: 2,
      [AttackTypeEnum.PSYCHIC]: 2,
    },
  ],
  [
    AttackTypeEnum.GHOST,
    {
      [AttackTypeEnum.NORMAL]: 0,
      [AttackTypeEnum.GHOST]: 2,
      [AttackTypeEnum.PSYCHIC]: 0,
    },
  ],
  [
    AttackTypeEnum.FIRE,
    {
      [AttackTypeEnum.ROCK]: 0.5,
      [AttackTypeEnum.BUG]: 2,
      [AttackTypeEnum.FIRE]: 0.5,
      [AttackTypeEnum.WATER]: 0.5,
      [AttackTypeEnum.GRASS]: 2,
      [AttackTypeEnum.ICE]: 2,
      [AttackTypeEnum.DRAGON]: 0.5,
    },
  ],
  [
    AttackTypeEnum.WATER,
    {
      [AttackTypeEnum.GROUND]: 2,
      [AttackTypeEnum.ROCK]: 2,
      [AttackTypeEnum.FIRE]: 2,
      [AttackTypeEnum.WATER]: 0.5,
      [AttackTypeEnum.GRASS]: 0.5,
      [AttackTypeEnum.DRAGON]: 0.5,
    },
  ],
  [
    AttackTypeEnum.GRASS,
    {
      [AttackTypeEnum.FLYING]: 0.5,
      [AttackTypeEnum.POISON]: 0.5,
      [AttackTypeEnum.GROUND]: 2,
      [AttackTypeEnum.ROCK]: 2,
      [AttackTypeEnum.BUG]: 0.5,
      [AttackTypeEnum.FIRE]: 0.5,
      [AttackTypeEnum.WATER]: 2,
      [AttackTypeEnum.GRASS]: 0.5,
      [AttackTypeEnum.DRAGON]: 0.5,
    },
  ],
  [
    AttackTypeEnum.ELECTRIC,
    {
      [AttackTypeEnum.FLYING]: 2,
      [AttackTypeEnum.GROUND]: 0,
      [AttackTypeEnum.WATER]: 2,
      [AttackTypeEnum.GRASS]: 0.5,
      [AttackTypeEnum.ELECTRIC]: 0.5,
      [AttackTypeEnum.DRAGON]: 0.5,
    },
  ],
  [
    AttackTypeEnum.PSYCHIC,
    {
      [AttackTypeEnum.FIGHT]: 2,
      [AttackTypeEnum.POISON]: 2,
      [AttackTypeEnum.PSYCHIC]: 0.5,
    },
  ],
  [
    AttackTypeEnum.ICE,
    {
      [AttackTypeEnum.FLYING]: 2,
      [AttackTypeEnum.GROUND]: 2,
      [AttackTypeEnum.WATER]: 0.5,
      [AttackTypeEnum.GRASS]: 2,
      [AttackTypeEnum.ICE]: 0.5,
      [AttackTypeEnum.DRAGON]: 2,
    },
  ],
  [
    AttackTypeEnum.DRAGON,
    {
      [AttackTypeEnum.DRAGON]: 2,
    },
  ],
]);
