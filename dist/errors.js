"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = require("@pii/di");
var Errors = (function () {
    function Errors() {
    }
    Errors.InvalidParam = function (param) {
        return {
            statusCode: 409,
            error: {
                shortMessage: 'InvalidParam',
                code: 'INTERNAL-0001',
                message: "The " + param + " param is invalid"
            },
            stackTrace: undefined
        };
    };
    Errors.ParamRequired = function (param) {
        return {
            statusCode: 409,
            error: {
                shortMessage: 'ParamRequired',
                code: 'INTERNAL-0002',
                message: "The " + param + " param is required"
            },
            stackTrace: undefined
        };
    };
    return Errors;
}());
exports.Errors = Errors;
exports.ErrorToken = di_1.Token(Errors);

//# sourceMappingURL=errors.js.map
