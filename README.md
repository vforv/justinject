# Dependency injection for Typescript

Node module for DI in Typescript

It is lightweight and very easy to use.

To install it type:

```npm i justinject -S```

# Example

```
@Service()
export class FirstService {
    private time: any;

    constructor() {
        this.time = new Date();
    }

    public method() {
        return this.time;
    }
}

@Service()
export class SecondService {
    constructor(public first: FirstService) { }
    
    public method() {
        return this.first.method();
    }
}

import { Container } from 'justinject';
import { SecondService } from './SecondService';

const second = Container.resolve<SecondService>(SecondService);

console.log(second.method());
// retruns date
```

To specify Service as singleton add singelton key word in decorator
@Service('singleton')

# Testing

To mock Service is pretty easy, example:

```
@Service()
export class FirstServiceMock extends FirstService{
    private time: any;

    constructor() {
        this.time = new Date();
    }

    public method() {
        return `${this.time} mocked`;
    }
}


Container.mock([
            {
                service: FirstService,
                mockWith: FirstServiceMock,
                override: false,
                type: 'default'
            }
        ])

const second = Container.resolve<SecondService>(SecondService);

console.log(second.method());
// retruns date mocked
```