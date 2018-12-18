"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    Object.defineProperty(ConsoleLogger.prototype, "stream", {
        get: function () {
            return {
                write: function (message, encoding) {
                    console.log(message.replace(/\n$/, ''));
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    ConsoleLogger.prototype.log = function (log, level) {
        if (level === void 0) { level = 'info'; }
        switch (level) {
            case 'error':
                console.error(level + ": " + log);
                break;
            case 'warn':
                console.warn(level + ": " + log);
                break;
            case 'info':
                console.info(level + ": " + log);
                break;
            default:
                console.log(level + ": " + log);
                break;
        }
    };
    ConsoleLogger.prototype.error = function (log) {
        this.log(log, 'error');
    };
    ConsoleLogger.prototype.warn = function (log) {
        this.log(log, 'warn');
    };
    ConsoleLogger.prototype.info = function (log) {
        this.log(log, 'info');
    };
    ConsoleLogger.prototype.debug = function (log) {
        this.log(log, 'debug');
    };
    ConsoleLogger.prototype.notice = function (log) {
        this.log(log, 'notice');
    };
    ConsoleLogger.prototype.crit = function (log) {
        this.log(log, 'crit');
    };
    ConsoleLogger.prototype.alert = function (log) {
        this.log(log, 'crit');
    };
    ConsoleLogger.prototype.emerg = function (log) {
        this.log(log, 'crit');
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;

//# sourceMappingURL=consoleLogger.js.map
