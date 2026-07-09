import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: '../public',

  css: {
    preprocessorOptions: {
      scss: { quietDeps: true },
    },
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'src/index.html'),
        about:   resolve(__dirname, 'src/about.html'),
        contact: resolve(__dirname, 'src/contact.html'),
      },
    },
    terserOptions: {
      compress: { drop_console: true },
    },
  },

  plugins: [
    legacy({ targets: ['> 0.5%', 'last 2 versions', 'not dead', 'not IE 11'] }),
  ],

  server:  { port: 5173, open: true },
  preview: { port: 4173, open: true },
});
