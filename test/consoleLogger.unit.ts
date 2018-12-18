/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/consoleLogger')
}

const oldConsoleLog = console.log
const oldConsoleError = console.error
const oldConsoleWarn = console.warn
const oldConsoleInfo = console.info

beforeEach(() => {
  console.log = jest.fn()
  console.error = jest.fn()
  console.warn = jest.fn()
  console.info = jest.fn()
})

afterEach(() => {
  console.log = oldConsoleLog
  console.error = oldConsoleError
  console.warn = oldConsoleWarn
  console.info = oldConsoleInfo
})

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('ConsoleLogger')
  expect(Object.keys(unit).length).toEqual(1)
})

test('new instance', () => {
  expect.assertions(4)
  const unit = requireTest()
  let logger: any = {}
  expect(() => {
    logger = new unit.ConsoleLogger()
  }).not.toThrow()
  expect(logger.logger).toBeUndefined()
  expect(typeof (logger.stream || {}).write).toBe('function')
  logger.stream.write('', '')
  expect(console.log).toBeCalled()
})

test('call log', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.ConsoleLogger()
  logger.log('log')
  expect(console.info).toBeCalled()
})

test('call error', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.ConsoleLogger()
  logger.error('error')
  expect(console.error).toBeCalled()
})

test('call warn', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.ConsoleLogger()
  logger.warn('warn')
  expect(console.warn).toBeCalled()
})

test('call info', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.ConsoleLogger()
  logger.info('info')
  expect(console.info).toBeCalled()
})

test('call debug', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.ConsoleLogger()
  logger.debug('debug')
  expect(console.log).toBeCalled()
})

test('call notice', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.ConsoleLogger()
  logger.notice('notice')
  expect(console.log).toBeCalled()
})

test('call crit', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.ConsoleLogger()
  logger.crit('crit')
  expect(console.log).toBeCalled()
})
