import { ICoordinates } from "../types";
import { FieldTower } from "./FieldTower";

export class Bullet {
  bulletId: string;
  coords: ICoordinates;
  angle: number;
  fieldTowerRef: FieldTower;
  bulletElement: HTMLDivElement;
  constructor(
    bulletId: string,
    coords: ICoordinates,
    angle: number,
    fieldTowerRef: FieldTower,
    bulletElement: HTMLDivElement
  ) {
    this.bulletId = bulletId;
    this.coords = coords;
    this.angle = angle;
    this.fieldTowerRef = fieldTowerRef;
    this.bulletElement = bulletElement;
  }
}
