/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ILogger } from './interfaces/iLogger'

export class FakeLogger implements ILogger {
  get stream (): any {
    return {
      write: (message: string, encoding: string) => {
        // does nothing
      }
    }
  }

  constructor () {
    // does nothing
  }

  public log (log: string, level: string = 'info'): void {
    // does nothing
  }

  public error (log: string): void {
    // does nothing
  }

  public warn (log: string): void {
    // does nothing
  }

  public info (log: string): void {
    // does nothing
  }

  public debug (log: string): void {
    // does nothing
  }

  public notice (log: string): void {
    // does nothing
  }

  public crit (log: string): void {
    // does nothing
  }

  public alert (log: string): void {
    // does nothing
  }

  public emerg (log: string): void {
    // does nothing
  }
}
