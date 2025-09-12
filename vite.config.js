import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: This base path tells Vite where the project will live.
  // It ensures all asset paths (CSS, JS, images) are generated correctly.
  base: '/SubliGraphic-0.0.1/', 
})
