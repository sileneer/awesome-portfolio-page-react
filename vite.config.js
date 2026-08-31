import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import portfolioMeta from './vite-plugin-portfolio-meta';

export default defineConfig({
  // Deployments on a sub-path (e.g. a template demo on GitHub Pages) set
  // VITE_BASE; local dev and root deployments get '/'.
  base: process.env.VITE_BASE || '/',
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
