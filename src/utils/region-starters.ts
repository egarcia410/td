import { RegionsEnum } from "../types";
import { allBaseTowers } from "./base-towers";

export const regionStarters = new Map<RegionsEnum, any[]>([
  [
    RegionsEnum.KANTO,
    [allBaseTowers.get(1), allBaseTowers.get(4), allBaseTowers.get(7)],
  ],
]);
