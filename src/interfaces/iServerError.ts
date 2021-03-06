/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IError } from './iError'

export interface IServerError {
  statusCode?: number
  error?: IError
  stackTrace: any
}
