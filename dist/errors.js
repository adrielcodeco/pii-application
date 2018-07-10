'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const di_1 = require('@pii/di')
class Errors {
  static InvalidParam (param) {
    return {
      statusCode: 409,
      error: {
        shortMessage: 'InvalidParam',
        code: 'INTERNAL-0001',
        message: `The ${param} param is invalid`
      },
      stackTrace: undefined
    }
  }
  static ParamRequired (param) {
    return {
      statusCode: 409,
      error: {
        shortMessage: 'ParamRequired',
        code: 'INTERNAL-0002',
        message: `The ${param} param is required`
      },
      stackTrace: undefined
    }
  }
}
exports.Errors = Errors
exports.ErrorToken = di_1.Token(Errors)

//# sourceMappingURL=errors.js.map
