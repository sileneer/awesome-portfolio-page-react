import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import portfolioMeta from './vite-plugin-portfolio-meta';

export default defineConfig({
  plugins: [react(), portfolioMeta()],
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
});
