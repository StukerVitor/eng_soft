
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/jestEnv.ts'], 
  globalSetup: '<rootDir>/tests/globalSetup.ts',
  globalTeardown: '<rootDir>/tests/globalTeardown.ts',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.ts',
    '!src/prisma/**',
  ],
  coverageThreshold: {
    global: {
      lines: 78
    }
  },
};

export default config;
