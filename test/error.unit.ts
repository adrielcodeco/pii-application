/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const template = {
  statusCode: expect.any(Number),
  error: {
    shortMessage: expect.any(String),
    code: expect.any(String),
    message: expect.any(String)
  },
  stackTrace: undefined
}

const requireTest = () => {
  return require('../src/errors')
}

test('require', () => {
  expect.assertions(3)
  const unit = requireTest()
  expect(unit).toHaveProperty('Errors')
  expect(unit).toHaveProperty('ErrorToken')
  expect(Object.keys(unit).length).toEqual(2)
})

test('call InvalidParam without arguments', () => {
  expect.assertions(1)
  const unit = requireTest()
  expect(unit.Errors.InvalidParam()).toMatchObject(template)
})

test('call InvalidParam', () => {
  expect.assertions(1)
  const unit = requireTest()
  const old = template.error.message
  template.error.message = expect.stringMatching(/The TEST param is invalid/)
  expect(unit.Errors.InvalidParam('TEST')).toMatchObject(template)
  template.error.message = old
})

test('call ParamRequired without arguments', () => {
  expect.assertions(1)
  const unit = requireTest()
  expect(unit.Errors.ParamRequired()).toMatchObject(template)
})

test('call ParamRequired', () => {
  expect.assertions(1)
  const unit = requireTest()
  const old = template.error.message
  template.error.message = expect.stringMatching(/The TEST param is required/)
  expect(unit.Errors.ParamRequired('TEST')).toMatchObject(template)
  template.error.message = old
})
