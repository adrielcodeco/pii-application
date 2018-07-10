/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/server').Server
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('new', () => {
  expect.assertions(1)
  const Server = requireTest()
  expect(() => {
    // tslint:disable-next-line: no-unused-expression
    new Server()
  }).not.toThrow()
})

test('call prepare', () => {
  expect.assertions(1)
  const Server = requireTest()
  expect(() => {
    const server = new Server()
    server.prepare()
  }).not.toThrow()
})

test('call init', () => {
  expect.assertions(1)
  const Server = requireTest()
  expect(() => {
    const server = new Server()
    server.init()
  }).not.toThrow()
})

test('call loadRoutes', () => {
  expect.assertions(1)
  const Server = requireTest()
  expect(() => {
    const server = new Server()
    server.loadRoutes()
  }).not.toThrow()
})

test('call start', () => {
  expect.assertions(1)
  const Server = requireTest()
  expect(() => {
    const server = new Server()
    server.start()
  }).not.toThrow()
})

test('call stop', () => {
  expect.assertions(1)
  const Server = requireTest()
  expect(() => {
    const server = new Server()
    server.stop()
  }).not.toThrow()
})
