/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../src')
}

test('require', () => {
  expect.assertions(18)
  const unit = requireTest()
  expect(unit).toHaveProperty('Application')
  expect(unit).toHaveProperty('Environment')
  expect(unit).toHaveProperty('Errors')
  expect(unit).toHaveProperty('ErrorToken')
  expect(unit).toHaveProperty('Exception')
  expect(unit).toHaveProperty('FakeLogger')
  expect(unit).toHaveProperty('Locale')
  expect(unit).toHaveProperty('LogFactory')
  expect(unit).toHaveProperty('LogFactoryToken')
  expect(unit).toHaveProperty('LogTransportToken')
  expect(unit).toHaveProperty('Logger')
  expect(unit).toHaveProperty('LoggerToken')
  expect(unit).toHaveProperty('main')
  expect(unit).toHaveProperty('Router')
  expect(unit).toHaveProperty('RouterToken')
  expect(unit).toHaveProperty('Server')
  expect(unit).toHaveProperty('ServerToken')
  expect(Object.keys(unit).length).toEqual(17)
})
