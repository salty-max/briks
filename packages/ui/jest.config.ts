import { Config } from 'jest';
import jestConfigJsDom from '@briks/jest-config';

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config: Config = {
  ...jestConfigJsDom,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{tsx,ts,mdx}', '!src/**/index.*'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

export default config;
