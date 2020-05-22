import { RegionsEnum, TerrainEnum } from "../types";
import BoulderBadge from "../badges/Boulder_Badge.png";
import CascadeBadge from "../badges/Cascade_Badge.png";
import EarthBadge from "../badges/Earth_Badge.png";
import MarshBadge from "../badges/Marsh_Badge.png";
import RainbowBadge from "../badges/Rainbow_Badge.png";
import SoulBadge from "../badges/Soul_Badge.png";
import VolcanoBadge from "../badges/Volcano_Badge.png";
import ThunderBadge from "../badges/Thunder_Badge.png";

export const gymLeaders = new Map<RegionsEnum, any>([
  [
    RegionsEnum.KANTO,
    {
      gymLeaders: [
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
          terrain: TerrainEnum.ALL,
          badge: EarthBadge,
        },
      ],
    },
  ],
]);
