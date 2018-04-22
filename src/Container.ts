import 'reflect-metadata';
import {  IType, MockingType } from './Model';

/*eslint new-parens: "error"*/
export const Container = new class {
    private service: Map<any, any> = new Map<any, IType<any>>();
    private serviceType: Map<any, any> = new Map<any, IType<any>>();
    private mocks: Map<any, any> = new Map<any, IType<any>>();
    private hasMocks: boolean;

    constructor() {
        this.hasMocks = false;
    }

    public set(target: IType<any>, type?: string) {
        this.setserviceType(target, type);
    }

    /**
     * Resolove service with all deps
     *
     * @param target service to resolve
     */
    public resolve<T>(target: any): T {

        // tokens are required dependencies, while injections are resolved tokens from the Container
        const tokens: any = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Container.resolve<any>(token));

        if (this.hasMocks && this.isMockedClass(target)) {
            const MockClass = this.getMock(target);
            return this.resolveByserviceType<T>(MockClass, injections);
        }

        return this.resolveByserviceType<T>(target, injections);
    }

    /**
     * Mock or replace service
     *
     * @param mocks all mocking services
     */
    public mock(mocks: MockingType) {
        this.hasMocks = true;

        mocks.map((target: any) => {
            const serviceToMockName: string = target.dep.name.slice(0, -4);
            const serviceToMockType: string = this.serviceType.get(serviceToMockName);

            if (target.dep.name.slice(-4) !== 'Mock') {
                throw Error('Class name must end with "Mock"');
            }

            if (!target.override && serviceToMockType === 'default') {
                if (!(target.dep.prototype instanceof this.service.get(serviceToMockName))) {
                    throw Error('"Mock" class must extends main instance, or use override tag');
                }
            }

            this.service.delete(serviceToMockName);
            this.setMocks(target, serviceToMockType);
        });
    }

    /**
     * Get mocking service
     *
     * @param target service which we want to mock
     */
    private getMock(target: any) {
        return this.mocks.get(`${target.name}Mock`);
    }

    /**
     * Check if target service, the service we want to mock
     *
     * @param target service which we want to mock
     */
    private isMockedClass(target: any) {
        return this.mocks.has(`${target.name}Mock`);
    }

    /**
     * This will reslove service, if service is sinleton
     * we need just to return instance
     *
     * @param target service
     * @param injections dependencies
     */
    private resolveByserviceType<T>(target: IType<T>, injections: any): T {
        switch (this.serviceType.get(target.name)) {
            case 'singleton': {
                if (this.service.get(target.name) === null) {
                    // resolve each mocked service here
                    console.log(injections)
                    const inj = new target(...injections);
                    
                    this.service.set(target.name, inj);
                    return inj;
                }

                return this.service.get(target.name);
            }
            case 'default': {
                return new target(...injections);
            }
            default: {
                return new target(...injections);
            }
        }
    }

    /**
     * This will add mocking services to service property
     *
     * @param mockingService
     * @param serviceToMockType
     */
    private setMocks(mockingService: any, serviceToMockType: string) {
        this.serviceType.set(mockingService.dep.name, serviceToMockType);
        this.mocks.set(mockingService.dep.name, mockingService.dep);

        switch (serviceToMockType) {
            case 'singleton': {
                this.service.set(mockingService.dep.name, null);
            }
            case 'default': {
                this.service.set(mockingService.dep.name, mockingService.dep);
            }
            default: {
                this.service.set(mockingService.dep.name, mockingService.dep);
            }
        }
    }

    /**
     * Add new service
     *
     * @param target new service to add
     * @param type Type of service
     */
    private setserviceType(target: IType<any>, type?: string) {
        this.service.set(target.name, target);

        switch (type) {
            case 'singleton': {
                this.serviceType.set(target.name, 'singleton');
                this.service.set(target.name, null);

                return target;
            }
            case undefined: {
                if (!this.serviceType.has(target.name)) {
                    this.serviceType.set(target.name, 'default');
                }

                return target;
            }
            default: {
                throw Error(`Please check ${target.name} service. Service type ${type} doesn't exists`);
            }
        }

    }
}();
