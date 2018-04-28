[![Build Status](https://travis-ci.org/vforv/justinject.svg?branch=master)](https://travis-ci.org/vforv/justinject)
[![Coverage Status](https://coveralls.io/repos/github/vforv/justinject/badge.svg?branch=master)](https://coveralls.io/github/vforv/justinject?branch=master)
[![npm version](https://badge.fury.io/js/justinject.svg)](https://badge.fury.io/js/justinject)

# Dependency injection for Typescript

Node module for DI in Typescript

It is lightweight and very easy to use.

To install it type:

```npm i justinject -S```

And it is necessary to enable:

"experimentalDecorators": true
"emitDecoratorMetadata": true

in tsconfig.json file

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

# HemeraJs Support

Hemera is node microservices framework. You can find more details here:
https://github.com/hemerajs/hemera

Justinject has support for hemera actions. You can declare new action like this:

```
@Service()
export class ActionService {
    constructor(public hemera: HemeraService, public validate: ValidateService) { }

    @Action({
        topic: 'new.topic',
        cmd: 'gogo'
    }, { additionalPattern: 'dothat', newAdditionalPattern: 'dothis' })
    public action(msg: any, done: any) {
        console.log('Action message', msg.data);
        done(null, 'Hemera action called!');
    }
}
```

ActionService must have 2 properties hemera and validator.

HemeraService must have instance getter which returns Hemera instance.

ValidateService must have schema getter which returns validation.
