import { RegionsEnum } from "../types";
import { allBaseTowers } from "./base-towers";
import { IBaseTower } from "../types/IBaseTower";

export const regionStarters = new Map<RegionsEnum, IBaseTower[]>([
  [
    RegionsEnum.KANTO,
    [allBaseTowers.get(1)!, allBaseTowers.get(4)!, allBaseTowers.get(7)!],
  ],
]);
