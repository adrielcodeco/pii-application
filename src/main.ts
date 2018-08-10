/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import useAlias from '@pii/moduleloader'
import { Application } from './application'
import { Locale } from './locale'

const defaultLocale = {
  name: 'en-us'
}

class MainModule {
  app?: Application = undefined
  propagateError?: (err: any) => void
  constructor (locale: Locale = defaultLocale) {
    console.log('   ____  ____  _ _')
    console.log('  / __ \\|  _ \\(_|_)')
    console.log(' / / _` | |_) | | |')
    console.log('| | (_| |  __/| | |')
    console.log(' \\ \\__,_|_|   |_|_|')
    console.log('  \\____/')
    console.log('@Pii -- Entry loader')
    locale = Object.assign({}, defaultLocale, locale)
    require('source-map-support').install()
    require('moment').locale(locale.name)
    require('numeral').locale(locale.name)
    useAlias(/#\/(.*)/, process.cwd())
  }
  useAlias (alias: string | RegExp, path: string): MainModule {
    try {
      console.log(`@Pii -- Using Alias '${alias}' to '${path}'`)
      useAlias(alias, path)
      return this
    } catch (err) {
      if (this.propagateError) {
        this.propagateError(err)
      } else {
        throw new Error(err)
      }
      return this
    }
  }
  makeApp (App: Application | { new (): Application }): MainModule {
    try {
      console.log(`@Pii -- making app`)
      if (App instanceof Application) {
        this.app = App
      } else {
        this.app = new App()
      }
      return this
    } catch (err) {
      if (this.propagateError) {
        this.propagateError(err)
      } else {
        throw new Error(err)
      }
      return this
    }
  }
  makeAppFrom (path: string) {
    try {
      console.log(`@Pii -- making app from '${path}'`)
      const appModule = require(path)
      if (Application.isPrototypeOf(appModule)) {
        this.makeApp(appModule)
      } else {
        let app
        for (let key in appModule) {
          const maybeApp = Reflect.get(appModule, key)
          if (Application.isPrototypeOf(maybeApp)) {
            app = maybeApp
            break
          }
        }
        if (app) {
          this.makeApp(app)
        } else {
          throw new Error(`Application not found in path '${path}'`)
        }
      }
      return this
    } catch (err) {
      if (this.propagateError) {
        this.propagateError(err)
      } else {
        throw new Error(err)
      }
      return this
    }
  }
  async start () {
    try {
      console.log(`@Pii -- Starting`)
      if (this.app instanceof Application) {
        await this.app.run()
      } else {
        throw Error('result of makeApp is not an Application')
      }
    } catch (err) {
      if (this.propagateError) {
        this.propagateError(err)
      } else {
        throw new Error(err)
      }
    }
  }
  then (fn: Function) {
    fn && fn()
    return this
  }
  catch (fn: (err: any) => void): MainModule {
    this.propagateError = fn
    return this
  }
}

export function main () {
  return new MainModule()
}
