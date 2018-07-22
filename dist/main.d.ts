import { Application } from './application';
import { Locale } from './locale';
declare class MainModule {
    app?: Application;
    propagateError?: (err: any) => void;
    constructor(locale?: Locale);
    useAlias(alias: string, path: string): MainModule;
    makeApp(App: Application | {
        new (): Application;
    }): MainModule;
    makeAppFrom(path: string): this;
    start(): Promise<void>;
    then(fn: Function): this;
    catch(fn: (err: any) => void): MainModule;
}
export declare function main(): MainModule;
export {};
//# sourceMappingURL=main.d.ts.map