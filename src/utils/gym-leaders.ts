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
        terrainTypes: [TerrainEnum.ROCK, TerrainEnum.GROUND],
        badgeImg: BoulderBadge,
        badgeName: "Boulder",
      },
      {
        name: "Misty",
        location: "Cerulean City",
        terrain: TerrainEnum.WATER,
        terrainTypes: [TerrainEnum.WATER],
        badgeImg: CascadeBadge,
        badgeName: "Cascade",
      },
      {
        name: "Lt. Surge",
        location: "Vermilion City",
        terrain: TerrainEnum.ELECTRIC,
        terrainTypes: [TerrainEnum.ELECTRIC, TerrainEnum.NORMAL],
        badgeImg: ThunderBadge,
        badgeName: "Thunder",
      },
      {
        name: "Erika",
        location: "Celadon City",
        terrain: TerrainEnum.GRASS,
        terrainTypes: [TerrainEnum.GRASS, TerrainEnum.BUG],
        badgeImg: RainbowBadge,
        badgeName: "Rainbow",
      },
      {
        name: "Koga & Janine",
        location: "Fuchsia City",
        terrain: TerrainEnum.POISON,
        terrainTypes: [TerrainEnum.POISON, TerrainEnum.NORMAL],
        badgeImg: SoulBadge,
        badgeName: "Soul",
      },
      {
        name: "Sabrina",
        location: "Saffron City",
        terrain: TerrainEnum.PSYCHIC,
        terrainTypes: [TerrainEnum.PSYCHIC, TerrainEnum.NORMAL],
        badgeImg: MarshBadge,
        badgeName: "Marsh",
      },
      {
        name: "Blaine",
        location: "Cinnabar Island",
        terrain: TerrainEnum.FIRE,
        terrainTypes: [TerrainEnum.FIRE, TerrainEnum.NORMAL],
        badgeImg: VolcanoBadge,
        badgeName: "Volcano",
      },
      {
        name: "Giovanni",
        location: "Viridian City",
        terrain: TerrainEnum.GROUND,
        terrainTypes: [TerrainEnum.GROUND, TerrainEnum.NORMAL],
        badgeImg: EarthBadge,
        badgeName: "Earth",
      },
    ],
  ],
]);
