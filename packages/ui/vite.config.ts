/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import copy from 'rollup-plugin-copy';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1337,
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['lib'],
      insertTypesEntry: true,
    }),
    copy({
      targets: [{ src: './tailwind.config.js', dest: 'dist' }],
      hook: 'writeBundle',
    }),
  ],
  test: {
    setupFiles: ['./tests/vitest.setup.ts'],
    environment: 'jsdom',
    deps: {
      optimizer: {
        web: {
          include: ['vitest-canvas-mock'],
        },
      },
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.tsx'),
      name: '@briks/ui',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      plugins: [
        copy({
          targets: [{ src: 'lib/assets/fonts/*', dest: 'dist/fonts' }],
          hook: 'writeBundle',
        }),
      ],
    },
    sourcemap: true,
    minify: 'terser',
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
