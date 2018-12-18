export interface IServer {
    prepare(): Promise<void>;
    init(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=iServer.d.ts.map