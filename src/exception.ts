/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ExceptionOptions } from './interfaces/exceptionOptions'
import { Environment } from './environment'

export class Exception {
  public stack?: string

  private _code?: string
  private _message?: string
  private _shortMessage?: string
  private _params?: string
  private _details?: string
  private _developmentMode?: boolean

  get code (): string {
    return this._code || ''
  }
  get message (): string {
    return this._message || ''
  }
  get shortMessage (): string {
    return this._shortMessage || ''
  }
  get params (): string {
    return this._params || ''
  }
  get details (): string {
    return this._details || ''
  }

  constructor ({
    code,
    message,
    shortMessage,
    params,
    details
  }: ExceptionOptions = {}) {
    this._developmentMode =
      (!process.env.NODE_ENV && !process.env.DEVELOPMENTMODE) ||
      (process.env.NODE_ENV === Environment.development &&
        !process.env.DEVELOPMENTMODE) ||
      !!process.env.DEVELOPMENTMODE
    this._code = code
    this._message = message
    this._shortMessage = shortMessage
    this._params = params
    this._details = details

    Error.captureStackTrace(this, this.constructor)
    if (!this._developmentMode) delete this.stack
  }

  public toJSON (): object {
    const str: any = {}
    if (this._code) str.code = this._code
    if (this._message) str.message = this._message
    if (this._shortMessage) str.shortMessage = this._shortMessage
    if (this._params) str.params = this._params
    if (this._details) str.details = this._details
    if (this._developmentMode && this.stack) str.stack = this.stack
    return str
  }

  public toString (): string {
    return JSON.stringify(this.toJSON())
  }

  public valueOf (): string {
    return this.toString()
  }

  [Symbol.toPrimitive] (hint: string): string {
    return this.toString()
  }
}
