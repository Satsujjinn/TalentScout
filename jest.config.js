module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/server'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  globals: { 'ts-jest': { tsconfig: 'server/tsconfig.json' } },
};
