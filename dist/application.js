"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const di_1 = require("@pii/di");
const errors_1 = require("./errors");
const logger_1 = require("./logger");
const server_1 = require("./server");
const logFactory_1 = require("./logFactory");
const consoleLogger_1 = require("./consoleLogger");
const winston = require('winston');
class Application {
    constructor(options = { projectName: 'pii-application' }) {
        this.options = options;
        this.loadLogger();
        this.loadErrors();
        this.loadConfigs();
        if (!di_1.Container.has(logger_1.LoggerToken)) {
            di_1.Container.addSingleton(logger_1.LoggerToken, new consoleLogger_1.ConsoleLogger());
        }
        this.log = di_1.Container.get(logger_1.LoggerToken);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadServers();
            const servers = di_1.Container.getServices(server_1.ServerToken);
            for (let i = 0; i < servers.length; i++) {
                const server = servers[i];
                yield server.start();
            }
        });
    }
    kill(pid, signal) {
        const servers = di_1.Container.getServices(server_1.ServerToken);
        for (let i = 0; i < servers.length; i++) {
            const server = servers[i];
            server.stop();
        }
        process.kill(pid, signal);
    }
    loadLogger() {
        const consoleTransport = new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        });
        di_1.Container.addSingleton(logFactory_1.LogTransportToken, consoleTransport);
    }
    loadErrors() {
        di_1.Container.addSingleton(errors_1.ErrorToken, new errors_1.Errors());
    }
    loadConfigs() {
    }
    loadServers() {
    }
}
exports.Application = Application;

//# sourceMappingURL=application.js.map
