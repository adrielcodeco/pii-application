"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var di_1 = require("@pii/di");
var errors_1 = require("./errors");
var logger_1 = require("./logger");
var server_1 = require("./server");
var logFactory_1 = require("./logFactory");
var consoleLogger_1 = require("./consoleLogger");
var winston = require('winston');
var Application = (function () {
    function Application(options) {
        if (options === void 0) { options = { projectName: 'pii-application' }; }
        this.options = options;
        this.loadLogger();
        this.loadErrors();
        this.loadConfigs();
        if (!di_1.Container.has(logger_1.LoggerToken)) {
            di_1.Container.addSingleton(logger_1.LoggerToken, new consoleLogger_1.ConsoleLogger());
        }
        this.log = di_1.Container.get(logger_1.LoggerToken);
    }
    Application.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var servers, i, server;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadServers();
                        servers = di_1.Container.getServices(server_1.ServerToken);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < servers.length)) return [3, 4];
                        server = servers[i];
                        return [4, server.start()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Application.prototype.kill = function (pid, killProcess, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var servers, i, server;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        servers = di_1.Container.getServices(server_1.ServerToken);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < servers.length)) return [3, 4];
                        server = servers[i];
                        return [4, server.stop()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        if (killProcess !== false) {
                            process.kill(pid, signal);
                        }
                        return [2];
                }
            });
        });
    };
    Application.prototype.loadLogger = function () {
        var consoleTransport = new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        });
        di_1.Container.addSingleton(logFactory_1.LogTransportToken, consoleTransport);
    };
    Application.prototype.loadErrors = function () {
        di_1.Container.addSingleton(errors_1.ErrorToken, new errors_1.Errors());
    };
    Application.prototype.loadConfigs = function () {
    };
    Application.prototype.loadServers = function () {
    };
    return Application;
}());
exports.Application = Application;

//# sourceMappingURL=application.js.map
