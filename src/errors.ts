/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Token } from '@pii/di'
import { IServerError } from './interfaces/iServerError'

export class Errors {
  public static InvalidParam (param: string): IServerError {
    return {
      statusCode: 409,
      error: {
        shortMessage: 'InvalidParam',
        code: 'INTERNAL-0001',
        message: `The ${param} param is invalid`
      },
      stackTrace: undefined
    }
  }

  public static ParamRequired (param: string): IServerError {
    return {
      statusCode: 409,
      error: {
        shortMessage: 'ParamRequired',
        code: 'INTERNAL-0002',
        message: `The ${param} param is required`
      },
      stackTrace: undefined
    }
  }
}

export const ErrorToken = Token(Errors)
