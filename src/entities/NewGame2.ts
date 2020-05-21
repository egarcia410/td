import { Dispatch } from "react";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
  GameStatusEnum,
  ResetTypeEnum,
  IListener,
  RegionsEnum,
} from "../types/game";
import {
  IEnemyTower,
  IPartyTower,
  IFieldTower,
  TerrainEnum,
  RarityEnum,
  IBaseTower,
  DirectionEnum,
} from "../types/tower";
import { IFieldCellEl } from "../types/board";
import { getBaseTowers, allBaseTowers } from "../utils/baseTowers";
import { generateHealthStat, generateOtherStat } from "../utils/generateStats";

export class Game {
  status: GameStatusEnum;
  enemies: IEnemyTower[];
  boardEl: HTMLDivElement | null;
  boardBounds: DOMRect | null;
  fieldCellsEl: IFieldCellEl[] | null;
  fieldCellsBounds: DOMRect[] | null;
  pathWay: number[];
  health: number;
  money: number;
  waveNumber: number;
  partyTowers: Map<string, IPartyTower>;
  fieldTowers: Map<string, IFieldTower>;
  bullets: {
    id: string;
    coords: { x: number; y: number };
    angle: number;
    towerId: string;
  }[];
  listeners: Map<string, Dispatch<React.SetStateAction<any>>[]>;
  enemiesPerWave: number[];
  startTime: number;
  enemyDelay: number;
  assignedBullets: Map<string, HTMLDivElement>;
  unassignedBullets: HTMLDivElement[];
  enemyCount: number;
  bulletCount: number;
  assignedEnemies: Map<string, HTMLDivElement>;
  unassignedEnemies: HTMLDivElement[];
  terrain: TerrainEnum | null;
  region: RegionsEnum | null;
  baseTowers: Map<TerrainEnum, Map<RarityEnum, IBaseTower[]>> | null;
  expNeededToLevel: Map<number, number> | null;
  constructor() {
    this.enemies = [];
    this.status = GameStatusEnum.IDLE;
    this.listeners = new Map();
    this.boardEl = null;
    this.boardBounds = null;
    this.fieldCellsEl = null;
    this.fieldCellsBounds = null;
    this.health = 100;
    this.money = 50;
    this.waveNumber = 1;
    this.partyTowers = new Map();
    this.fieldTowers = new Map();
    this.bullets = [];
    this.enemiesPerWave = [1, 20, 20, 20, 20, 20, 20, 20, 20, 20];
    this.startTime = 0;
    this.enemyDelay = 2000;
    this.assignedBullets = new Map();
    this.unassignedBullets = [];
    this.enemyCount = 20;
    this.bulletCount = 25;
    this.assignedEnemies = new Map();
    this.unassignedEnemies = [];
    this.terrain = null;
    this.region = null;
    this.baseTowers = null;
    this.expNeededToLevel = null;
    this.pathWay = [
      0,
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      91,
      92,
      93,
      94,
      95,
      85,
      75,
      65,
      55,
      45,
      35,
      36,
      37,
      38,
      48,
      58,
      68,
      78,
      88,
      89,
      99,
    ];
  }

  initialize(terrain: TerrainEnum, region: RegionsEnum) {
    this.terrain = terrain;
    this.region = region;
    this.baseTowers = getBaseTowers();
    this.generateExpNeededToLevel();
    this.initializeEnemies();
  }

  generateExpNeededToLevel = () => {
    const expNeededToLevel = new Map<number, number>();
    for (let i = 1; i <= 100; i++) {
      expNeededToLevel.set(i, Math.pow(i, 3));
    }
    this.expNeededToLevel = expNeededToLevel;
  };

