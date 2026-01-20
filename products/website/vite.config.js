import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

// Use createRequire to resolve packages from repo root
const require = createRequire(resolve(repoRoot, 'package.json'));
const react = require('@vitejs/plugin-react');

export default {
  plugins: [react()],
  publicDir: resolve(repoRoot, 'public'),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
};
