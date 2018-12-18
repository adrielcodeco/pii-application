/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

import { ILogFactory } from '../src/interfaces/iLogFactory'

const requireTest = () => {
  jest.resetModules()
  return require('../src/logger')
}

test('require', () => {
  expect.assertions(3)
  const unit = requireTest()
  expect(unit).toHaveProperty('LoggerToken')
  expect(unit).toHaveProperty('Logger')
  expect(Object.keys(unit).length).toEqual(2)
})

test('new instance', () => {
  expect.assertions(3)
  const unit = requireTest()
  let logger: any = {}
  expect(() => {
    logger = new unit.Logger()
  }).not.toThrow()
  expect(logger.logger).not.toBeUndefined()
  expect(typeof (logger.stream || {}).write).toBe('function')
})

test('new instance without LogFactory', () => {
  expect.assertions(1)
  const unit = requireTest()
  const LogFactoryToken = require('../src/logFactory').LogFactoryToken
  const { Container } = require('@pii/di')
  Container.removeSingleton(LogFactoryToken)
  expect(() => {
    // tslint:disable-next-line: no-unused-expression
    new unit.Logger()
  }).toThrowError(/logger factory not found/)
})

test('call log without level', async () => {
  expect.assertions(2)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  const { Container } = require('@pii/di')
  interface ILogger {
    log (log: any, lvl: any): void
  }
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        log: (log: any, lvl: any) => {
          expect(log).toEqual('log')
          expect(lvl).toEqual('info')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.log('log')
})

test('call log', () => {
  expect.assertions(2)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  const { Container } = require('@pii/di')
  interface ILogger {
    log (log: any, lvl: any): void
  }
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        log: (log: any, lvl: any) => {
          expect(log).toEqual('log')
          expect(lvl).toEqual('1')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.log('log', '1')
})

test('call error', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  const { Container } = require('@pii/di')
  interface ILogger {
    error (log: any): void
  }
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        error: (log: any) => {
          expect(log).toEqual('error')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.error('error')
})

test('call warn', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  const { Container } = require('@pii/di')
  interface ILogger {
    warning (log: any): void
  }
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        warning: (log: any) => {
          expect(log).toEqual('warn')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.warn('warn')
})

test('call info', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  const { Container } = require('@pii/di')
  interface ILogger {
    info (log: any): void
  }
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        info: (log: any) => {
          expect(log).toEqual('info')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.info('info')
})

test('call debug', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  interface ILogger {
    debug (log: any): void
  }
  const { Container } = require('@pii/di')
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        debug: (log: any) => {
          expect(log).toEqual('debug')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.debug('debug')
})

test('call notice', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  interface ILogger {
    notice (log: any): void
  }
  const { Container } = require('@pii/di')
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        notice: (log: any) => {
          expect(log).toEqual('notice')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.notice('notice')
})

test('call crit', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { LogFactoryToken } = require('../src/logFactory')
  interface ILogger {
    crit (log: any): void
  }
  const { Container } = require('@pii/di')
  class LogFactory implements ILogFactory<ILogger> {
    public getLog () {
      return {
        crit: (log: any) => {
          expect(log).toEqual('crit')
        }
      }
    }
  }
  const logDactory = new LogFactory()
  Container.addSingleton(LogFactoryToken, logDactory)
  const logger = new unit.Logger()
  logger.crit('crit')
})
