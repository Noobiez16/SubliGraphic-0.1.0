import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: This base path tells Vite where the project will live.
  // By setting it to './', all asset paths will be relative, making the
  // deployment independent of the repository name.
  base: './', 
})