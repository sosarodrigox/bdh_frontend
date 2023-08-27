import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define las variables de entorno para Vite
const viteEnv = {
  VITE_REACT_APP_BACKEND_URL: process.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000',
};

export default defineConfig({
  plugins: [react()],
  define: viteEnv,
});
