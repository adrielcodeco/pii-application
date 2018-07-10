const path = require('path')

module.exports = {
  runner: 'jest-runner-tsc',
  displayName: 'tsc',
  moduleFileExtensions: ['ts'],
  testMatch: ['<rootDir>/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/dist/*'],
  rootDir: path.resolve(__dirname, '../')
}
