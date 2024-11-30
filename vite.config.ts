/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    port: 3000,
    // proxy: {
    //   '/graphql': {
    //     target: 'http://localhost:4000/graphql', // Backend API URL
    //     changeOrigin: true, // For virtual hosted sites
    //     secure: false, // Set to false if using self-signed SSL certificates
    //     rewrite: (path) => path.replace(/^\/graphql/, ''), // Optional: Rewrite /graphql if needed
    //   },
    // },
  },
});
