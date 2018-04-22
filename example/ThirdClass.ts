import { Service } from "../src/Service";
import { FirstClass } from "./FirstClass";
import { SecondClass } from "./SecondClass";

@Service()
export class ThirdClass {
    constructor(public first: FirstClass, public second: SecondClass) { }

    public method1() {
        return this.first.method();
    }

    public method2() {
        return this.second.method();
    }
}