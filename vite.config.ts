import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

// Plugin to create 404.html for SPA fallback on static hosts
const spa404Plugin = () => ({
  name: 'spa-404',
  closeBundle() {
    // Copy index.html to 404.html for SPA routing fallback
    copyFileSync(
      resolve(__dirname, 'dist/index.html'),
      resolve(__dirname, 'dist/404.html')
    );
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spa404Plugin()],
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  publicDir: 'public',
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    outDir: 'dist',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
});
