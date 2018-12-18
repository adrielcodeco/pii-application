"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
var Exception = (function () {
    function Exception(_a) {
        var _b = _a === void 0 ? {} : _a, code = _b.code, message = _b.message, shortMessage = _b.shortMessage, params = _b.params, details = _b.details;
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
    Object.defineProperty(Exception.prototype, "code", {
        get: function () {
            return this._code || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "message", {
        get: function () {
            return this._message || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "shortMessage", {
        get: function () {
            return this._shortMessage || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "params", {
        get: function () {
            return this._params || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "details", {
        get: function () {
            return this._details || '';
        },
        enumerable: true,
        configurable: true
    });
    Exception.prototype.toJSON = function () {
        var str = {};
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
    };
    Exception.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
    };
    Exception.prototype.valueOf = function () {
        return this.toString();
    };
    Exception.prototype[Symbol.toPrimitive] = function (hint) {
        return this.toString();
    };
    return Exception;
}());
exports.Exception = Exception;

//# sourceMappingURL=exception.js.map
