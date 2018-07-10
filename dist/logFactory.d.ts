import { TransportInstance, LoggerInstance } from 'winston';
import { ILogFactory } from './interfaces/iLogFactory';
export declare const LogTransportToken: unique symbol;
export declare const LogFactoryToken: unique symbol;
export declare class LogFactory implements ILogFactory<LoggerInstance> {
    transports: TransportInstance[];
    emitErrs: boolean;
    exitOnError: boolean;
    protected levels: any;
    protected colors: any;
    setLevels(levels: Object): void;
    setColors(colors: Object): void;
    getLog(): LoggerInstance;
}
//# sourceMappingURL=logFactory.d.ts.map