import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Let Vite use default
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});