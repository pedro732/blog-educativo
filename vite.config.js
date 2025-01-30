import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    // Eliminar o comentar la configuración del proxy
    // proxy: {
    //   '/api': {
    //     target: process.env.VITE_API_URL || 'http://localhost:5001',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});