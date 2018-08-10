/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../src/main')
}

beforeAll(() => {
  Reflect.set(console, '_log' , console.log)
  console.log = () => undefined
})

afterAll(() => {
  Reflect.set(console, 'log', console['_log'])
})

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('main')
  expect(Object.keys(unit).length).toEqual(1)
})

test('call main without arguments', () => {
  expect.assertions(1)
  const unit = requireTest()
  expect(() => { unit.main() }).not.toThrow()
})

test.skip('call main with invalid app', () => {
  expect.assertions(1)
  const unit = requireTest()
  // tslint:disable-next-line: no-floating-promises
  expect(unit.main(() => ({}))).rejects.toThrowError(
    /result of makeApp is not an Application/
  )
})

test.skip('call main with app', () => {
  expect.assertions(1)
  const unit = requireTest()
  const Application = require('../src/application').Application
  const app = new Application()
  // tslint:disable-next-line: no-floating-promises
  return expect(unit.main(() => app)).resolves.toBe()
})
