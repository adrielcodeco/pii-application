import { Logger as LoggerInstance } from 'winston';
import * as TransportInstance from 'winston-transport';
import { ILogFactory } from './interfaces/iLogFactory';
export declare const LogTransportToken: unique symbol;
export declare const LogFormatToken: unique symbol;
export declare const LogFactoryToken: unique symbol;
export declare class LogFactory implements ILogFactory<LoggerInstance> {
    transports: TransportInstance[];
    formats: any[];
    exitOnError: boolean;
    level: string;
    protected levels: any;
    protected colors: any;
    setLevels(levels: Object): void;
    setColors(colors: Object): void;
    getLog(): LoggerInstance;
    formatLog(): any[];
}
//# sourceMappingURL=logFactory.d.ts.map