/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import { Container } from '@pii/di'
import { Errors, ErrorToken } from './errors'
import { ILogger } from './interfaces/iLogger'
import { IServer } from './interfaces/iServer'
import { LoggerToken } from './logger'
import { ServerToken } from './server'
import { LogTransportToken } from './logFactory'
import { ApplicationOptions } from './interfaces/applicationOptions'
import { ConsoleLogger } from './consoleLogger'
const winston = require('winston')

export class Application {
  protected log: ILogger
  protected options: ApplicationOptions

  constructor (
    options: ApplicationOptions = { projectName: 'pii-application' }
  ) {
    this.options = options
    this.loadLogger()
    this.loadErrors()
    this.loadConfigs()
    if (!Container.has(LoggerToken)) {
      Container.addSingleton(LoggerToken, new ConsoleLogger())
    }
    this.log = Container.get(LoggerToken) as ILogger
  }

  public async run (): Promise<void> {
    this.loadServers()
    const servers = Container.getServices<IServer>(ServerToken)
    for (let i = 0; i < servers.length; i++) {
      const server = servers[i]
      await server.start()
    }
  }

  public kill (pid: number, signal?: string | number): void {
    const servers = Container.getServices<IServer>(ServerToken)
    for (let i = 0; i < servers.length; i++) {
      const server = servers[i]
      server.stop()
    }
    process.kill(pid, signal)
  }

  public loadLogger (): void {
    const consoleTransport = new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
    Container.addSingleton(LogTransportToken, consoleTransport)
  }

  public loadErrors (): void {
    Container.addSingleton(ErrorToken, new Errors())
  }

  public loadConfigs (): void {
    // does nothing
  }

  public loadServers (): void {
    // does nothing
  }
}
