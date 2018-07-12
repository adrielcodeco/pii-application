/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../src/exception')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Exception')
  expect(Object.keys(unit).length).toEqual(1)
})

test('new', () => {
  expect.assertions(6)
  const unit = requireTest()
  let exc
  expect(() => {
    exc = new unit.Exception({
      code: 'code',
      message: 'message',
      shortMessage: 'shortMessage',
      params: 'params',
      details: 'details'
    })
  }).not.toThrowError()
  expect(exc.code).toEqual('code')
  expect(exc.message).toEqual('message')
  expect(exc.shortMessage).toEqual('shortMessage')
  expect(exc.params).toEqual('params')
  expect(exc.details).toEqual('details')
})

test('new without arguments', () => {
  expect.assertions(6)
  const unit = requireTest()
  let exc
  expect(() => {
    exc = new unit.Exception()
  }).not.toThrowError()
  expect(exc.code).toEqual('')
  expect(exc.message).toEqual('')
  expect(exc.shortMessage).toEqual('')
  expect(exc.params).toEqual('')
  expect(exc.details).toEqual('')
})

test('new without process.env.NODE_ENV, without process.env.DEVELOPMENTMODE', () => {
  expect.assertions(1)
  const unit = requireTest()
  delete process.env.NODE_ENV
  delete process.env.DEVELOPMENTMODE
  let exc = new unit.Exception()
  expect(exc.toJSON()).toMatchObject({ stack: expect.any(String) })
  process.env.NODE_ENV = 'test'
})

test('new with process.env.NODE_ENV = "test", without process.env.DEVELOPMENTMODE', () => {
  expect.assertions(1)
  const unit = requireTest()
  process.env.NODE_ENV = 'test'
  delete process.env.DEVELOPMENTMODE
  let exc = new unit.Exception()
  expect(exc.toJSON()).toEqual({ })
  process.env.NODE_ENV = 'test'
})

test('new with process.env.NODE_ENV = "development", without process.env.DEVELOPMENTMODE', () => {
  expect.assertions(1)
  const unit = requireTest()
  process.env.NODE_ENV = 'development'
  delete process.env.DEVELOPMENTMODE
  let exc = new unit.Exception()
  expect(exc.toJSON()).toEqual({ stack: expect.any(String) })
  process.env.NODE_ENV = 'test'
})

test('new without process.env.NODE_ENV, with process.env.DEVELOPMENTMODE', () => {
  expect.assertions(1)
  const unit = requireTest()
  delete process.env.NODE_ENV
  process.env.DEVELOPMENTMODE = 'true'
  let exc = new unit.Exception()
  expect(exc.toJSON()).toEqual({ stack: expect.any(String) })
  process.env.NODE_ENV = 'test'
  delete process.env.DEVELOPMENTMODE
})

test('new with process.env.NODE_ENV = "test", with process.env.DEVELOPMENTMODE', () => {
  expect.assertions(1)
  const unit = requireTest()
  process.env.NODE_ENV = 'test'
  process.env.DEVELOPMENTMODE = 'true'
  let exc = new unit.Exception()
  expect(exc.toJSON()).toEqual({ stack: expect.any(String) })
  process.env.NODE_ENV = 'test'
  delete process.env.DEVELOPMENTMODE
})

test('new with process.env.NODE_ENV = "development", with process.env.DEVELOPMENTMODE', () => {
  expect.assertions(1)
  const unit = requireTest()
  process.env.NODE_ENV = 'development'
  process.env.DEVELOPMENTMODE = 'true'
  let exc = new unit.Exception()
  expect(exc.toJSON()).toEqual({ stack: expect.any(String) })
  process.env.NODE_ENV = 'test'
  delete process.env.DEVELOPMENTMODE
})

test('call toJSON', () => {
  expect.assertions(7)
  const unit = requireTest()
  const ex = {
    code: 'code',
    message: 'message',
    shortMessage: 'shortMessage',
    params: 'params',
    details: 'details'
  }
  for (let key in ex) {
    const opt = { [key]: ex[key] }
    let exc = new unit.Exception(opt)
    expect(exc.toJSON()).toEqual(opt)
  }
  let exc1 = new unit.Exception()
  expect(exc1.toJSON()).toEqual({})
  let exc2 = new unit.Exception(ex)
  expect(exc2.toJSON()).toEqual(ex)
})

test('call toString', () => {
  expect.assertions(1)
  const unit = requireTest()
  let exc = new unit.Exception({
    code: 'code',
    message: 'message',
    shortMessage: 'shortMessage',
    params: 'params',
    details: 'details'
  })
  expect(exc.toString()).toEqual(
    JSON.stringify({
      code: 'code',
      message: 'message',
      shortMessage: 'shortMessage',
      params: 'params',
      details: 'details'
    })
  )
})

test('call valueOf', () => {
  expect.assertions(1)
  const unit = requireTest()
  let exc = new unit.Exception({
    code: 'code',
    message: 'message',
    shortMessage: 'shortMessage',
    params: 'params',
    details: 'details'
  })
  expect(exc.valueOf()).toEqual(
    JSON.stringify({
      code: 'code',
      message: 'message',
      shortMessage: 'shortMessage',
      params: 'params',
      details: 'details'
    })
  )
})

test('call [Symbol.toPrimitive]', () => {
  expect.assertions(1)
  const unit = requireTest()
  let exc = new unit.Exception({
    code: 'code',
    message: 'message',
    shortMessage: 'shortMessage',
    params: 'params',
    details: 'details'
  })
  expect('' + exc).toEqual(
    JSON.stringify({
      code: 'code',
      message: 'message',
      shortMessage: 'shortMessage',
      params: 'params',
      details: 'details'
    })
  )
})
