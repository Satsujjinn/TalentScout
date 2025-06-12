const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });
module.exports = createJestConfig({
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageThreshold: { global: { branches: 50, functions: 50, lines: 50, statements: 50 } }
});
