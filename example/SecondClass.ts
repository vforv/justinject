import { FirstClass } from "./FirstClass";
import { Service } from "../src/Service";

@Service()
export class SecondClass {
    constructor(public first: FirstClass) { }
    
    public method() {
        return this.first.method1();
    }
}