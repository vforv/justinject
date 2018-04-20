import 'reflect-metadata';
import { Type } from "./Model";

export const Injector = new class {
    protected service: Map<string, Type<any>> = new Map<string, Type<any>>();
    protected mocks: Map<string, Type<any>> = new Map<string, Type<any>>();
    protected hasMocks: boolean;

    public resolve<T>(target: Type<T>): T {
        // tokens are required dependencies, while injections are resolved tokens from the Injector
        let tokens: any = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Injector.resolve<any>(token));

        if (this.hasMocks && this.isMockedClass(target)) {
            return this.mockDeps(target, injections)
        }

        return new target(...injections);
    }

    protected mockDeps(target: any, injections: any) {
        const MockClass = this.getMock(target);
        return new MockClass(...injections);
    }

    public mock(mocks: any[]) {
        this.hasMocks = true;

        mocks.map((target: any) => {
            if (target.dep.name.slice(-4) !== 'Mock') {
                throw Error('Class name must end with "Mock"');
            }

            if (!target.override) {
                if (!(target.dep.prototype instanceof this.service.get(target.dep.name.slice(0, -4)))) {
                    throw Error('"Mock" class must extends main instance');
                }
            }

            this.mocks.set(target.dep.name, target.dep);
        });
    }

    protected getMock(target: any) {
        return this.mocks.get(`${target.name}Mock`)
    }

    protected isMockedClass(dep: any) {
        return this.mocks.has(`${dep.name}Mock`)
    }

    public set(target: Type<any>) {
        this.service.set(target.name, target);
    }
}
