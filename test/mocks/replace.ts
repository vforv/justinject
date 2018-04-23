import { Service } from "../../src/Service";


@Service()
export class FirstServiceMock {
    public method() {
        return 'Method from first service replaced';
    }
}
