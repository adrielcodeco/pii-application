/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/application')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Application')
  expect(Object.keys(unit).length).toEqual(1)
})

test('new without arguments', () => {
  expect.assertions(3)
  const unit = requireTest()
  let app
  expect(() => {
    app = new unit.Application()
  }).not.toThrow()
  expect(app.options).toEqual({ projectName: 'pii-application' })
  expect(app.log).toBeDefined()
})

test('call run without servers', () => {
  expect.assertions(1)
  const unit = requireTest()
  let app = new unit.Application()
  expect(() => {
    app.run()
  }).not.toThrow()
})

test('call run with servers', () => {
  expect.assertions(2)
  const unit = requireTest()
  const { ServerToken } = require('../src/server')
  // tslint:disable-next-line: no-unused-variable
  const { IServer } = require('../src/interfaces/iServer')
  const { Container } = require('@pii/di')
  const startFn = jest.fn()
  class Server implements IServer {
    public async start () {
      startFn()
    }
  }
  Container.add(ServerToken, new Server())
  let app = new unit.Application()
  expect(() => {
    app.run()
  }).not.toThrow()
  expect(startFn).toBeCalled()
})

test('call kill without arguments', () => {
  expect.assertions(2)
  const unit = requireTest()
  let app = new unit.Application()
  const old = process.kill
  process.kill = jest.fn()
  expect(() => {
    app.kill()
  }).not.toThrow()
  expect(process.kill).toBeCalledWith(undefined, undefined)
  process.kill = old
})

test('call kill without server', () => {
  expect.assertions(2)
  const unit = requireTest()
  let app = new unit.Application()
  const old = process.kill
  process.kill = jest.fn()
  expect(() => {
    app.kill(10, 11)
  }).not.toThrow()
  expect(process.kill).toBeCalledWith(10, 11)
  process.kill = old
})

test('call kill with server', () => {
  expect.assertions(2)
  const unit = requireTest()
  const { ServerToken } = require('../src/server')
  // tslint:disable-next-line: no-unused-variable
  const { IServer } = require('../src/interfaces/iServer')
  const { Container } = require('@pii/di')
  const startFn = jest.fn()
  class Server implements IServer {
    public stop () {
      startFn()
    }
  }
  Container.add(ServerToken, new Server())
  let app = new unit.Application()
  const old = process.kill
  process.kill = jest.fn()
  expect(() => {
    app.kill(10, 11)
  }).not.toThrow()
  expect(process.kill).toBeCalledWith(10, 11)
  process.kill = old
})
