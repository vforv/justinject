import { Service } from './Service';
import { Injector } from './Injector';


class FirstClass {
    private time: any;

    constructor() {
        this.time = Math.random();
    }

    public method1() {
        return this.time;
    }
}

class FirstClassNew {
    private time: any;

    constructor() {
        this.time = Math.random();
    }

    public method1() {
        return this.time + "aaaaa";
    }
}

@Service()
class SecondClass {
    constructor(public first: FirstClass) { }
    public method1() {
        return this.first.method1();
    }
}

@Service()
class SecondClassMock extends SecondClass {
    
    public method1() {
        return 'mocked';
    }
}

@Service()
class ThirdClass {
    constructor(public first: FirstClass, public second: SecondClass) { }

    public method3() {
        return this.second.method1();
    }
}

Injector.mock(
    [
        {
            dep: SecondClassMock
        },
    ]
);

const third = Injector.resolve(ThirdClass);
console.log(third.method3())