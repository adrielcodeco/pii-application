"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./environment");
class Exception {
    get code() {
        return this._code || '';
    }
    get message() {
        return this._message || '';
    }
    get shortMessage() {
        return this._shortMessage || '';
    }
    get params() {
        return this._params || '';
    }
    get details() {
        return this._details || '';
    }
    constructor({ code, message, shortMessage, params, details } = {}) {
        this._developmentMode =
            (!process.env.NODE_ENV && !process.env.DEVELOPMENTMODE) ||
                (process.env.NODE_ENV === environment_1.Environment.development &&
                    !process.env.DEVELOPMENTMODE) ||
                !!process.env.DEVELOPMENTMODE;
        this._code = code;
        this._message = message;
        this._shortMessage = shortMessage;
        this._params = params;
        this._details = details;
        Error.captureStackTrace(this, this.constructor);
        if (!this._developmentMode)
            delete this.stack;
    }
    toJSON() {
        const str = {};
        if (this._code)
            str.code = this._code;
        if (this._message)
            str.message = this._message;
        if (this._shortMessage)
            str.shortMessage = this._shortMessage;
        if (this._params)
            str.params = this._params;
        if (this._details)
            str.details = this._details;
        if (this._developmentMode && this.stack)
            str.stack = this.stack;
        return str;
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    valueOf() {
        return this.toString();
    }
    [Symbol.toPrimitive](hint) {
        return this.toString();
    }
}
exports.Exception = Exception;

//# sourceMappingURL=exception.js.map
