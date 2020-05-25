import { IconType } from "react-icons/lib/cjs";

export interface IItem {
  id: number;
  item: string;
  img: string | IconType;
  price: number;
  description: string;
  isDraggable: boolean;
  color?: string;
}
