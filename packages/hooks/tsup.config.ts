import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/hooks/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react"],
  ...options,
}));
