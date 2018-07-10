'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled (value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected (value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step (result) {
        result.done
          ? resolve(result.value)
          : new P(function (resolve) {
            resolve(result.value)
          }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
const moduleloader_1 = require('@pii/moduleloader')
const application_1 = require('./application')
const defaultLocale = {
  name: 'en-us'
}
function main (makeApp, locale = defaultLocale) {
  return __awaiter(this, void 0, void 0, function * () {
    locale = Object.assign({}, defaultLocale, locale)
    require('source-map-support').install()
    require('moment').locale(locale.name)
    require('numeral').locale(locale.name)
    moduleloader_1.default('#', process.cwd())
    if (!makeApp) {
      throw Error('makeApp is not a function')
    }
    const app = makeApp(moduleloader_1.default)
    if (app instanceof application_1.Application) {
      yield app.run()
    } else {
      throw Error('result of makeApp is not an Application')
    }
  })
}
exports.main = main

//# sourceMappingURL=main.js.map
