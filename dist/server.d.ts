import { ServerOptions } from './interfaces/serverOptions';
import { IServer } from './interfaces/iServer';
export declare class Server<T, O extends ServerOptions> implements IServer {
    protected serverInstance?: T;
    protected options: O;
    constructor(options: O);
    prepare(): Promise<void>;
    init(): Promise<void>;
    loadRoutes(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export declare const ServerToken: string;
//# sourceMappingURL=server.d.ts.map