  initializeEnemies() {
    this.enemies = [];
    for (let i = 0; i < this.enemyCount; i++) {
      const isActive = i < this.enemiesPerWave[this.waveNumber - 1];

      const rarityVal = Math.floor(Math.random() * 100);
      const rarity =
        rarityVal > 95
          ? RarityEnum.RARE
          : rarityVal > 80
          ? RarityEnum.UNCOMMON
          : RarityEnum.COMMON;

      const baseTowersByTerrain = this.baseTowers!.get(this.terrain!)!;
      const baseTowersByRarity = baseTowersByTerrain!.get(rarity)!;
      const randomIndex = Math.floor(Math.random() * baseTowersByRarity.length);
      const { baseSpeed, baseHealth, baseAttack, ...rest } = baseTowersByRarity[
        randomIndex
      ];
      // const health = generateHealthStat(baseHealth, 10);
      const health = baseHealth * 10;
      const enemy = {
        id: uuidv4(),
        coords: { x: 0, y: 0 },
        currentPathWayIndex: 0,
        speed: generateOtherStat(baseSpeed, 10),
        health,
        // attack: generateOtherStat(baseAttack, 10),
        maxHealth: health,
        baseSpeed,
        baseHealth,
        baseAttack,
        delay: this.enemyDelay * i,
        isActive,
        direction: DirectionEnum.NONE,
        ...rest,
      };
      this.enemies = [...this.enemies, enemy];
    }
    this.forceUpdate(["initializeEnemies"]);
  }

  addListener(listener: IListener) {
    listener.valuesToWatch.forEach((val) => {
      const value = this.listeners.get(val);
      if (value) {
        this.listeners.set(val, [...value, listener.update]);
      } else {
        this.listeners.set(val, [listener.update]);
      }
    });
  }

  addUnassignedBullet(bulletEl: HTMLDivElement) {
    this.unassignedBullets = [...this.unassignedBullets, bulletEl];
  }

  addUnassignedEnemy(enemyEl: HTMLDivElement) {
    this.unassignedEnemies = [...this.unassignedEnemies, enemyEl];
  }

  forceUpdate(keys: string[]) {
    if (keys) {
      keys.forEach((key) => {
        const triggers = this.listeners.get(key);
        if (triggers) {
          triggers.forEach((trigger: any) => trigger(() => cloneDeep(this)));
        }
      });
    }
  }

  addBoardEl(boardEl: HTMLDivElement) {
    this.boardBounds = boardEl.getBoundingClientRect();
    this.boardEl = boardEl;
    this.forceUpdate(["boardBounds"]);
  }

  updateBoardBounds() {
    this.boardBounds = this.boardEl
      ? this.boardEl.getBoundingClientRect()
      : null;
    this.forceUpdate(["boardBounds"]);
  }

  addFieldCells(fieldCellsEl: HTMLDivElement[], fieldCellsBounds: DOMRect[]) {
    this.fieldCellsBounds = fieldCellsBounds;
    this.fieldCellsEl = fieldCellsEl;
    this.forceUpdate(["fieldCellsBounds", "fieldCellsEl"]);
  }

  updateFieldCellsBounds() {
    this.fieldCellsBounds = this.fieldCellsEl!.map((fieldCell) => {
      return fieldCell.getBoundingClientRect();
    });
    this.forceUpdate(["fieldCellsBounds"]);
  }

  updateGameStatus(newStatus: GameStatusEnum) {
    this.status = newStatus;
    this.forceUpdate(["status"]);
  }

  reset(type: ResetTypeEnum) {
    if (type === ResetTypeEnum.HARD) {
      this.resetHealth();
      this.resetWave();
      this.resetFieldTowers();
    }
    this.resetEnemies();
    this.resetBullets();
    this.updateGameStatus(GameStatusEnum.IDLE);
    this.startTime = 0;
    this.initializeEnemies();
  }

  resetEnemies() {
    this.assignedEnemies.forEach((assignedEnemy) => {
      assignedEnemy.hidden = true;
      this.unassignedEnemies = [...this.unassignedEnemies, assignedEnemy];
    });
    this.assignedEnemies.clear();
    this.forceUpdate(["enemies"]);
  }

  resetBullets() {
    this.bullets = [];
    this.assignedBullets.forEach((assignedBullet) => {
      assignedBullet.hidden = true;
      this.unassignedBullets = [...this.unassignedBullets, assignedBullet];
    });
    this.assignedBullets.clear();
    this.forceUpdate(["bullets"]);
  }

  resetFieldTowers() {
    this.fieldTowers.clear();
    this.forceUpdate(["fieldTowers"]);
  }

  resetHealth() {
    this.health = 100;
    this.forceUpdate(["health"]);
  }

