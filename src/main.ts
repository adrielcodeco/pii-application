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

export interface MainModuleOptions {
  locale?: Locale
  hideLogo?: boolean
}

export class MainModule {
  private failed: boolean = false
  app?: Application = undefined
  propagateError?: any
  constructor (options?: MainModuleOptions) {
    if (!options) {
      options = { }
    }
    if (options.hideLogo !== true) {
      console.log('   ____  ____  _ _')
      console.log('  / __ \\|  _ \\(_|_)')
      console.log(' / / _` | |_) | | |')
      console.log('| | (_| |  __/| | |')
      console.log(' \\ \\__,_|_|   |_|_|')
      console.log('  \\____/')
    }
    console.log('@Pii -- Entry loader')
    options.locale = Object.assign({}, defaultLocale, options.locale)
    require('source-map-support').install()
    require('moment').locale(options.locale.name)
    require('numeral').locale(options.locale.name)
    useAlias(/#\/(.*)/, process.cwd())
  }
  useAlias (alias: string | RegExp, path: string): MainModule {
    if (this.failed) return this
    try {
      console.log(`@Pii -- Using Alias '${alias}' to '${path}'`)
      useAlias(alias, path)
      return this
    } catch (err) {
      this.failed = true
      this.propagateError = err
      return this
    }
  }
  makeApp (App: Application | { new (): Application }): MainModule {
    if (this.failed) return this
    try {
      console.log(`@Pii -- making app`)
      if (App instanceof Application) {
        this.app = App
      } else {
        this.app = new App()
      }
      return this
    } catch (err) {
      this.failed = true
      this.propagateError = err
      return this
    }
  }
  makeAppFrom (path: string) {
    if (this.failed) return this
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
      this.failed = true
      this.propagateError = err
      return this
    }
  }
  // @ts-ignore
  async start (): Promise<MainModule> {
    if (this.failed) {
      throw this.propagateError
    }
    console.log(`@Pii -- Starting`)
    if (this.app instanceof Application) {
      await this.app.run()
    } else {
      throw Error('result of makeApp is not an Application')
    }
    return this
  }
  async stop (killProcess?: boolean) {
    console.log(`@Pii -- Stoping`)
    if (this.app instanceof Application) {
      await this.app.kill(process.pid, killProcess)
    } else {
      throw Error('result of makeApp is not an Application')
    }
  }
  step (fn: Function): MainModule {
    if (this.failed) {
      return this
    }
    (fn && fn())
    return this
  }
}

export function main (options?: MainModuleOptions): MainModule {
  return new MainModule(options)
}
