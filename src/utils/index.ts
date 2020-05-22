import { TerrainEnum } from "../types/tower";
import { ITerrainColors, IItem } from "../types";
import Pokeball from "../items/pokeball.png";
import HealthPotion from "../items/health-potion.png";
import Pokedoll from "../items/poke-doll.png";
import { GiCube, GiBulldozer } from "react-icons/gi";

export const terrainColors = new Map<TerrainEnum, ITerrainColors>([
  [
    TerrainEnum.GRASS,
    {
      path: { primary: "#DCC767", secondary: "#A9975D" },
      main: { primary: "#98B866", secondary: "#60944A" },
      other: { primary: "#7DBDC5", secondary: "#529AA0" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
  [
    TerrainEnum.WATER,
    {
      path: { primary: "#529AA0", secondary: "#7DBDC5" },
      main: { primary: "#7DBDC5", secondary: "#529AA0" },
      other: { primary: "#98B866", secondary: "#60944A" },
      obstacle: { primary: "#8F9482", secondary: "#7A7873" },
    },
  ],
]);

export const items = new Map<number, IItem>([
  [
    1,
    {
      id: 1,
      item: "Pokeball",
      img: Pokeball,
      price: 100,
      description: "A device for catching Pokémon",
      isDraggable: true,
    },
  ],
  [
    2,
    {
      id: 2,
      item: "Health Potion",
      img: HealthPotion,
      price: 100,
      description: "Restores 20 Health. NOT DRAGGABLE",
      isDraggable: false,
    },
  ],
  [
    3,
    {
      id: 3,
      item: "Poke Doll",
      img: Pokedoll,
      price: 100,
      description: "Remove a Pokémon from the field",
      isDraggable: true,
    },
  ],
  [
    4,
    {
      id: 4,
      item: "Bull Dozer",
      img: GiBulldozer,
      price: 100,
      description: "Remove an obstacle from the field",
      isDraggable: true,
    },
  ],
  [
    5,
    {
      id: 5,
      item: "Water Block",
      img: GiCube,
      price: 100,
      description: "Allows placement of Water based Pokémon",
      isDraggable: true,
    },
  ],
  [
    6,
    {
      id: 6,
      item: "Land Block",
      img: GiCube,
      price: 100,
      description: "Allows placement of Land based Pokémon",
      isDraggable: true,
    },
  ],
]);
