import { ExceptionOptions } from './interfaces/exceptionOptions';
export declare class Exception {
    stack?: string;
    private _code?;
    private _message?;
    private _shortMessage?;
    private _params?;
    private _details?;
    private _developmentMode?;
    readonly code: string;
    readonly message: string;
    readonly shortMessage: string;
    readonly params: string;
    readonly details: string;
    constructor({ code, message, shortMessage, params, details }?: ExceptionOptions);
    toJSON(): object;
    toString(): string;
    valueOf(): string;
    [Symbol.toPrimitive](hint: string): string;
}
//# sourceMappingURL=exception.d.ts.map