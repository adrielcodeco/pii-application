import { Application } from './application';
import { Locale } from './locale';
export interface MainModuleOptions {
    locale?: Locale;
    hideLogo?: boolean;
}
export declare class MainModule {
    private failed;
    app?: Application;
    propagateError?: any;
    constructor(options?: MainModuleOptions);
    useAlias(alias: string | RegExp, path: string): MainModule;
    makeApp(App: Application | {
        new (): Application;
    }): MainModule;
    makeAppFrom(path: string): this;
    start(): Promise<MainModule>;
    stop(killProcess?: boolean): Promise<void>;
    step(fn: Function): MainModule;
}
export declare function main(options?: MainModuleOptions): MainModule;
//# sourceMappingURL=main.d.ts.map