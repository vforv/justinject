import { FirstService, HemeraService, ValidateService } from "../services";
import { Action } from '../../src/Action';

export class FirstServiceMock extends FirstService {
    public method() {
        return 'Method from first service mocked';
    }
}


export class FirstSinletonServiceMock {
    constructor(public first: FirstService) { }

    public method() {
        return `${this.first.rndNumber()} Mocked!!!`;
    }
}



export class FirstSinletonServiceMockWrong {
    constructor(public first: FirstService) { }

    public method() {
        return `${this.first.rndNumber()} Mocked!!!`;
    }
}

export class WrongTypeService {

}

export class wrongService {

}

export class Wrong {

}

export class HemeraServiceMock {
    constructor() { }
}

export class ValidateServiceMock {
    constructor() { }
}


export class ForthServiceMock {
    constructor(public hemeraWrong: HemeraService, public validate: ValidateService) { }

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