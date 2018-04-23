"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/*eslint new-parens: "error"*/
exports.Container = new /** @class */ (function () {
    function class_1() {
        this.service = new Map();
        this.serviceType = new Map();
        this.mocks = new Map();
        this.hasMocks = false;
    }
    class_1.prototype.set = function (target, type) {
        var serviceName = target.name;
        var serviceNameFirstLetter = serviceName.substring(0, 1);
        if (serviceName.slice(-7) !== 'Service') {
            throw new Error("Service " + serviceName + " should end with Service key word");
        }
        if (serviceNameFirstLetter !== serviceNameFirstLetter.toUpperCase()) {
            throw new Error("Service " + serviceName + " should start with capital first letter");
        }
        this.setserviceType(target, type);
    };
    class_1.prototype.clear = function () {
        this.service.clear();
        this.serviceType.clear();
        this.mocks.clear();
        this.hasMocks = false;
    };
    /**
     * Resolove service with all deps
     *
     * @param target service to resolve
     */
    class_1.prototype.resolve = function (target) {
        // tokens are required dependencies, while injections are resolved tokens from the Container
        /* istanbul ignore next */
        var tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        var injections = tokens.map(function (token) { return exports.Container.resolve(token); });
        if (this.hasMocks && this.isMockedClass(target)) {
            var MockClass = this.getMock(target);
            return this.resolveByserviceType(MockClass, injections);
        }
        return this.resolveByserviceType(target, injections);
    };
    /**
     * This will reslove service, if service is sinleton
     * we need just to return instance
     *
     * @param target service
     * @param injections dependencies
     */
    class_1.prototype.resolveByserviceType = function (target, injections) {
        switch (this.serviceType.get(target.name)) {
            case 'singleton': {
                this.service.get('FirstSinletonServiceMock');
                if (this.service.get(target.name) === null) {
                    // resolve each mocked service here
                    var inj = new (target.bind.apply(target, [void 0].concat(injections)))();
                    this.service.set(target.name, inj);
                    return inj;
                }
                return this.service.get(target.name);
            }
            case 'default': {
                return new (target.bind.apply(target, [void 0].concat(injections)))();
            }
            default: {
                return new (target.bind.apply(target, [void 0].concat(injections)))();
            }
        }
    };
    /**
     * Mock or replace service
     *
     * @param mocks all mocking services
     */
    class_1.prototype.mock = function (mocks) {
        var _this = this;
        this.hasMocks = true;
        mocks.map(function (target) {
            /* istanbul ignore next */
            var serviceToMockType = (target.type) ? target.type : 'default';
            if (target.mockWith.name.slice(-4) !== 'Mock') {
                throw new Error('Class name must end with "Mock"');
            }
            if (!target.override) {
                if (!(target.mockWith.prototype instanceof target.service)) {
                    throw new Error('"Mock" class must extends main instance, or set override tag to be true');
                }
            }
            _this.setMocks(target.mockWith, serviceToMockType);
        });
    };
    /**
     * Get mocking service
     *
     * @param target service which we want to mock
     */
    class_1.prototype.getMock = function (target) {
        return this.mocks.get(target.name + "Mock");
    };
    /**
     * Check if target service, the service we want to mock
     *
     * @param target service which we want to mock
     */
    class_1.prototype.isMockedClass = function (target) {
        return this.mocks.has(target.name + "Mock");
    };
    /**
     * This will add mocking services to service property
     *
     * @param mockingService
     * @param serviceToMockType
     */
    class_1.prototype.setMocks = function (mockingService, serviceToMockType) {
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
    };
    /**
     * Add new service
     *
     * @param target new service to add
     * @param type Type of service
     */
    class_1.prototype.setserviceType = function (target, type) {
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
                throw Error("Please check " + target.name + " service. Service type " + type + " doesn't exists");
            }
        }
    };
    return class_1;
}())();
