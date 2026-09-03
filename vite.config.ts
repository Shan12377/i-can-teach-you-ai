import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The manifest lets scripts/prerender.mjs find the CSS chunk for each lazy route and
  // inline it into that route's static HTML. Without it, every route except the eager
  // homepage prerendered with no styles until its JS chunk loaded.
  build: {
    manifest: true,
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
    port: 4175,
  },
})
