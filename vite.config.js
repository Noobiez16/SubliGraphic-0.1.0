import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- CORRECCIÓN CRÍTICA ---
  // Le decimos a Vite que la base del proyecto en producción
  // será el nombre del repositorio.
  base: '/SubliGraphic-0.1.0/', 
})

