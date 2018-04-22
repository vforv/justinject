import 'mocha';

import { Container } from '../src/Container';
import { ForthService } from './services';
import { FirstServiceMock } from './mocks';
import * as chai from 'chai';

const expect = chai.expect;
// const assert = chai.assert;

describe('Test DI for typescript', () => {
    it(('Expect DI work correctly'), (done) => {
        const forth = Container.resolve<ForthService>(ForthService);

        expect(forth.fromForthService()).to.be.equals('First service');
        done();
    })

    it(('Expect DI work correctly singleton'), (done) => {
        const forth = Container.resolve<ForthService>(ForthService);

        expect(forth.rndNumFromSingleton()).to.be.exist;
        expect(forth.rndNumFromSingleton()).to.be.equals(forth.newSingleton());

        done();
    })

    it('Mock/replace dependency work correctly', (done) => {
        Container.mock([
            {
                dep: FirstServiceMock
            }
        ])

        const forth = Container.resolve<ForthService>(ForthService);

        expect(forth.fromForthService()).to.be.equals('Method from first service mocked');
        // console.log(forth)
        // expect(forth.isMockedOrReplaced()).to.be.equals('Should work');
        done();

    })
})