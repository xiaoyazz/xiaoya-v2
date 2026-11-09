import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps every URL relative, so the same build works at
// https://xiaoyazz.github.io/xiaoya-v2/, on any static host, and locally.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // public/assets holds the site's images; keep Vite's hashed bundles separate.
    assetsDir: 'static',
  },
});
