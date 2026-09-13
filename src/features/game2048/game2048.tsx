import { useEffect } from "react";
import { useGame2048 } from "./hooks/useGame2048";
import type { Direction } from "./utils/gameLogic";
import { useSwipe } from "./hooks/useSwipe";
import { Scoreboard } from "./components/scoreboard";
import { Board } from "./components/board";
import { Overlay } from "./components/overlay";

const KEY_MAP: Record<string, Direction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w:'up',
    s:'down',
    a:'left',
    d:'right'
}

export function Game2048() {
    const { board, score, best, status, handelMove, restart, keepPlaying } = useGame2048();

    useEffect(()=>{
        function onKeyDown(e:KeyboardEvent) {
            const direction = KEY_MAP[e.key];
            if(!direction) return;
            e.preventDefault();
            handelMove(direction);
        }
        window.addEventListener("keydown",onKeyDown);
        return ()=>window.removeEventListener("keydown",onKeyDown);
    },[handelMove]);

    const swipeHandlers = useSwipe(handelMove);

    return (
        <div>
            <header>
                <h1>2048</h1>
                <Scoreboard score={score} best={best}/>
            </header>
            <p>
                Combine tiles with the same number. Arrow keys / WASD, or swipe on touch.
            </p>
            <div>
                <Board board={board} swipeHandlers={swipeHandlers}/>
                <Overlay status={status} onRestart={restart} onKeepPlaying={keepPlaying}/>
            </div>
            <button onClick={restart}>
                New Game
            </button>
        </div>
    )

}