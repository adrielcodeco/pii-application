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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = require("@pii/di");
var winston_1 = require("winston");
var winston = require('winston');
var format = require('logform').format;
exports.LogTransportToken = Symbol.for('LogTransport');
exports.LogFormatToken = Symbol.for('LogFormat');
exports.LogFactoryToken = Symbol.for('LogFactory');
var LogFactory = (function () {
    function LogFactory() {
        this.exitOnError = false;
        this.level = 'info';
    }
    LogFactory.prototype.setLevels = function (levels) {
        this.levels = levels;
    };
    LogFactory.prototype.setColors = function (colors) {
        this.colors = colors;
        winston.addColors(colors);
    };
    LogFactory.prototype.getLog = function () {
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
        var logger = winston_1.createLogger({
            level: this.level,
            levels: this.levels,
            format: format.combine.apply(format, __spread((this.formats || this.formatLog()))),
            transports: this.transports || [],
            exitOnError: this.exitOnError,
            silent: !this.transports || this.transports.length === 0
        });
        logger.stream = {
            write: function (message, encoding) {
                logger.info(message.replace(/\n$/, ''));
            }
        };
        return logger;
    };
    LogFactory.prototype.formatLog = function () {
        return [
            format.label({ label: '@Pii' }),
            format.timestamp(),
            format.printf(function (info) {
                return info.label + "#" + info.timestamp + "[" + info.level + "]: " + (typeof info.message === 'object'
                    ? JSON.stringify(info.message)
                    : info.message);
            })
        ];
    };
    __decorate([
        di_1.InjectMany(exports.LogTransportToken),
        __metadata("design:type", Array)
    ], LogFactory.prototype, "transports", void 0);
    __decorate([
        di_1.Inject(exports.LogFormatToken),
        __metadata("design:type", Array)
    ], LogFactory.prototype, "formats", void 0);
    LogFactory = __decorate([
        di_1.SingletonService(exports.LogFactoryToken)
    ], LogFactory);
    return LogFactory;
}());
exports.LogFactory = LogFactory;

//# sourceMappingURL=logFactory.js.map
