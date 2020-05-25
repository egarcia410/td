import { IItem } from "../types/IItem";
import Pokeball from "../assets/items/pokeball.png";
import HealthPotion from "../assets/items/health-potion.png";
import Pokedoll from "../assets/items/poke-doll.png";
import { GiCube, GiBulldozer, GiPocketBow, GiBroadsword } from "react-icons/gi";
import { FaUserPlus } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";

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
      price: 200,
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
      price: 150,
      description: "Remove an obstacle from the field",
      isDraggable: true,
      color: "#FEFB54",
    },
  ],
  [
    5,
    {
      id: 5,
      item: "Water Block",
      img: GiCube,
      price: 125,
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
      price: 125,
      description: "Allows placement of Land based Pokémon",
      isDraggable: true,
    },
  ],
  [
    7,
    {
      id: 7,
      item: "Party Size",
      img: FaUserPlus,
      price: 500,
      description: "Increase party size by 2. IMMEDIATE",
      isDraggable: false,
      color: "",
    },
  ],
  [
    8,
    {
      id: 8,
      item: "Speed Bonus",
      img: IoIosSpeedometer,
      price: 300,
      description: "Increase attack speed of Pokémon by",
      isDraggable: true,
      color: "#DCC767",
    },
  ],
  [
    9,
    {
      id: 9,
      item: "Range Bonus",
      img: GiPocketBow,
      price: 300,
      description: "Increase range of Pokémon by 1",
      isDraggable: true,
      color: "#8B734E",
    },
  ],
  [
    10,
    {
      id: 10,
      item: "Atack Bonus",
      img: GiBroadsword,
      price: 300,
      description: "Increase attack damage of Pokémon by 1",
      isDraggable: true,
      color: "#E04D59",
    },
  ],
]);
