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
const moduleloader_1 = require("@pii/moduleloader");
const application_1 = require("./application");
const defaultLocale = {
    name: 'en-us'
};
class MainModule {
    constructor(locale = defaultLocale) {
        this.app = undefined;
        console.log('   ____  ____  _ _');
        console.log('  / __ \\|  _ \\(_|_)');
        console.log(' / / _` | |_) | | |');
        console.log('| | (_| |  __/| | |');
        console.log(' \\ \\__,_|_|   |_|_|');
        console.log('  \\____/');
        console.log('@Pii -- Entry loader');
        locale = Object.assign({}, defaultLocale, locale);
        require('source-map-support').install();
        require('moment').locale(locale.name);
        require('numeral').locale(locale.name);
        moduleloader_1.default('#', process.cwd());
    }
    useAlias(alias, path) {
        try {
            console.log(`@Pii -- Using Alias '${alias}' to '${path}'`);
            moduleloader_1.default(alias, path);
            return this;
        }
        catch (err) {
            if (this.propagateError) {
                this.propagateError(err);
            }
            else {
                throw new Error(err);
            }
            return this;
        }
    }
    makeApp(App) {
        try {
            console.log(`@Pii -- making app`);
            if (App instanceof application_1.Application) {
                this.app = App;
            }
            else {
                this.app = new App();
            }
            return this;
        }
        catch (err) {
            if (this.propagateError) {
                this.propagateError(err);
            }
            else {
                throw new Error(err);
            }
            return this;
        }
    }
    makeAppFrom(path) {
        try {
            console.log(`@Pii -- making app from '${path}'`);
            const appModule = require(path);
            if (application_1.Application.isPrototypeOf(appModule)) {
                this.makeApp(appModule);
            }
            else {
                let app;
                for (let key in appModule) {
                    const maybeApp = Reflect.get(appModule, key);
                    if (application_1.Application.isPrototypeOf(maybeApp)) {
                        app = maybeApp;
                        break;
                    }
                }
                if (app) {
                    this.makeApp(app);
                }
                else {
                    throw new Error(`Application not found in path '${path}'`);
                }
            }
            return this;
        }
        catch (err) {
            if (this.propagateError) {
                this.propagateError(err);
            }
            else {
                throw new Error(err);
            }
            return this;
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`@Pii -- Starting`);
                if (this.app instanceof application_1.Application) {
                    yield this.app.run();
                }
                else {
                    throw Error('result of makeApp is not an Application');
                }
            }
            catch (err) {
                if (this.propagateError) {
                    this.propagateError(err);
                }
                else {
                    throw new Error(err);
                }
            }
        });
    }
    then(fn) {
        fn && fn();
        return this;
    }
    catch(fn) {
        this.propagateError = fn;
        return this;
    }
}
function main() {
    return new MainModule();
}
exports.main = main;

//# sourceMappingURL=main.js.map
