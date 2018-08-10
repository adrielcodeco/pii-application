/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Container, SingletonService } from '@pii/di'
import { Logger as LoggerInstance } from 'winston'
import { LogFactoryToken } from './logFactory'
import { ILogFactory } from './interfaces/iLogFactory'
import { ILogger } from './interfaces/iLogger'

export const LoggerToken = 'log'

@SingletonService(LoggerToken)
export class Logger implements ILogger {
  get stream (): any {
    return this.logger.stream
  }

  protected logger: LoggerInstance

  constructor () {
    const factory = Container.get<ILogFactory<LoggerInstance>>(LogFactoryToken)
    if (!factory) {
      throw new Error('logger factory not found')
    }
    this.logger = factory.getLog()
  }

  public log (log: string, level: string = 'info'): void {
    this.logger.log(log, level)
  }

  public error (log: string): void {
    this.logger.error(log)
  }

  public warn (log: string): void {
    this.logger.warn(log)
  }

  public info (log: string): void {
    this.logger.info(log)
  }

  public debug (log: string): void {
    this.logger.debug(log)
  }

  public notice (log: string): void {
    this.logger.notice(log)
  }

  public crit (log: string): void {
    this.logger.crit(log)
  }
}
