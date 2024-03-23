import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: ['src/hooks/index.tsx'],
  format: ['cjs', 'esm'],
  treeshake: true,
  splitting: true,
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['react'],
  ...options,
}));
