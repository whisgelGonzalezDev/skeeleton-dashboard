import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './core/i18n/config' // initialize i18n before render
import './index.css'
import { App } from './App'

const root = document.getElementById('root')

if (!root) throw new Error('#root element not found in index.html')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
