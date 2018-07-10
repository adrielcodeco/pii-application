/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface ILogger {
  stream: any
  log (log: string, level?: string): void
  error (log: string): void
  warn (log: string): void
  info (log: string): void
  debug (log: string): void
  notice (log: string): void
  crit (log: string): void
}