  resetWave() {
    this.waveNumber = 1;
    this.forceUpdate(["waveNumber"]);
  }

  updateFieldTowers = (towerId: string, fieldCellId: number) => {
    const partyTower = this.partyTowers.get(towerId)!;
    this.fieldTowers.set(towerId, {
      ...partyTower,
      fieldCellId,
      lastShotTime: 0,
    });
    this.forceUpdate(["fieldTowers"]);
  };

  decrementHealth() {
    this.health = this.health - 1 < 0 ? 0 : this.health - 1;
    this.forceUpdate(["health"]);
  }

  incrementMoney(amount = 10) {
    this.money = this.money + amount;
    this.forceUpdate(["money"]);
  }

  incrementWaveNumber() {
    this.waveNumber = this.waveNumber + 1;
    this.forceUpdate(["waveNumber"]);
  }

  prepareNextWave() {
    this.incrementMoney(50);
    this.incrementWaveNumber();
    this.updateGameStatus(GameStatusEnum.COMPLETED_WAVE);
  }

  isPartyTower(object: any): object is IPartyTower {
    return "id" in object;
  }

  updatePartyTowers = (partyTower: IBaseTower | IPartyTower) => {
    const { baseHealth, baseAttack, baseSpeed } = partyTower;
    let id: string;
    let level: number;
    if (this.isPartyTower(partyTower)) {
      id = partyTower.id;
      level = partyTower.level;
    } else {
      id = uuidv4();
      level = 1;
    }
    const newPartyTower: IPartyTower = {
      ...partyTower,
      id,
      health: generateHealthStat(baseHealth, level),
      attack: generateOtherStat(baseAttack, level),
      speed: generateOtherStat(baseSpeed, level),
    };
    this.partyTowers.set(id, newPartyTower);
    this.forceUpdate(["partyTowers"]);
  };

  getAdjustedAngle(angle: number, direction: DirectionEnum) {
    if (
      angle < 0 &&
      (direction === DirectionEnum.SOUTH || direction === DirectionEnum.NORTH)
    ) {
      return angle - 0.2;
    }
    if (angle > 0) {
      if (direction === DirectionEnum.SOUTH) {
        return angle + 0.2;
      }
      if (direction === DirectionEnum.NORTH) {
        return angle - 0.2;
      }
    }
    return angle;
  }

  animate() {
    this.initializeStartTime();
    this.animateEnemiesMovement();
    this.animateEnemiesInRange();
    this.animateBulletMovements();
    if (this.status === GameStatusEnum.FAIL_GAME_OVER) {
      this.reset(ResetTypeEnum.HARD);
    }
    if (this.status === GameStatusEnum.COMPLETED_WAVE) {
      this.reset(ResetTypeEnum.SOFT);
    }
    // this.forceUpdate(["animations"]);
  }

  initializeStartTime() {
    if (this.startTime === 0) {
      this.startTime = performance.now();
    }
  }

