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
        badge: BoulderBadge,
      },
      {
        name: "Misty",
        location: "Cerulean City",
        terrain: TerrainEnum.WATER,
        badge: CascadeBadge,
      },
      {
        name: "Lt. Surge",
        location: "Vermilion City",
        terrain: TerrainEnum.ELECTRIC,
        badge: ThunderBadge,
      },
      {
        name: "Erika",
        location: "Celadon City",
        terrain: TerrainEnum.GRASS,
        badge: RainbowBadge,
      },
      {
        name: "Koga & Janine",
        location: "Fuchsia City",
        terrain: TerrainEnum.POISON,
        badge: SoulBadge,
      },
      {
        name: "Sabrina",
        location: "Saffron City",
        terrain: TerrainEnum.PSYCHIC,
        badge: MarshBadge,
      },
      {
        name: "Blaine",
        location: "Cinnabar Island",
        terrain: TerrainEnum.FIRE,
        badge: VolcanoBadge,
      },
      {
        name: "Giovanni",
        location: "Viridian City",
        terrain: TerrainEnum.GROUND,
        badge: EarthBadge,
      },
    ],
  ],
]);
