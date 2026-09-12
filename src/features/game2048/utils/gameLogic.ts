export const SIZE = 4;
export type Board = number[][];
export type CellPosition = { row: number; col: number };
export type SlideResult = {
  row: number[];
  scoreGained: number;
  moved: boolean;
};

export type MovedResult = {
  board: Board;
  scoreGained: number;
  moved: boolean;
};

export type Direction = "up" | "down" | "left" | "right";

export function createEmptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

export function addRandomTile(board: Board): Board {
  const emptyCells: CellPosition[] = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++)
      if (board[row][col] === 0) emptyCells.push({ row, col });
  }

  if (emptyCells.length === 0) return board;
  const randomCell = Math.floor(Math.random() * emptyCells.length);
  const chosenCell = emptyCells[randomCell];
  const value = Math.random() < 0.9 ? 2 : 4;
  const newBoard = board.map((row) => [...row]);
  newBoard[chosenCell.row][chosenCell.col] = value;
  return newBoard;
}

export function slideRowLeft(row: number[]): SlideResult {
  const compact = row.filter((v) => v !== 0);
  const merged: number[] = [];
  let scoreGained = 0;

  let i = 0;
  while (i < compact.length) {
    if (compact[i] === compact[i + 1]) {
      const mergedValue = compact[i] * 2;
      merged.push(mergedValue);
      scoreGained += mergedValue;
      i += 2;
    } else {
      merged.push(compact[i]);
      i += 1;
    }
  }

  while (merged.length < SIZE) merged.push(0);

  const moved = row.some((_, i) => row[i] !== merged[i]);
  return { row: merged, scoreGained, moved };
}

export function transpose(board: Board): Board {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}

export function move(board: Board, direction: Direction): MovedResult {
  let working = board;

  if (direction === "up" || direction === "down") working = transpose(working);
  if (direction === "right" || direction === "down")
    working = working.map((row) => [...row].reverse());

  const results: SlideResult[] = working.map((row) => slideRowLeft(row));

  const scoreGained = results.reduce((total, r) => total + r.scoreGained, 0);
  const moved = results.some((r) => r.moved);
  let newBoard: Board = results.map((r) => r.row);

  if (direction === "right" || direction === "down")
    newBoard = newBoard.map((row) => [...row].reverse());
  if (direction === "up" || direction === "down")
    newBoard = transpose(newBoard);

  return { board: newBoard, scoreGained, moved };
}

export function hasWon(board: Board): boolean {
  return board.some((row) => row.some((value) => value >= 2048));
}

export function isGameOver(board: Board): boolean {
  const hasAnyCellZero = board.some((row) => row.some((v) => v === 0));
  if (hasAnyCellZero) return false;

  const hasPossibleMerge = board.some((row, rowIndex) => {
    return row.some((value, colIndex) => {
      const rightNeighbor = row[colIndex + 1];
      const belowNeighbor = board[rowIndex + 1]?.[colIndex];
      return value === rightNeighbor || value === belowNeighbor;
    });
  });
  return !hasPossibleMerge;
}
