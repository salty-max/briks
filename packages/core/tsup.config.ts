import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react"],
  ...options,
}));
