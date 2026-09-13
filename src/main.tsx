import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Game2048 } from './features/game2048/game2048.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game2048/>
  </StrictMode>,
)
