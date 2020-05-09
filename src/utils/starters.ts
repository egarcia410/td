import { RegionsEnum } from "../types/game";
import { allBaseTowers } from "./baseTowers";

export const regionStarters = new Map<RegionsEnum, any[]>([
  [
    RegionsEnum.KANTO,
    [allBaseTowers.get(1), allBaseTowers.get(4), allBaseTowers.get(7)],
  ],
]);
