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
const winston_1 = require("winston");
const winston = require('winston');
exports.LogTransportToken = Symbol.for('LogTransport');
exports.LogFactoryToken = Symbol.for('LogFactory');
let LogFactory = class LogFactory {
    constructor() {
        this.exitOnError = false;
        this.level = 'info';
    }
    setLevels(levels) {
        this.levels = levels;
    }
    setColors(colors) {
        this.colors = colors;
        winston.addColors(colors);
    }
    getLog() {
        this.setLevels({
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            debug: 4,
            trace: 5
        });
        this.setColors({
            fatal: 'red',
            error: 'red',
            warning: 'yellow',
            info: 'green',
            debug: 'blue',
            trace: 'gray'
        });
        const logger = winston_1.createLogger({
            level: this.level,
            levels: this.levels,
            transports: this.transports,
            exitOnError: this.exitOnError
        });
        logger.stream = {
            write: (message, encoding) => {
                logger.info(message.replace(/\n$/, ''));
            }
        };
        return logger;
    }
};
__decorate([
    di_1.InjectMany(exports.LogTransportToken),
    __metadata("design:type", Array)
], LogFactory.prototype, "transports", void 0);
LogFactory = __decorate([
    di_1.SingletonService(exports.LogFactoryToken)
], LogFactory);
exports.LogFactory = LogFactory;

//# sourceMappingURL=logFactory.js.map
