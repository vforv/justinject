import { Service } from "../../src/Service";
import { FirstService } from "../services";


@Service()
export class FirstServiceMock extends FirstService {
    public method() {
        return 'Method from first service mocked';
    }
}