import { RarityEnum } from "../types/tower";

export const getRandomRarity = () => {
  const rarityVal = Math.floor(Math.random() * 100);
  const rarity =
    rarityVal > 95
      ? RarityEnum.RARE
      : rarityVal > 80
      ? RarityEnum.UNCOMMON
      : RarityEnum.COMMON;
  return rarity;
};
