import { SIZE, type Board as BoardType } from "../utils/gameLogic";
import { Tile } from "./tile";

type BoardProps = {
  board: BoardType;
  swipeHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
};

export function Board({ board, swipeHandlers }: BoardProps) {
  return (
    <div className="board" {...swipeHandlers}>
      {Array.from({ length: SIZE * SIZE }, (_, i) => (
        <div key={`bg-${i}`} className="board-cell-bg" />
      ))}
      {board.flatMap((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}-${value}`}
            value={value}
            row={rowIndex}
            col={colIndex}
          />
        )),
      )}
    </div>
  );
}
