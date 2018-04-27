import { HemeraService, ValidateService, ThirdService, FirstSinletonService, FirstService } from '../services';
import { Action } from '../../src/Action';

export class ForthServiceMock {
    constructor(public third: ThirdService, public fromSingleton: FirstSinletonService, public first: FirstService, public hemera: HemeraService, 
        public validatorWrong: ValidateService) { }

    @Action({
        topic: 'test.topic',
        cmd: 'go'
    })
    public action(msg: any, done: any) {
    }

    @Action({
        topic: 'new.topic',
        cmd: 'gogo'
    }, { key: 'dothat', key1: 'dothis' })
    public actionNew(msg: any, done: any) {
    }
}