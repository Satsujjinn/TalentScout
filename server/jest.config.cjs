module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^(.*)\\.(css|less)$': 'identity-obj-proxy'
  },
  collectCoverage: true
};
