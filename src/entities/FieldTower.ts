import { PartyTower } from "./PartyTower";
import { Cell } from "./Cell";

export class FieldTower {
  lastShotTime: number;
  partyTowerRef: PartyTower;
  cellRef: Cell;
  constructor(partyTowerRef: PartyTower, cellRef: Cell) {
    this.lastShotTime = 0;
    this.partyTowerRef = partyTowerRef;
    this.cellRef = cellRef;
  }
}
