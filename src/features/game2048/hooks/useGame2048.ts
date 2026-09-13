import { useState, useCallback } from "react";
import {
  addRandomTile,
  createEmptyBoard,
  hasWon,
  isGameOver,
  move,
} from "../utils/gameLogic";
import type { Board, Direction } from "../utils/gameLogic";

export type Status = "playing" | "won" | "over";

function freshBoard(): Board {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board); // two starting tiles, same as real 2048
  return board;
}

export function useGame2048() {
  const [board, setBoard] = useState<Board>(() => freshBoard());
  const [score, setScore] = useState<number>(0);
  const [best, setBest] = useState<number>(0);
  const [status, setStatus] = useState<Status>("playing");
  const [keepPlayingAfterWin, setKeepPlayingAfterWin] =
    useState<boolean>(false);

  const handelMove = useCallback(
    (direction: Direction) => {
      if (status === "over") return;
      if (status === "won" && !keepPlayingAfterWin) return;

      setBoard((prevBoard) => {
        const result = move(prevBoard, direction);

        if (!result.moved) return prevBoard;

        const finalBoard = addRandomTile(result.board);

        setScore((prevScore) => {
          const nextScore = prevScore + result.scoreGained;
          setBest((prevBest) => Math.max(prevBest, nextScore));
          return nextScore;
        });

        if (status === "playing" && hasWon(finalBoard)) setStatus("won");
        else if (isGameOver(finalBoard)) setStatus("over");
        return finalBoard;
      });
    },
    [status, keepPlayingAfterWin],
  );

  const restart = useCallback(() => {
    setBoard(freshBoard());
    setScore(0);
    setStatus("playing");
    setKeepPlayingAfterWin(false);
  }, []);

  const keepPlaying = useCallback(() => {
    setKeepPlayingAfterWin(true);
  }, []);

  return { board, score, best, keepPlaying, status, handelMove, restart };
}
