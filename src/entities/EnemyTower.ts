import { Cell } from "./Cell";
import { AttackTypeEnum } from "../types";

export class EnemyTower {
  id: string;
  level: number;
  coords: { x: number; y: number };
  currentPathWayIndex: number;
  delay: number;
  health: number;
  maxHealth: number;
  baseId: number;
  baseSpeed: number;
  speed: number;
  component: React.FC<any>;
  enemyElement: HTMLDivElement | null;
  currentPathCell: Cell;
  attackType: AttackTypeEnum;
  constructor(
    id: string,
    level: number,
    baseId: number,
    delay: number,
    baseHealth: number,
    baseSpeed: number,
    component: React.FC<any>,
    pathCell: Cell,
    attackType: AttackTypeEnum
  ) {
    this.id = id;
    this.level = level;
    this.coords = { x: 0, y: 0 };
    this.currentPathWayIndex = 0;
    this.delay = delay;
    this.health = baseHealth;
    this.maxHealth = baseHealth;
    this.baseId = baseId;
    this.baseSpeed = baseSpeed;
    this.speed = this.generateMovementSpeed();
    this.component = component;
    this.enemyElement = null;
    this.currentPathCell = pathCell;
    this.attackType = attackType;
  }

  private generateMovementSpeed = () => {
    return (this.level * 0.6 + this.baseSpeed * 0.6) / 10;
  };
}
