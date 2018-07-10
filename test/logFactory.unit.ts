/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/logFactory')
}

beforeAll(() => {
  jest.mock('winston', () => {
    const winstonInfoMock = jest.fn()
    return {
      winstonInfoMock,
      setLevels: () => ({}),
      addColors: () => ({}),
      emitErrs: false,
      TransportInstance: class TransportInstance {},
      LoggerInstance: class LoggerInstance {},
      Logger: class {
        stream = {
          write: (message: string, encoding: string) => {
            // does nothing
          }
        }
        log (log, lvl) {
          this.stream.write(log, 'utf8')
        }
        info (log) {
          winstonInfoMock(log)
        }
      }
    }
  })
})

afterAll(() => {
  jest.clearAllMocks()
})

test('require', () => {
  expect.assertions(4)
  const unit = requireTest()
  expect(unit).toHaveProperty('LogTransportToken')
  expect(unit).toHaveProperty('LogFactoryToken')
  expect(unit).toHaveProperty('LogFactory')
  expect(Object.keys(unit).length).toEqual(3)
})

test('new instance', () => {
  expect.assertions(1)
  const unit = requireTest()
  expect(() => {
    // tslint:disable-next-line: no-unused-expression
    new unit.LogFactory()
  }).not.toThrow()
})

test('call setLevels', () => {
  expect.assertions(2)
  const unit = requireTest()
  const factor = new unit.LogFactory()
  const levels = {
    warn: 0,
    info: 1
  }
  expect(() => {
    factor.setLevels(levels)
  }).not.toThrow()
  expect(factor.levels).toStrictEqual(levels)
})

test('call setColors', () => {
  expect.assertions(2)
  const unit = requireTest()
  const factor = new unit.LogFactory()
  const colors = {
    warn: 'red',
    info: 'green'
  }
  expect(() => {
    factor.setColors(colors)
  }).not.toThrow()
  expect(factor.colors).toStrictEqual(colors)
})

test('call getLog', () => {
  expect.assertions(3)
  const unit = requireTest()
  const { Logger, winstonInfoMock } = require('winston')
  const factor = new unit.LogFactory()
  let logger
  expect(() => {
    logger = factor.getLog()
  }).not.toThrow()
  expect(logger).toBeInstanceOf(Logger)
  logger.log('test log', 'info')
  expect(winstonInfoMock).toBeCalled()
})
