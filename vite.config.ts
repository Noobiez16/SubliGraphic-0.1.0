import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // <-- Asegúrate de que este import esté presente
import path from 'path';

// defineConfig ahora recibe una función para acceder a 'mode' y cargar variables de entorno
export default defineConfig(({ mode }) => {
    // Carga las variables de entorno del archivo .env
    const env = loadEnv(mode, process.cwd(), '');

    return {
        // 1. AÑADIMOS EL PLUGIN DE REACT (esencial para que tu app funcione)
        plugins: [react()],

        // 2. AÑADIMOS LA RUTA BASE (esencial para el deploy en GitHub Pages)
        base: '/SubliGraphic-0.1.0/',

        // 3. MANTENEMOS TU NUEVA CONFIGURACIÓN PARA LAS VARIABLES DE ENTORNO
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        
        // 4. MANTENEMOS TU NUEVA CONFIGURACIÓN PARA LOS ALIAS
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
