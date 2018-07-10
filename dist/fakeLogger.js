'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
class FakeLogger {
  get stream () {
    return {
      write: (message, encoding) => {
        console.log(message.replace(/\n$/, ''))
      }
    }
  }
  constructor () {}
  log (log, level = 'info') {
    console.log(`${level}: ${log}`)
  }
  error (log) {
    this.log(log, 'error')
  }
  warn (log) {
    this.log(log, 'warn')
  }
  info (log) {
    this.log(log, 'info')
  }
  debug (log) {
    this.log(log, 'debug')
  }
  notice (log) {
    this.log(log, 'notice')
  }
  crit (log) {
    this.log(log, 'crit')
  }
}
exports.FakeLogger = FakeLogger

//# sourceMappingURL=fakeLogger.js.map
