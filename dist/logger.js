"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = require("@pii/di");
var logFactory_1 = require("./logFactory");
exports.LoggerToken = 'log';
var Logger = (function () {
    function Logger() {
        var factory = di_1.Container.get(logFactory_1.LogFactoryToken);
        if (!factory) {
            throw new Error('logger factory not found');
        }
        this.logger = factory.getLog();
    }
    Object.defineProperty(Logger.prototype, "stream", {
        get: function () {
            return this.logger.stream;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.log = function (log, level) {
        if (level === void 0) { level = 'info'; }
        this.logger.log(log, level);
    };
    Logger.prototype.error = function (log) {
        this.logger.error(log);
    };
    Logger.prototype.warn = function (log) {
        this.logger.warning(log);
    };
    Logger.prototype.info = function (log) {
        this.logger.info(log);
    };
    Logger.prototype.debug = function (log) {
        this.logger.debug(log);
    };
    Logger.prototype.notice = function (log) {
        this.logger.notice(log);
    };
    Logger.prototype.crit = function (log) {
        this.logger.crit(log);
    };
    Logger.prototype.alert = function (log) {
        this.logger.alert(log);
    };
    Logger.prototype.emerg = function (log) {
        this.logger.emerg(log);
    };
    Logger = __decorate([
        di_1.SingletonService(exports.LoggerToken),
        __metadata("design:paramtypes", [])
    ], Logger);
    return Logger;
}());
exports.Logger = Logger;

//# sourceMappingURL=logger.js.map
