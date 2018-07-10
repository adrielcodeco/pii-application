/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/router').Router
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('new', () => {
  expect.assertions(1)
  const Router = requireTest()
  expect(() => {
    // tslint:disable-next-line: no-unused-expression
    new Router()
  }).not.toThrow()
})
