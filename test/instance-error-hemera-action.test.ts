import 'mocha';

import { Container } from '../src/Container';
import { HemeraService, ForthService } from './services';
import { HemeraServiceMock } from './mocks';
import * as chai from 'chai';
const expect = chai.expect;
// const assert = chai.assert;


describe('Test DI for action errors', () => {
    beforeEach((done) => {
        Container.clear();
        Container.mock([
            {
                service: HemeraService,
                mockWith: HemeraServiceMock,
                type: 'default',
                override: true
            }
        ])
        done();
    })


    it('Action test for Hemera, hemera instance method doesnt exists', (done) => {
        const forth = Container.resolve<ForthService>(ForthService);
        const errorHemera = 'Action service must have hemera property. HemeraService must have instance getter which returns Hemera instance.';
        expect(() => forth.actionNew()).throws(errorHemera)
        done();

    });
})