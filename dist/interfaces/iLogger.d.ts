export interface ILogger {
    stream: any;
    log(log: string, level?: string): void;
    error(log: string): void;
    warn(log: string): void;
    info(log: string): void;
    debug(log: string): void;
    notice(log: string): void;
    crit(log: string): void;
}
//# sourceMappingURL=iLogger.d.ts.map