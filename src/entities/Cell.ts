export class Cell {
  id: number;
  cellEl: HTMLDivElement;
  isOccupied: boolean;
  HCost: number;
  GCost: number;
  FCost: number;
  neighbors: Cell[];
  parent: Cell | null;
  constructor(id: number, cellEl: HTMLDivElement, isOccupied: boolean) {
    this.id = id; // Index of cell on grid
    this.cellEl = cellEl;
    this.isOccupied = isOccupied;
    this.HCost = 0;
    this.GCost = Infinity;
    this.FCost = Infinity;
    this.neighbors = [];
    this.parent = null;
  }

  resetHard = () => {
    this.isOccupied = false;
    this.resetPartial();
  };

  resetPartial = () => {
    this.GCost = Infinity;
    this.FCost = Infinity;
    this.HCost = 0;
    this.neighbors = [];
    this.parent = null;
  };

  addHeuristicCost = (endCellBounds: DOMRect) => {
    if (!this.isOccupied) {
      const cellBounds = this.cellEl.getBoundingClientRect();
      const dx = Math.abs(cellBounds.x - endCellBounds.x);
      const dy = Math.abs(cellBounds.y - endCellBounds.y);
      this.HCost = dx + dy;
    }
  };

  addNeighbors = (cells: Cell[], numOfCols: number) => {
    if (this.isOccupied) return;
    const numOfCells = cells.length;
    const id = this.id;
    let neighbors = [];
    // North
    if (id - numOfCols >= 0 && !cells[id - numOfCols].isOccupied) {
      neighbors.push(cells[id - numOfCols]);
    }
    // South
    if (id + numOfCols < numOfCells && !cells[id + numOfCols].isOccupied) {
      neighbors.push(cells[id + numOfCols]);
    }
    // East
    if ((id + 1) % numOfCols !== 0 && !cells[id + 1].isOccupied) {
      neighbors.push(cells[id + 1]);
    }
    // West
    if (id < numOfCols && id - 1 >= 0 && !cells[id - 1].isOccupied) {
      neighbors.push(cells[id - 1]);
    } else {
      if (id % numOfCols !== 0 && !cells[id - 1].isOccupied) {
        neighbors.push(cells[id - 1]);
      }
    }
    this.neighbors = neighbors;
  };
}
