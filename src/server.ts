/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ServerOptions } from './interfaces/serverOptions'
import { Token } from '@pii/di'
import { IServer } from './interfaces/iServer'

export class Server<T, O extends ServerOptions> implements IServer {
  protected serverInstance?: T = undefined
  protected options: O

  constructor (options: O) {
    this.options = options
  }

  public async prepare (): Promise<void> {
    // does nothing
  }

  public async init (): Promise<void> {
    // does nothing
  }

  public async loadRoutes (): Promise<void> {
    // does nothing
  }

  public async start (): Promise<void> {
    // does nothing
  }

  public async stop (): Promise<void> {
    // does nothing
  }
}

export const ServerToken = Token(Server)
