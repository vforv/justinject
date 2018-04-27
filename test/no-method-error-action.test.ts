import 'mocha';

import { Container } from '../src/Container';
import { ForthService } from './services';
import * as chai from 'chai';
import * as wrongVal from './mocks/wrong.validator';
const expect = chai.expect;
// const assert = chai.assert;


describe('Test DI for action errors', () => {
    beforeEach((done) => {
        Container.clear();
        Container.mock([
            {
                service: ForthService,
                mockWith: wrongVal.ForthServiceMock,
                type: 'default',
                override: true
            }
        ])

        done();
    })

    it('Action test for Hemera, hemera validator method wrong', (done) => {

        const forth = Container.resolve<ForthService>(ForthService);
        const errorValidator = 'Action service must have validator property. ValidateService must have schema method which returns validation.';
        expect(() => forth.actionNew()).throws(errorValidator)
        done();
    })
})