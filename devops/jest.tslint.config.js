const path = require('path')

module.exports = {
  runner: 'jest-runner-tslint',
  displayName: 'tslint',
  moduleFileExtensions: ['ts'],
  testMatch: ['<rootDir>/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/dist/*'],
  rootDir: path.resolve(__dirname, '../')
}
