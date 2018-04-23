import 'reflect-metadata';
import { IType, MockingType, Mock } from './Model';

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
        const serviceName = target.name;
        const serviceNameFirstLetter = serviceName.substring(0, 1);

        if (serviceName.slice(-7) !== 'Service') {
            throw new Error(`Service ${serviceName} should end with Service key word`);
        }
        if (serviceNameFirstLetter !== serviceNameFirstLetter.toUpperCase()) {
            throw new Error(`Service ${serviceName} should start with capital first letter`);
        }

        this.setserviceType(target, type);
    }

    public clear() {
        this.service.clear();
        this.serviceType.clear();
        this.mocks.clear();
        this.hasMocks = false;
    }

    /**
     * Resolove service with all deps
     *
     * @param target service to resolve
     */
    public resolve<T>(target: any): T {

        // tokens are required dependencies, while injections are resolved tokens from the Container
        /* istanbul ignore next */
        const tokens: any = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Container.resolve<any>(token));

        if (this.hasMocks && this.isMockedClass(target)) {
            const MockClass = this.getMock(target);

            return this.resolveByserviceType<T>(MockClass, injections);
        }

        return this.resolveByserviceType<T>(target, injections);
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
                this.service.get('FirstSinletonServiceMock')
                if (this.service.get(target.name) === null) {
                    // resolve each mocked service here
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
     * Mock or replace service
     *
     * @param mocks all mocking services
     */
    public mock(mocks: MockingType) {
        this.hasMocks = true;

        mocks.map((target: Mock) => {
            /* istanbul ignore next */
            const serviceToMockType: string = (target.type) ? target.type : 'default';

            if (target.mockWith.name.slice(-4) !== 'Mock') {
                throw new Error('Class name must end with "Mock"');
            }

            if (!target.override) {
                if (!(target.mockWith.prototype instanceof target.service)) {
                    throw new Error('"Mock" class must extends main instance, or set override tag to be true');
                }
            }
            
            this.setMocks(target.mockWith, serviceToMockType);
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
     * This will add mocking services to service property
     *
     * @param mockingService
     * @param serviceToMockType
     */
    private setMocks(mockingService: any, serviceToMockType: string) {
        this.serviceType.set(mockingService.name, serviceToMockType);
        this.mocks.set(mockingService.name, mockingService);
       
        switch (serviceToMockType) {
            case 'singleton': {
                this.service.set(mockingService.name, null);
            }
            case 'default': {
                if (serviceToMockType !== 'singleton') {
                    this.service.set(mockingService.name, mockingService);
                }
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
                /* istanbul ignore next */
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
