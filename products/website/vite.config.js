// Vite config for website lane
// This config is loaded by vite which runs from repo root,
// but builds the lane's source files

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

export default {
  plugins: [react()],
  root: __dirname,
  publicDir: resolve(ROOT, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      allow: [ROOT],
    },
  },
};
