import { ILogger } from './interfaces/iLogger';
export declare class FakeLogger implements ILogger {
    readonly stream: any;
    constructor();
    log(log: string, level?: string): void;
    error(log: string): void;
    warn(log: string): void;
    info(log: string): void;
    debug(log: string): void;
    notice(log: string): void;
    crit(log: string): void;
    alert(log: string): void;
    emerg(log: string): void;
}
//# sourceMappingURL=fakeLogger.d.ts.map