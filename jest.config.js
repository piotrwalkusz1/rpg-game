/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
