import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', 
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@your-namespace)/',
  ],  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',  
    },
  },
};

export default config;
