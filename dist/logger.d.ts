import { Logger as LoggerInstance } from 'winston';
import { ILogger } from './interfaces/iLogger';
export declare const LoggerToken: unique symbol;
export declare class Logger implements ILogger {
    readonly stream: any;
    protected logger: LoggerInstance;
    constructor();
    log(log: string, level?: string): void;
    error(log: string): void;
    warn(log: string): void;
    info(log: string): void;
    debug(log: string): void;
    notice(log: string): void;
    crit(log: string): void;
}
//# sourceMappingURL=logger.d.ts.map