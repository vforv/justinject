import 'mocha';

import { Container } from '../src/Container';
import { ForthService, FirstService, FirstSinletonService, HemeraService, ValidateService } from './services';
import { FirstServiceMock, FirstSinletonServiceMockWrong, Wrong, HemeraServiceMock, ForthServiceMock } from './mocks';
import * as replace from './mocks/replace';
import * as chai from 'chai';
import { FirstSinletonServiceMock, WrongTypeService, wrongService, ValidateServiceMock } from './mocks/index';
const expect = chai.expect;
// const assert = chai.assert;
let forth: any;

before((done) => {
    forth = Container.resolve<ForthService>(ForthService);
    done();
})

describe('Test DI for typescript', () => {
    it(('Expect DI work correctly'), (done) => {
        expect(forth.fromForthService()).to.be.equals('First service');
        done();
    })

    it(('Expect DI work correctly singleton'), (done) => {
        expect(forth.rndNumFromSingleton()).to.be.exist;
        expect(forth.rndNumFromSingleton()).to.be.equals(forth.newSingleton());

        done();
    })

    it('Mock/replace dependency work correctly', (done) => {
        Container.mock([
            {
                service: FirstService,
                mockWith: FirstServiceMock,
                override: false,
                type: 'default'
            }
        ])
        forth = Container.resolve<ForthService>(ForthService);
        let first = Container.resolve<FirstService>(FirstService);

        expect(forth.fromForthService()).to.be.equals('Method from first service mocked');
        expect(first.rnd).to.exist
        expect(first.mockedReplaced()).to.be.equals('Should work');

        Container.clear();
        Container.mock([
            {
                service: FirstService,
                mockWith: replace.FirstServiceMock,
                override: true,
                type: 'default'
            }
        ])
        forth = Container.resolve<ForthService>(ForthService);
        first = Container.resolve<FirstService>(FirstService);

        expect(forth.fromForthService()).to.be.equals('Method from first service replaced');
        expect(first.rnd).to.not.exist

        done();
    })

    it('Repace singleton', (done) => {
        Container.clear();

        Container.mock([
            {
                service: FirstSinletonService,
                mockWith: FirstSinletonServiceMock,
                override: true,
                type: 'singleton'
            }
        ])

        forth = Container.resolve<ForthService>(ForthService);

        expect(forth.rndNumFromSingleton()).to.be.equals(forth.newSingleton());
        expect(forth.rndNumFromSingleton()).to.contains('Mock')
        done();
    });

    it('Mock service must end with Mock', (done) => {
        Container.clear();

        expect(() => Container.mock([
            {
                service: FirstSinletonService,
                mockWith: FirstSinletonServiceMockWrong,
                override: true,
                type: 'singleton'
            }
        ])).throws('Class name must end with "Mock"');

        done();
    })

    it('If override false mocking service must be an instance of main service', (done) => {
        Container.clear();

        expect(() => Container.mock([
            {
                service: FirstSinletonService,
                mockWith: FirstSinletonServiceMock,
                override: false,
                type: 'singleton'
            }
        ])).throws('"Mock" class must extends main instance, or set override tag to be true');

        done();
    })

    it('Wrong type of service', (done) => {
        Container.clear();

        expect(() => Container.set(WrongTypeService, 'somethingwrong')).throws(`Please check WrongTypeService service. Service type somethingwrong doesn't exists`);

        done();
    })

    it('Service should start with capital first letter', (done) => {
        Container.clear();

        expect(() => Container.set(wrongService, undefined)).throws(`Service wrongService should start with capital first letter`);

        done();
    })

    it('Service name should have Service kayword on the end', (done) => {
        Container.clear();

        expect(() => Container.set(Wrong, undefined)).throws(`Service Wrong should end with Service key word`);

        done();
    })

    it('Action test for Hemera', (done) => {
        forth = Container.resolve<ForthService>(ForthService);
        const result: any = forth.action();
        expect(result).to.be.equal(`Action {"topic":"test.topic","cmd":"go"} added succesfly`)
        done();
    })

    it('Action with params test for Hemera', (done) => {
        forth = Container.resolve<ForthService>(ForthService);
        const result: any = forth.actionNew();
        expect(result).to.be.equal(`Action {"topic":"new.topic","cmd":"gogo","key":"dothat","key1":"dothis"} added succesfly`)
        done();
    })

    it('Action test for Hemera, hemera instance method doesnt exists', (done) => {
        Container.mock([
            {
                service: HemeraService,
                mockWith: HemeraServiceMock,
                type: 'default',
                override: true
            }
        ]);

        forth = Container.resolve<ForthService>(ForthService);
        const error = `Action service must have hemera property.
HemeraService must have instance getter which returns Hemera instance.
                `;
        expect(() => forth.actionNew()).throws(error)
        done();
    })

    it('Action test for Hemera, hemera property doesnt exists', (done) => {
        Container.mock([
            {
                service: ForthService,
                mockWith: ForthServiceMock,
                type: 'default',
                override: true
            }
        ]);

        forth = Container.resolve<ForthService>(ForthService);
        const error = `Action service must have hemera property.
HemeraService must have instance getter which returns Hemera instance.
                `;
        expect(() => forth.actionNew()).throws(error)
        done();
    })

    it('Action test for Hemera, hemera validate method doesnt exists', (done) => {
        Container.clear();
        Container.mock([
            {
                service: ValidateService,
                mockWith: ValidateServiceMock,
                type: 'default',
                override: true
            }
        ]);

        forth = Container.resolve<ForthService>(ForthService);
        const error = `Action service must have validator property.
ValidateService must have schema method which returns validation.
                `;
        expect(() => forth.actionNew()).throws(error)
        done();
    })
})