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

export async function main (
  makeApp: (useAlias: Function) => Application,
  locale: Locale = defaultLocale
): Promise<void> {
  locale = Object.assign({}, defaultLocale, locale)
  require('source-map-support').install()
  require('moment').locale(locale.name)
  require('numeral').locale(locale.name)
  useAlias('#', process.cwd())
  if (!makeApp) {
    throw Error('makeApp is not a function')
  }
  const app = makeApp(useAlias)
  if (app instanceof Application) {
    await app.run()
  } else {
    throw Error('result of makeApp is not an Application')
  }
}
