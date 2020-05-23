import { IItem } from "../types/IItem";
import Pokeball from "../assets/items/pokeball.png";
import HealthPotion from "../assets/items/health-potion.png";
import Pokedoll from "../assets/items/poke-doll.png";
import { GiCube, GiBulldozer } from "react-icons/gi";

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
