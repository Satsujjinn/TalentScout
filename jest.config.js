module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/backend'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  globals: { 'ts-jest': { tsconfig: 'backend/tsconfig.json' } },
};
