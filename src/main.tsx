import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Game2048 } from './features/game2048/game2048.tsx'
import './features/game2048/game2048.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game2048/>
  </StrictMode>,
)
