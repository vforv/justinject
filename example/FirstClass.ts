import { Service } from "../src/Service";


@Service()
export class InitClass {
    private time: any;

    constructor() {
        this.time = Math.random();
    }

    public method() {
        return this.time;
    }

    public method1() {
        return this.time;
    }
}

@Service('singleton')
export class FirstClass {

    constructor(private init: InitClass) {
    }

    public method() {
        return this.init.method();
    }

    public method1() {
        return this.init.method1();
    }
}