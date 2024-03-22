/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@j3lly/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "no-redeclare": "off",
    "no-undef": "off",
  },
};
