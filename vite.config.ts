import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import circleDependency from 'vite-plugin-circular-dependency';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
      '@scss': path.resolve(__dirname, './src/scss'),
      '@styled': path.resolve(__dirname, './styled-system'),
      '@ui': path.resolve(__dirname, './src/ui'),
    },
  },
  plugins: [react(), circleDependency()],
});
