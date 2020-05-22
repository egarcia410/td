import { Dispatch } from "react";
import { Cell } from "./Cell";
import { ITerrainColors, CellVariantEnum } from "../types";
import { TerrainEnum } from "../types/tower";

export class Board {
  terrain: TerrainEnum;
  terrainColors: ITerrainColors;
  boardEl: HTMLDivElement | null;
  cells: Cell[];
  path: Cell[];
  obstaclePercentage: number;
  otherPercentage: number;
  numOfCells: number;
  numOfCols: number;
  numOfRows: number;
  constructor(terrain: TerrainEnum, terrainColors: ITerrainColors) {
    this.terrain = terrain;
    // TODO: Create helper function to get terrainColors based on terrain type
    this.terrainColors = terrainColors;
    this.boardEl = null;
    this.cells = [];
    this.path = [];
    this.obstaclePercentage = 25;
    this.otherPercentage = 15;
    this.numOfCols = 10;
    this.numOfRows = 10;
    this.numOfCells = this.numOfCols * this.numOfRows;
  }

  initializeBoard = (dispatch: Dispatch<any>) => {
    this.resetCells();
    this.generatePath();
    this.addOtherCells();
    if (!this.path.length) {
      this.initializeBoard(dispatch);
    } else {
      dispatch(["path"]);
    }
  };

  // ADD
  addFieldCellEl = (fieldCellEl: HTMLDivElement, dispatch: Dispatch<any>) => {
    const id = this.cells.length;
    this.cells.push(new Cell(id, fieldCellEl, false));
    if (this.cells.length === this.numOfCells) {
      this.initializeBoard(dispatch);
    }
  };

  addBoardEl = (boardEl: HTMLDivElement) => {
    this.boardEl = boardEl;
  };

  resetCells = () => {
    this.cells.forEach((cell, index) => {
      // Default terrain color to field colors
      cell.cellEl.style.backgroundColor = this.terrainColors.land.primary;
      cell.cellEl.style.border = `1px solid ${this.terrainColors.land.secondary}`;
      cell.resetHard();
      // Randomize field with obstacles
      if (index !== 0 && index !== this.cells.length - 1) {
        const isOccupied =
          Math.floor(Math.random() * Math.floor(100)) < this.obstaclePercentage;
        if (isOccupied) {
          cell.isOccupied = isOccupied;
          cell.cellEl.style.backgroundColor = this.terrainColors.obstacle.primary;
          cell.cellEl.style.border = `1px solid ${this.terrainColors.obstacle.secondary}`;
          cell.variant = CellVariantEnum.OBSTACLE;
        }
      }
    });
  };

  addOtherCells = () => {
    this.cells.forEach((cell) => {
      const isOther =
        Math.floor(Math.random() * Math.floor(100)) < this.otherPercentage;
      if (isOther) {
        if (cell.variant === CellVariantEnum.LAND) {
          // Add random water cells
          cell.cellEl.style.backgroundColor = this.terrainColors.water.primary;
          cell.cellEl.style.border = `1px solid ${this.terrainColors.water.secondary}`;
          cell.variant = CellVariantEnum.WATER;
        } else if (cell.variant === CellVariantEnum.WATER) {
          // Add random land cells
          cell.cellEl.style.backgroundColor = this.terrainColors.land.primary;
          cell.cellEl.style.border = `1px solid ${this.terrainColors.land.secondary}`;
          cell.variant = CellVariantEnum.LAND;
        }
      }
    });
  };

  generatePath = () => {
    const cells = this.cells;
    let path = [];
    for (let k = 0; k < cells.length; k++) {
      const cell = cells[k];
      cell.addHeuristicCost(
        cells[cells.length - 1].cellEl.getBoundingClientRect()
      );
      cell.addNeighbors(cells, this.numOfCols);
    }
    const startCell: Cell = cells[0];
    startCell.GCost = 0;
    const openList = [startCell];
    const closedList = [];
    while (openList.length) {
      openList.sort((a, b) => {
        return a.FCost < b.FCost ? 1 : 0;
      });
      const currentCell = openList.shift();
      if (currentCell) {
        const { cellEl, neighbors } = currentCell;
        const endCell = cells[cells.length - 1];
        const endCellBounds = endCell.cellEl.getBoundingClientRect();
        const cellBounds = cellEl.getBoundingClientRect();
        closedList.push(currentCell);
        if (
          cellBounds.x === endCellBounds.x &&
          cellBounds.y === endCellBounds.y
        ) {
          let curr = endCell;
          path.push(curr);
          while (curr.parent) {
            curr.isOccupied = true;
            curr.variant = CellVariantEnum.PATH;
            curr.cellEl.style.backgroundColor = this.terrainColors.path.primary;
            curr.cellEl.style.border = `1px solid ${this.terrainColors.path.secondary}`;
            path.push(curr.parent);
            curr = curr.parent;
          }
          curr.isOccupied = true;
          curr.variant = CellVariantEnum.PATH;
          curr.cellEl.style.backgroundColor = this.terrainColors.path.primary;
          curr.cellEl.style.border = `1px solid ${this.terrainColors.path.secondary}`;
          break;
        }
        for (let i = 0; i < neighbors.length; i++) {
          if (closedList.includes(neighbors[i])) {
            continue;
          }
          const tempGCost = currentCell.GCost + 10;
          if (tempGCost < neighbors[i].GCost) {
            neighbors[i].parent = currentCell;
            neighbors[i].GCost = tempGCost;
            neighbors[i].FCost = neighbors[i].GCost + neighbors[i].HCost;
            if (!openList.includes(neighbors[i])) {
              openList.push(neighbors[i]);
            }
          }
        }
      }
    }
    this.path = path.length ? path.reverse() : [];
  };
}
