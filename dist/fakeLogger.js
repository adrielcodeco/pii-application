"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakeLogger = (function () {
    function FakeLogger() {
    }
    Object.defineProperty(FakeLogger.prototype, "stream", {
        get: function () {
            return {
                write: function (message, encoding) {
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    FakeLogger.prototype.log = function (log, level) {
        if (level === void 0) { level = 'info'; }
    };
    FakeLogger.prototype.error = function (log) {
    };
    FakeLogger.prototype.warn = function (log) {
    };
    FakeLogger.prototype.info = function (log) {
    };
    FakeLogger.prototype.debug = function (log) {
    };
    FakeLogger.prototype.notice = function (log) {
    };
    FakeLogger.prototype.crit = function (log) {
    };
    FakeLogger.prototype.alert = function (log) {
    };
    FakeLogger.prototype.emerg = function (log) {
    };
    return FakeLogger;
}());
exports.FakeLogger = FakeLogger;

//# sourceMappingURL=fakeLogger.js.map
