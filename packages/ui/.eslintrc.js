/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@briks/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    jest: true,
  },
  rules: {
    "no-redeclare": "off",
  },
};
