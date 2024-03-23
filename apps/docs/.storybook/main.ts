import type { StorybookConfig } from "@storybook/react-vite";

import { join, dirname } from "path";
import { mergeConfig } from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    // Customize Vite config here
    return mergeConfig(config, {
      // Example: Resolve aliases
      resolve: {
        alias: {
          "@briks/ui/style": "../node_modules/@briks/ui/dist/index.css",
          "@briks/ui": "../node_modules/@briks/ui",
        },
      },
      // Make sure to adjust or add configurations that match your setup
    });
  },
};
export default config;
