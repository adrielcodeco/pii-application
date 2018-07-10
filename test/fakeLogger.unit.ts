/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/fakeLogger')
}

const oldConsole = console.log

beforeEach(() => {
  console.log = jest.fn()
})

afterEach(() => {
  console.log = oldConsole
})

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('FakeLogger')
  expect(Object.keys(unit).length).toEqual(1)
})

test('new instance', () => {
  expect.assertions(4)
  const unit = requireTest()
  let logger
  expect(() => {
    logger = new unit.FakeLogger()
  }).not.toThrow()
  expect(logger.logger).toBeUndefined()
  expect(typeof (logger.stream || {}).write).toBe('function')
  logger.stream.write('', '')
  expect(console.log).toBeCalled()
})

test('call log', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.FakeLogger()
  logger.log('log')
  expect(console.log).toBeCalled()
})

test('call error', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.FakeLogger()
  logger.error('error')
  expect(console.log).toBeCalled()
})

test('call warn', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.FakeLogger()
  logger.warn('warn')
  expect(console.log).toBeCalled()
})

test('call info', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.FakeLogger()
  logger.info('info')
  expect(console.log).toBeCalled()
})

test('call debug', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.FakeLogger()
  logger.debug('debug')
  expect(console.log).toBeCalled()
})

test('call notice', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.FakeLogger()
  logger.notice('notice')
  expect(console.log).toBeCalled()
})

test('call crit', () => {
  expect.assertions(1)
  const unit = requireTest()
  const logger = new unit.FakeLogger()
  logger.crit('crit')
  expect(console.log).toBeCalled()
})
