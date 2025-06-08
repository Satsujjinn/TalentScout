module.exports = {
  preset: 'ts-jest',
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json', diagnostics: false } },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^(.*)\\.(css|less)$': 'identity-obj-proxy'
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
