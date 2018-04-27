import 'mocha';

import { Container } from '../src/Container';
import { ValidateService, ForthService } from './services';
import * as chai from 'chai';
import { ValidateServiceMock } from './mocks/index';
const expect = chai.expect;
// const assert = chai.assert;


describe('Test DI for action errors', () => {
    beforeEach((done) => {
        Container.clear();
        Container.mock([
            {
                service: ValidateService,
                mockWith: ValidateServiceMock,
                type: 'default',
                override: true
            }
        ])
        done();
    })

    it('Action test for Hemera, hemera validate method doesnt exists', (done) => {
        const forth = Container.resolve<ForthService>(ForthService);
        const errorValidator = 'Action service must have validator property. ValidateService must have schema method which returns validation.';
        expect(() => forth.actionNew()).throws(errorValidator)
        done();

    })
})