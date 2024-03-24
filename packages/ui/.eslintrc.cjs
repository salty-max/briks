/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['briks'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
