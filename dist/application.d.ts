import 'reflect-metadata';
import { ILogger } from './interfaces/iLogger';
import { ApplicationOptions } from './interfaces/applicationOptions';
export declare class Application {
    protected log: ILogger;
    protected options: ApplicationOptions;
    constructor(options?: ApplicationOptions);
    run(): Promise<void>;
    kill(pid: number, killProcess?: boolean, signal?: string | number): Promise<void>;
    loadLogger(): void;
    loadErrors(): void;
    loadConfigs(): void;
    loadServers(): void;
}
//# sourceMappingURL=application.d.ts.map