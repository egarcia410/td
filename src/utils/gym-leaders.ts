import { RegionsEnum, TerrainEnum } from "../types";
import { IGymLeader } from "../types/IGymLeader";

import BoulderBadge from "../assets/badges/Boulder_Badge.png";
import CascadeBadge from "../assets/badges/Cascade_Badge.png";
import EarthBadge from "../assets/badges/Earth_Badge.png";
import MarshBadge from "../assets/badges/Marsh_Badge.png";
import RainbowBadge from "../assets/badges/Rainbow_Badge.png";
import SoulBadge from "../assets/badges/Soul_Badge.png";
import VolcanoBadge from "../assets/badges/Volcano_Badge.png";
import ThunderBadge from "../assets/badges/Thunder_Badge.png";

export const gymLeaders = new Map<RegionsEnum, IGymLeader[]>([
  [
    RegionsEnum.KANTO,
    [
      {
        name: "Brock",
        location: "Pewter City",
        terrain: TerrainEnum.ROCK,
        badgeImg: BoulderBadge,
        badgeName: "Boulder",
      },
      {
        name: "Misty",
        location: "Cerulean City",
        terrain: TerrainEnum.WATER,
        badgeImg: CascadeBadge,
        badgeName: "Cascade",
      },
      {
        name: "Lt. Surge",
        location: "Vermilion City",
        terrain: TerrainEnum.ELECTRIC,
        badgeImg: ThunderBadge,
        badgeName: "Thunder",
      },
      {
        name: "Erika",
        location: "Celadon City",
        terrain: TerrainEnum.GRASS,
        badgeImg: RainbowBadge,
        badgeName: "Rainbow",
      },
      {
        name: "Koga & Janine",
        location: "Fuchsia City",
        terrain: TerrainEnum.POISON,
        badgeImg: SoulBadge,
        badgeName: "Soul",
      },
      {
        name: "Sabrina",
        location: "Saffron City",
        terrain: TerrainEnum.PSYCHIC,
        badgeImg: MarshBadge,
        badgeName: "Marsh",
      },
      {
        name: "Blaine",
        location: "Cinnabar Island",
        terrain: TerrainEnum.FIRE,
        badgeImg: VolcanoBadge,
        badgeName: "Volcano",
      },
      {
        name: "Giovanni",
        location: "Viridian City",
        terrain: TerrainEnum.GROUND,
        badgeImg: EarthBadge,
        badgeName: "Earth",
      },
    ],
  ],
]);