  animateEnemiesMovement() {
    this.enemies = this.enemies.filter((enemy) => {
      const { speed, currentPathWayIndex, id, delay, isActive } = enemy;
      if (!isActive) {
        return false;
      }

      const hasAssignedEnemyEl = this.assignedEnemies.get(id);
      if (!hasAssignedEnemyEl) {
        const unassignedEnemyEl = this.unassignedEnemies.pop()!;
        this.assignedEnemies.set(id, unassignedEnemyEl);
      }
      const assignedEnemyEl = this.assignedEnemies.get(id)!;

      if (currentPathWayIndex === this.pathWay.length - 1) {
        assignedEnemyEl!.hidden = true;
        this.unassignedEnemies = [...this.unassignedEnemies, assignedEnemyEl];
        this.assignedEnemies.delete(id);

        this.decrementHealth();
        if (this.health <= 0) {
          this.updateGameStatus(GameStatusEnum.FAIL_GAME_OVER);
        }
        return false;
      }

      const pathX = this.fieldCellsBounds![
        this.pathWay[currentPathWayIndex + 1]
      ].x;
      const pathY = this.fieldCellsBounds![
        this.pathWay[currentPathWayIndex + 1]
      ].y;
      let diffX = pathX - enemy.coords.x;
      let diffY = pathY - enemy.coords.y;
      if (enemy.direction === DirectionEnum.SOUTH) {
        diffY = diffY + 100;
      }
      const angle = Math.atan2(diffY, diffX);

      if (performance.now() - this.startTime > delay) {
        enemy.coords.x += speed * Math.cos(angle);
        enemy.coords.y += speed * Math.sin(angle);

        assignedEnemyEl!.style.top = `${enemy.coords.y}px`;
        assignedEnemyEl!.style.left = `${enemy.coords.x}px`;
        assignedEnemyEl!.hidden = false;
      }

      // Check if within range of path checkpoint
      const sumOfRadii = enemy.speed;
      const distance = Math.sqrt(
        Math.pow(pathX - enemy.coords.x, 2) +
          Math.pow(pathY - enemy.coords.y, 2)
      );

      if (distance < sumOfRadii) {
        enemy.currentPathWayIndex = currentPathWayIndex + 1;
      }

      const currentPathWay = this.pathWay[enemy.currentPathWayIndex];
      const nextPathWay = this.pathWay[enemy.currentPathWayIndex + 1];

      if (currentPathWay + 1 === nextPathWay) {
        enemy.direction = DirectionEnum.EAST;
      }
      if (currentPathWay - 1 === nextPathWay) {
        enemy.direction = DirectionEnum.WEST;
      }
      if (currentPathWay + 10 === nextPathWay) {
        enemy.direction = DirectionEnum.SOUTH;
      }
      if (currentPathWay - 10 === nextPathWay) {
        enemy.direction = DirectionEnum.NORTH;
      }

      return (
        enemy.coords.x < this.boardBounds!.width &&
        enemy.coords.y < this.boardBounds!.height
      );
    });
    // All enemies have either reached endpoint or
    if (!this.enemies.length) {
      this.prepareNextWave();
    }
  }

  animateEnemiesInRange() {
    this.fieldTowers.forEach((fTower) => {
      const { lastShotTime, range, speed, fieldCellId, id } = fTower;
      const { width, height, left, top } = this.fieldCellsBounds![fieldCellId];
      const halfCellWidth = width / 2;
      const halfCellHeight = height / 2;
      const centerCoords = { x: left + halfCellWidth, y: top + halfCellHeight };
      // TODO: Adjust cooldown period
      if (performance.now() - lastShotTime > 2000 / speed) {
        const enemyInRange = this.enemies.find((enemy) => {
          const extendedRange = width * range;
          const bulletRange = halfCellWidth + extendedRange;
          const enemyRadius = halfCellWidth;
          const sumOfRadii = bulletRange + enemyRadius;
          const centerEnemyCoords = {
            x: enemy.coords.x + halfCellWidth,
            y: enemy.coords.y + halfCellHeight,
          };
          const diffX = centerEnemyCoords.x - centerCoords.x;
          const diffY = centerEnemyCoords.y - centerCoords.y;
          const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
          // TODO: return enemy that meets the attackMode criteria - 'furthest', most 'health', most 'damage'
          return distance < sumOfRadii;
        });
        if (enemyInRange) {
          const coords = { ...centerCoords };
          const diffX = enemyInRange.coords.x - centerCoords.x;
          const diffY = enemyInRange.coords.y - centerCoords.y;
          const angle = Math.atan2(diffY, diffX);
          // Adjust bullet to shoot more towards the enemy's future position
          const adjustedAngled = this.getAdjustedAngle(
            angle,
            enemyInRange.direction
          );
          const bullet = {
            id: uuidv4(),
            coords,
            angle: adjustedAngled,
            towerId: id,
          };
          this.bullets = [...this.bullets, bullet];
          fTower.lastShotTime = performance.now();
        }
      }
    });
  }

