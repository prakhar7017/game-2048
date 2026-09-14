# 2048

A clean, responsive take on the classic [2048](https://en.wikipedia.org/wiki/2048_(video_game)) sliding-tile puzzle, built with React 19, TypeScript, and Vite.

Slide the tiles, merge matching numbers, and try to reach the **2048** tile.

## Features

- Classic 4×4 board with two starting tiles
- Keyboard controls (arrow keys or WASD)
- Swipe controls on touch devices
- Live score and best score for the session
- Win screen with the option to keep playing past 2048
- Game-over detection when no moves are left
- Mobile-friendly layout

## How to play

| Input                | Action           |
| -------------------- | ---------------- |
| `↑` / `W`            | Slide up         |
| `↓` / `S`            | Slide down       |
| `←` / `A`            | Slide left       |
| `→` / `D`            | Slide right      |
| Swipe (touch)        | Slide that way   |
| **New Game** button  | Restart          |

When you slide, every tile moves as far as it can in that direction. Two tiles with the same number merge into one tile worth their sum, and that sum is added to your score. After each move that changes the board, a new tile appears in an empty cell: a `2` 90% of the time, or a `4` otherwise. The game ends when the board is full and no neighboring tiles can merge.

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) (a current LTS version) and npm.

```bash
git clone git@github.com:prakhar7017/game-2048.git
cd game-2048
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the dev server with hot module reloading  |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Run ESLint                                       |

## Project structure

```
src/
├── main.tsx                     # App entry point, renders <Game2048 />
└── features/game2048/
    ├── game2048.tsx             # Top-level game component and keyboard input
    ├── game2048.css             # Game styles
    ├── components/
    │   ├── board.tsx            # Grid background and tiles
    │   ├── tile.tsx             # A single numbered tile
    │   ├── scoreboard.tsx       # Score and best score
    │   └── overlay.tsx          # Win and game-over overlay
    ├── hooks/
    │   ├── useGame2048.ts       # Game state: board, score, status, actions
    │   └── useSwipe.ts          # Touch swipe detection
    └── utils/
        └── gameLogic.ts         # Pure game logic (slide, merge, win/lose checks)
```

### How the logic works

All game rules live in `utils/gameLogic.ts` as pure functions with no React dependencies:

- `slideRowLeft` compacts one row to the left and merges equal neighbors. Each tile merges at most once per move.
- `move` reuses `slideRowLeft` for every direction. It transposes and/or reverses the board so the move becomes a left slide, then undoes the transform afterward.
- `hasWon` checks for a tile of 2048 or higher, and `isGameOver` checks for a full board with no possible merges.

`useGame2048` wraps these functions in React state, and `game2048.tsx` connects them to keyboard and swipe input.

## Tech stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [ESLint](https://eslint.org/)
