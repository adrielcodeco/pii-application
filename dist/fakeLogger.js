"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FakeLogger {
    get stream() {
        return {
            write: (message, encoding) => {
            }
        };
    }
    constructor() {
    }
    log(log, level = 'info') {
    }
    error(log) {
    }
    warn(log) {
    }
    info(log) {
    }
    debug(log) {
    }
    notice(log) {
    }
    crit(log) {
    }
}
exports.FakeLogger = FakeLogger;

//# sourceMappingURL=fakeLogger.js.map
