/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface ApplicationOptions {
  projectName: string
  viewDir?: string
  viewEngine?: string
  cookie_secret?: string
  publicDirs?: string[]
  redis_prefix?: string
  session_name?: string
  session_secret?: string
  environment?: string
  port?: number
  useFakeRedis?: boolean
  [key: string]: any
}
