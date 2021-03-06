/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ILogger } from './interfaces/iLogger'

export class ConsoleLogger implements ILogger {
  get stream (): any {
    return {
      write: (message: string, encoding: string) => {
        console.log(message.replace(/\n$/, ''))
      }
    }
  }

  constructor () {
    // does nothing
  }

  public log (log: string, level: string = 'info'): void {
    console.log(`${level}: ${log}`)
  }

  public error (log: string): void {
    this.log(log, 'error')
  }

  public warn (log: string): void {
    this.log(log, 'warn')
  }

  public info (log: string): void {
    this.log(log, 'info')
  }

  public debug (log: string): void {
    this.log(log, 'debug')
  }

  public notice (log: string): void {
    this.log(log, 'notice')
  }

  public crit (log: string): void {
    this.log(log, 'crit')
  }
}
