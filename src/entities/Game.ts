import { Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
// Types & Helpers
import { TerrainEnum, RarityEnum, IBaseTower } from "../types/tower";
import {
  RegionsEnum,
  GameStatusEnum,
  ResetTypeEnum,
  IListener,
} from "../types/game";
import { getBaseTowers, allBaseTowers } from "../utils/baseTowers";
import { regionStarters } from "../utils/starters";
// Entities
import { EnemyTower } from "./EnemyTower";
import { Bullet } from "./Bullet";
import { PartyTower } from "./PartyTower";
import { FieldTower } from "./FieldTower";
import { Board } from "./Board";
import { Cell } from "./Cell";

export class Game {
  listeners: Map<string, Dispatch<React.SetStateAction<any>>[]>;
  status: GameStatusEnum;
  gameTimer: number;
  intervalId: number;
  health: number;
  terrain: TerrainEnum;
  board: Board;
  region: RegionsEnum;
  starters: any[]; // TODO: Update type definition
  baseTowers: Map<TerrainEnum, Map<RarityEnum, IBaseTower[]>>; // TODO: Update with BaseTower class instance
  partyTowers: Map<string, PartyTower>;
  fieldTowers: Map<string, FieldTower>;
  enemiesPerWave: number[];
  currentWaveNumber: number;
  enemies: EnemyTower[];
  bullets: Bullet[];
  unassignedBullets: HTMLDivElement[];
  unassignedEnemies: HTMLDivElement[];
  money: number;
  constructor(terrain: TerrainEnum, region: RegionsEnum) {
    this.listeners = new Map();
    this.status = GameStatusEnum.IDLE;
    this.gameTimer = 0;
    this.intervalId = 0;
    this.health = 100;
    this.terrain = terrain;
    this.board = new Board(this.terrain);
    this.region = region;
    this.starters = regionStarters.get(this.region)!;
    this.baseTowers = getBaseTowers();
    this.partyTowers = new Map();
    this.fieldTowers = new Map();
    this.enemiesPerWave = [1, 1, 2, 2, 1, 1, 3, 3, 3, 3];
    this.currentWaveNumber = 1;
    this.enemies = [];
    this.bullets = [];
    this.unassignedBullets = [];
    this.unassignedEnemies = [];
    this.money = 50;
  }

  addListener = (listener: IListener) => {
    listener.valuesToWatch.forEach((val) => {
      const value = this.listeners.get(val);
      if (value) {
        this.listeners.set(val, [...value, listener.update]);
      } else {
        this.listeners.set(val, [listener.update]);
      }
    });
  };

  dispatch = (keys: string[]) => {
    if (keys) {
      keys.forEach((key) => {
        const updates = this.listeners.get(key);
        if (updates) {
          updates.forEach((update: Dispatch<any>) =>
            update(() => cloneDeep(this))
          );
        }
      });
    }
  };

  initializeGame = () => {
    this.initializeEnemies();
  };

  private initializeEnemies = () => {
    for (let i = 0; i < this.enemiesPerWave[this.currentWaveNumber - 1]; i++) {
      const rarity = this.getRandomRarity();
      const baseTowersByTerrain = this.baseTowers.get(this.terrain)!;
      const baseTowersByRarity = baseTowersByTerrain.get(rarity)!;
      const randomIndex = Math.floor(Math.random() * baseTowersByRarity.length);
      const { baseId, baseHealth, baseSpeed, component } = baseTowersByRarity[
        randomIndex
      ];
      const avgPartyLvl = this.partyTowers.size ? this.getAvgPartyLvl() : 1;
      const maxLevelRange = Math.ceil(avgPartyLvl) + 5;
      const minLevelRange = Math.ceil(avgPartyLvl);
      const level =
        Math.floor(Math.random() * (maxLevelRange - minLevelRange + 1)) +
        minLevelRange;
      const id = uuidv4();
      const pathCell = this.board.cells[0];
      const enemy = new EnemyTower(
        id,
        level,
        baseId,
        1000 * i,
        baseHealth,
        baseSpeed,
        component,
        pathCell
      );
      this.enemies.push(enemy);
    }
    this.dispatch(["enemies"]);
  };

  // ADD
  addPartyTower = (baseId: number, level: number) => {
    const id = uuidv4();
    const baseTower = allBaseTowers.get(baseId)!;
    const newLevel = level || baseTower.level;
    const newPartyTower = new PartyTower(
      id,
      baseTower.baseId,
      baseTower.component,
      baseTower.name,
      baseTower.attackType,
      baseTower.attackSize,
      baseTower.attackColor,
      baseTower.baseHealth,
      baseTower.baseSpeed,
      baseTower.baseAttack,
      baseTower.range,
      baseTower.terrain,
      baseTower.rarity,
      baseTower.region,
      baseTower.exp,
      newLevel,
      baseTower.levelToEvolve,
      baseTower.evolutionBaseId
    );
    this.partyTowers.set(id, newPartyTower);
    this.dispatch(["partyTowers"]);
  };

  addFieldTower = (towerId: string, cellRef: Cell) => {
    const hasBeenPlaced = this.fieldTowers.has(towerId);
    if (!hasBeenPlaced) {
      const partyTowerRef = this.partyTowers.get(towerId)!;
      cellRef.isOccupied = true;
      this.fieldTowers.set(towerId, new FieldTower(partyTowerRef, cellRef));
      this.dispatch(["fieldTowers"]);
    }
  };

  addBulletElement = (bulletEl: HTMLDivElement) => {
    this.unassignedBullets.push(bulletEl);
  };

  addEnemyElement = (enemyEl: HTMLDivElement) => {
    this.unassignedEnemies.push(enemyEl);
  };

  addFieldCellElement = (fieldCellEl: HTMLDivElement) => {
    this.board.addFieldCellEl(fieldCellEl, this.dispatch);
  };

  addBoardElement = (boardEl: HTMLDivElement) => {
    this.board.addBoardEl(boardEl);
  };

  // GET
  private getRandomRarity = () => {
    const rarityVal = Math.floor(Math.random() * 100);
    const rarity =
      rarityVal > 95
        ? RarityEnum.RARE
        : rarityVal > 80
        ? RarityEnum.UNCOMMON
        : RarityEnum.COMMON;
    return rarity;
  };

  private getAvgPartyLvl = () => {
    let lvlTotal = 0;
    this.partyTowers.forEach((partTower) => {
      lvlTotal += partTower.level;
    });
    return lvlTotal / this.partyTowers.size;
  };

  // UPDATE
  updateGameStatus = (gameStatus: GameStatusEnum) => {
    this.status = gameStatus;
    this.dispatch(["status"]);
    switch (gameStatus) {
      case GameStatusEnum.STARTED: {
        this.activateGameTimer();
        break;
      }
      case GameStatusEnum.PAUSED: {
        this.deactivateGameTimer();
        break;
      }
      case GameStatusEnum.COMPLETED_WAVE: {
        this.currentWaveNumber += 1;
        this.money += 50;
        this.dispatch(["money", "currentWaveNumber"]);
        this.deactivateGameTimer();
        break;
      }
      case GameStatusEnum.FAIL_GAME_OVER: {
        this.deactivateGameTimer();
        break;
      }
      case GameStatusEnum.SUCCESS_GAME_OVER: {
        this.deactivateGameTimer();
        break;
      }
    }
  };

  decrementHealth = () => {
    this.health -= 1;
    if (this.health <= 0) {
      this.updateGameStatus(GameStatusEnum.FAIL_GAME_OVER);
    }
    this.dispatch(["health"]);
  };

  activateGameTimer = () => {
    this.intervalId = window.setInterval(() => {
      this.gameTimer += 1000;
      this.dispatch(["gameTimer"]);
    }, 1000);
  };

  deactivateGameTimer = () => {
    window.clearInterval(this.intervalId);
    this.gameTimer = 0;
    this.dispatch(["gameTimer"]);
  };

  attemptCapture = (cellId: number) => {
    const enemy = this.enemies.find((enemy) => {
      return enemy.currentPathCell.id === cellId;
    });
    if (enemy) {
      const { maxHealth, health, baseId, level, enemyElement, id } = enemy;
      const randomValue = Math.floor(Math.random() * 255);
      const result = (maxHealth * 255 * 4) / (health * 12);
      if (result >= randomValue) {
        this.addPartyTower(baseId, level);
        if (enemyElement) {
          enemyElement.hidden = true;
          this.unassignedEnemies.push(enemyElement);
          this.enemies = this.enemies.filter((enemy) => enemy.id !== id);
        }
      }
    }
  };

  // ANIMATE
  animations = () => {
    this.animateEnemiesMovement();
    this.animateEnemiesInRange();
    this.animateBulletMovements();
    if (this.status === GameStatusEnum.FAIL_GAME_OVER) {
      this.reset(ResetTypeEnum.HARD);
    }
    if (this.status === GameStatusEnum.COMPLETED_WAVE) {
      this.reset(ResetTypeEnum.SOFT);
    }
  };

  private animateEnemiesMovement = () => {
    this.enemies = this.enemies.filter((enemy) => {
      const { speed, currentPathWayIndex, delay, currentPathCell } = enemy;
      const { path } = this.board;
      // Assign enemyElement
      if (!enemy.enemyElement) {
        const unassignedEnemy = this.unassignedEnemies.pop()!;
        enemy.enemyElement = unassignedEnemy;
      }
      // Enemy has reached goal
      if (currentPathWayIndex === path.length - 1) {
        enemy.enemyElement.hidden = true;
        this.unassignedEnemies.push(enemy.enemyElement);
        this.decrementHealth();
        return false;
      }
      // Get angle between current path coords that the enemy is on to the next path coords
      const cellBounds = path[
        currentPathWayIndex + 1
      ].cellEl.getBoundingClientRect();
      const pathX = cellBounds.x;
      const pathY = cellBounds.y;
      let diffX = pathX - enemy.coords.x;
      let diffY = pathY - enemy.coords.y;
      const angle = Math.atan2(diffY, diffX);
      // Update enemy position
      if (this.gameTimer >= delay) {
        const {
          width,
          height,
        } = currentPathCell.cellEl.getBoundingClientRect();
        enemy.coords.x += speed * Math.cos(angle);
        enemy.coords.y += speed * Math.sin(angle);
        enemy.enemyElement.style.top = `${enemy.coords.y}px`;
        enemy.enemyElement.style.left = `${enemy.coords.x}px`;
        enemy.enemyElement.style.width = `${width}px`;
        enemy.enemyElement.style.height = `${height}px`;
        enemy.enemyElement.hidden = false;
      }
      // Check if within range of next path
      const sumOfRadii = enemy.speed;
      const distance = Math.sqrt(
        Math.pow(pathX - enemy.coords.x, 2) +
          Math.pow(pathY - enemy.coords.y, 2)
      );
      // Enemy has reached next path, update path index
      if (distance < sumOfRadii) {
        enemy.currentPathWayIndex = currentPathWayIndex + 1;
        enemy.currentPathCell = path[enemy.currentPathWayIndex];
      }
      return true;
    });
    // All enemies have either reached endpoint or defeated
    if (!this.enemies.length) {
      this.updateGameStatus(GameStatusEnum.COMPLETED_WAVE);
    }
  };

  private animateEnemiesInRange = () => {
    this.fieldTowers.forEach((fTower) => {
      const { lastShotTime, partyTowerRef, cellRef } = fTower;
      const { speed, range } = partyTowerRef;
      const {
        width,
        height,
        left,
        top,
      } = cellRef.cellEl.getBoundingClientRect();
      const halfCellWidth = width / 2;
      const halfCellHeight = height / 2;
      const centerCoords = { x: left + halfCellWidth, y: top + halfCellHeight };
      // Check tower's cooldown period
      if (this.gameTimer - lastShotTime > 5000 / speed) {
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
          return distance < sumOfRadii;
        });
        // Create bullet entity if enemy is within range
        if (enemyInRange) {
          const coords = { ...centerCoords };
          const diffX = enemyInRange.coords.x - centerCoords.x;
          const diffY = enemyInRange.coords.y - centerCoords.y;
          const angle = Math.atan2(diffY, diffX);
          const bulletElement = this.unassignedBullets.pop()!;
          const bulletId = uuidv4();
          const bullet = new Bullet(
            bulletId,
            coords,
            angle,
            fTower,
            bulletElement
          );
          this.bullets.push(bullet);
          fTower.lastShotTime = this.gameTimer;
        }
      }
    });
  };

  private animateBulletMovements = () => {
    this.bullets = this.bullets.filter((bullet) => {
      const { angle, coords, fieldTowerRef, bulletElement } = bullet;
      const { partyTowerRef, cellRef } = fieldTowerRef;
      const { speed, attack, attackSize, attackColor } = partyTowerRef;
      const cellBounds = cellRef.cellEl.getBoundingClientRect();
      const { width, height } = this.board.boardEl!.getBoundingClientRect();
      const fieldCellWidth = cellBounds.width;
      const fieldCellHeight = cellBounds.height;

      coords.x += speed * Math.cos(angle);
      coords.y += speed * Math.sin(angle);

      bulletElement.style.top = `${coords.y}px`;
      bulletElement.style.left = `${coords.x}px`;
      bulletElement.style.width = `${attackSize}px`;
      bulletElement.style.height = `${attackSize}px`;
      bulletElement.style.borderRadius = "2rem";
      bulletElement.style.backgroundColor = attackColor;
      bulletElement.hidden = false;

      const isInBounds =
        coords.x >= 0 &&
        coords.x <= width &&
        coords.y >= 0 &&
        coords.y <= height;
      if (isInBounds) {
        const damagedEnemy = this.enemies.find((enemy) => {
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

        if (damagedEnemy) {
          partyTowerRef.incrementExp(this.dispatch);
          damagedEnemy.health -= attack;
          const healthPercentage =
            (damagedEnemy.health / damagedEnemy.maxHealth) * 100;
          const enemyElement = damagedEnemy.enemyElement!;
          const healthBarEl = enemyElement.children[1].children[0] as any;
          healthBarEl.style.width = `${healthPercentage}%`;
          if (damagedEnemy.health <= 0) {
            this.money += this.currentWaveNumber * 3;
            this.dispatch(["money"]);
            // Remove enemy from active and add back to unassigned
            enemyElement.hidden = true;
            this.unassignedEnemies.push(enemyElement);
            this.enemies = this.enemies.filter(
              (enemy) => enemy.id !== damagedEnemy.id
            );
            if (!this.enemies.length) {
              if (this.currentWaveNumber === 10) {
                this.updateGameStatus(GameStatusEnum.SUCCESS_GAME_OVER);
              } else {
                this.updateGameStatus(GameStatusEnum.COMPLETED_WAVE);
              }
            }
          }
          // Remove bullet from active and add back to unassigned
          bulletElement!.hidden = true;
          this.unassignedBullets.push(bulletElement);
          return false;
        }
      }
      if (!isInBounds) {
        // Remove bullet from active and add back to unassigned
        bulletElement!.hidden = true;
        this.unassignedBullets.push(bulletElement);
      }
      return isInBounds;
    });
  };

  // RESETS
  reset = (type: ResetTypeEnum) => {
    if (type === ResetTypeEnum.HARD) {
      this.deactivateGameTimer();
      this.resetHealth();
      this.resetWaveNumber();
      this.resetOccupiedCells();
      this.fieldTowers.clear();
      this.dispatch(["fieldTowers"]);
    }
    this.resetEnemies();
    this.resetBullets();
    this.resetFieldTowers();
    this.updateGameStatus(GameStatusEnum.IDLE);
    this.initializeEnemies();
  };

  private resetHealth = () => {
    this.health = 100;
    this.dispatch(["health"]);
  };

  private resetWaveNumber = () => {
    this.currentWaveNumber = 1;
    this.dispatch(["currentWaveNumber"]);
  };

  private resetEnemies = () => {
    this.enemies.forEach(({ enemyElement }) => {
      if (enemyElement) {
        enemyElement.hidden = true;
        this.unassignedEnemies.push(enemyElement);
      }
    });
    this.enemies = [];
  };

  private resetBullets = () => {
    this.bullets.forEach(({ bulletElement }) => {
      bulletElement.hidden = true;
      this.unassignedBullets.push(bulletElement);
    });
    this.bullets = [];
  };

  private resetFieldTowers = () => {
    this.fieldTowers.forEach((fieldTower) => {
      fieldTower.lastShotTime = 0;
    });
  };

  private resetOccupiedCells = () => {
    this.fieldTowers.forEach((fieldTower) => {
      fieldTower.cellRef.isOccupied = false;
    });
  };
}
