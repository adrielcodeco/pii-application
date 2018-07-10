/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SingletonService, InjectMany } from '@pii/di'
import {
  TransportInstance,
  LoggerInstance,
  Logger as winstonLogger
} from 'winston'
import { ILogFactory } from './interfaces/iLogFactory'
const winston = require('winston')

export const LogTransportToken = Symbol.for('LogTransport')
export const LogFactoryToken = Symbol.for('LogFactory')

@SingletonService(LogFactoryToken)
export class LogFactory implements ILogFactory<LoggerInstance> {
  // @ts-ignore
  @InjectMany(LogTransportToken) public transports: TransportInstance[]
  public emitErrs: boolean = true
  public exitOnError: boolean = false

  protected levels: any
  protected colors: any

  public setLevels (levels: Object) {
    this.levels = levels
    winston.setLevels(levels)
  }

  public setColors (colors: Object) {
    this.colors = colors
    winston.addColors(colors)
  }

  public getLog (): LoggerInstance {
    winston.emitErrs = this.emitErrs
    this.setLevels({
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      debug: 4,
      trace: 5
    })
    this.setColors({
      fatal: 'red',
      error: 'red',
      warning: 'yellow',
      info: 'green',
      debug: 'blue',
      trace: 'gray'
    })
    const logger: any = new winstonLogger({
      levels: this.levels,
      colors: this.colors,
      transports: this.transports,
      exitOnError: this.exitOnError
    })
    logger.stream = {
      write: (message: string, encoding: string) => {
        logger.info(message.replace(/\n$/, ''))
      }
    }
    return logger
  }
}
