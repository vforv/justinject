import { Service } from '../../src/Service';

@Service()
export class FirstService {
    public rnd: number;
    constructor() {
        this.rnd = Math.random();
    }

    public method() {
        return 'First service';
    }

    public rndNumber() {
        return this.rnd;
    }

    public mockedReplaced() {
        return 'Should work';
    }
}

@Service('singleton')
export class FirstSinletonService {
    constructor(public first: FirstService) { }

    public method() {
        return this.first.rndNumber();
    }
}

@Service()
class SecondService {
    constructor(public first: FirstService) { }

    public fromFirstService() {
        return this.first.method();
    }
}

@Service()
class ThirdService {
    constructor(public second: SecondService, public firstSingl: FirstSinletonService) { }

    public fromThirdService() {
        return this.second.fromFirstService();
    }

    public rndNumFromSingleton() {
        return this.firstSingl.method();
    }
}

@Service()
export class ForthService {
    constructor(public third: ThirdService, public fromSingleton: FirstSinletonService, public first: FirstService) { }

    public fromForthService() {
        return this.third.fromThirdService();
    }

    public rndNumFromSingleton() {
        return this.third.rndNumFromSingleton();
    }

    public newSingleton() {
        return this.fromSingleton.method();
    }

    public isMockedOrReplaced() {
        this.first.mockedReplaced();
    }
}
