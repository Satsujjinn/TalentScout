const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });
module.exports = createJestConfig({
  testEnvironment: 'jsdom',
  collectCoverage: true,
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/../shared'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^shared/(.*)$': '<rootDir>/../shared/$1'
  }
});
