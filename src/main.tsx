import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Reveal animations are opt-in: CSS only hides-then-reveals when this class exists,
// so crawlers and no-JS readers always get fully visible content (CLAUDE.md 4a.3).
document.documentElement.classList.add('js')

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Prerendered builds ship real markup in #root; dev mode (vite dev) serves the raw,
// empty index.html. Hydrate when there's SSR content to reconcile against, otherwise
// fall back to a plain client render so local dev keeps working.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
