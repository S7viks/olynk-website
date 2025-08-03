import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    sourcemap: false,
    minify: 'esbuild',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
