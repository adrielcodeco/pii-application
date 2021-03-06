/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface IServer {
  prepare (): void
  init (): void
  start (): void
  stop (): void
}
