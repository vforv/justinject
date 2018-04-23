import { Service } from "../../src/Service";
import { FirstService } from "../services";


@Service()
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

@Service()
export class WrongTypeService {

}