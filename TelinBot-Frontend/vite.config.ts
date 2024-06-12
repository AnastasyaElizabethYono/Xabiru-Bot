/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
const root = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@/apps': resolve(root, 'apps'),
      '@/components': resolve(root, 'components'),
      '@/assets': resolve(root, 'assets'),
      '@/router': resolve(root, 'router'),
      '@/reducers': resolve(root, 'reducers'),
      '@/services': resolve(root, 'services'),
      '@/types': resolve(root, 'types'),
      '@/hooks': resolve(root, 'hooks'),
      '@/utils': resolve(root, 'utils'),
    },
  },
});
