import { Service } from "./Service";
import { Injector } from "./Injector";

@Service()
class FirstClass {

    public method1() {
        return 'first class';
    }
}

@Service()
class SecondClass {
    constructor(public first: FirstClass) {}
    public method1() {
        return 'second class'
    }
}

@Service()
class ThirdClass {
    constructor(public first: FirstClass, public second: SecondClass) {}

    public method3() {
        return this.first.method1();
    }
}

const third = Injector.resolve(ThirdClass);

console.log(third.method3())