  animateBulletMovements() {
    this.bullets = this.bullets.filter((bullet) => {
      const { towerId, angle, coords, id } = bullet;
      const fieldTower = this.fieldTowers.get(towerId)!;
      const { speed, attack, attackSize, attackColor } = fieldTower;
      const { width, height } = this.boardBounds!;
      const fieldCellBounds = this.fieldCellsBounds![0];
      const fieldCellWidth = fieldCellBounds.width;
      const fieldCellHeight = fieldCellBounds.height;

      const hasAssignedBulletEl = this.assignedBullets.get(id);
      if (!hasAssignedBulletEl) {
        const unassignedBulletEl = this.unassignedBullets.pop()!;
        this.assignedBullets.set(id, unassignedBulletEl);
      }
      const assignedBulletEl = this.assignedBullets.get(id)!;

      // TODO: Adjust speed attributes
      coords.x += speed * Math.cos(angle);
      coords.y += speed * Math.sin(angle);

      assignedBulletEl!.style.top = `${coords.y}px`;
      assignedBulletEl!.style.left = `${coords.x}px`;
      assignedBulletEl!.style.width = `${attackSize}px`;
      assignedBulletEl!.style.height = `${attackSize}px`;
      assignedBulletEl!.style.borderRadius = "2rem";
      assignedBulletEl!.style.backgroundColor = attackColor;
      assignedBulletEl!.hidden = false;

      const isInBounds =
        coords.x >= 0 &&
        coords.x <= width &&
        coords.y >= 0 &&
        coords.y <= height;
      if (isInBounds) {
        const struckEnemyIndex = this.enemies.findIndex((enemy) => {
          const halfAttackSize = attackSize / 2;
          const halfCellWidth = fieldCellWidth / 2;
          const halfCellHeight = fieldCellHeight / 2;
          const sumOfRadii = halfAttackSize + halfCellWidth;
          const centerEnemyCoords = {
            x: enemy.coords.x + halfCellWidth,
            y: enemy.coords.y + halfCellHeight,
          };
          const centerBulletCoords = {
            x: coords.x + halfAttackSize,
            y: coords.y + halfAttackSize,
          };
          const diffX = centerEnemyCoords.x - centerBulletCoords.x;
          const diffY = centerEnemyCoords.y - centerBulletCoords.y;
          const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
          return distance < sumOfRadii;
        });
        if (struckEnemyIndex >= 0) {
          fieldTower.exp += 8;
          const hasLeveledUp =
            fieldTower.exp >= this.expNeededToLevel!.get(fieldTower.level + 1)!;
          if (hasLeveledUp) {
            fieldTower.level += 1;
            if (
              fieldTower.level === fieldTower.levelToEvolve &&
              fieldTower.evolutionBaseId
            ) {
              const evolvedTower = allBaseTowers.get(
                fieldTower.evolutionBaseId
              );
              const newPartyTower = {
                ...fieldTower,
                ...evolvedTower,
                level: fieldTower.level,
                exp: fieldTower.exp,
              };
              this.updatePartyTowers(newPartyTower);
              this.updateFieldTowers(fieldTower.id, fieldTower.fieldCellId);
            } else {
              this.updatePartyTowers(fieldTower);
            }
          }
          const struckEnemy = this.enemies[struckEnemyIndex];
          struckEnemy.health -= attack!;
          const healthPercentage =
            (struckEnemy.health / struckEnemy.maxHealth) * 100;
          const assignedEnemyEl = this.assignedEnemies.get(struckEnemy.id)!;
          const healthBar = assignedEnemyEl.children[1].children[0] as any;
          healthBar.style.width = `${healthPercentage}%`;
          if (struckEnemy.health <= 0) {
            this.enemies.splice(struckEnemyIndex, 1);
            if (!this.enemies.length) {
              if (this.waveNumber === 10) {
                this.updateGameStatus(GameStatusEnum.SUCCESS_GAME_OVER);
              } else {
                this.prepareNextWave();
              }
            }
            const assignedEnemyEl = this.assignedEnemies.get(struckEnemy.id)!;
            assignedEnemyEl!.hidden = true;
            this.unassignedEnemies = [
              ...this.unassignedEnemies,
              assignedEnemyEl,
            ];
            this.assignedEnemies.delete(id);
            this.incrementMoney();
          }
          assignedBulletEl!.hidden = true;
          this.unassignedBullets = [
            ...this.unassignedBullets,
            assignedBulletEl,
          ];
          this.assignedBullets.delete(id);
          return false;
        }
      }
      if (!isInBounds) {
        assignedBulletEl!.hidden = true;
        this.unassignedBullets = [...this.unassignedBullets, assignedBulletEl];
        this.assignedBullets.delete(id);
      }
      return isInBounds;
    });
  }
}
