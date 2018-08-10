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
const di_1 = require("@pii/di");
const logFactory_1 = require("./logFactory");
exports.LoggerToken = 'log';
let Logger = class Logger {
    constructor() {
        const factory = di_1.Container.get(logFactory_1.LogFactoryToken);
        if (!factory) {
            throw new Error('logger factory not found');
        }
        this.logger = factory.getLog();
    }
    get stream() {
        return this.logger.stream;
    }
    log(log, level = 'info') {
        this.logger.log(log, level);
    }
    error(log) {
        this.logger.error(log);
    }
    warn(log) {
        this.logger.warn(log);
    }
    info(log) {
        this.logger.info(log);
    }
    debug(log) {
        this.logger.debug(log);
    }
    notice(log) {
        this.logger.notice(log);
    }
    crit(log) {
        this.logger.crit(log);
    }
};
Logger = __decorate([
    di_1.SingletonService(exports.LoggerToken),
    __metadata("design:paramtypes", [])
], Logger);
exports.Logger = Logger;

//# sourceMappingURL=logger.js.map
