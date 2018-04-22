import { Container } from '../Container';
import { ThirdClass } from './ThirdClass';
import { SecondClass } from './SecondClass';
import { FirstClass, InitClass } from './FirstClass';

class InitClassMock extends InitClass{
    method() {
        return Math.random() + " Madafaca" ;
    }
}

Container.mock(
    [
        {
            dep: InitClassMock
        },
    ]
);
const third: any = Container.resolve(ThirdClass);
// const second = Container.resolve(SecondClass);

console.log(third)
console.log(third.method1())
// console.log(second.method())

// class FirstClassNew {
//     private time: any;

//     constructor() {
//         this.time = Math.random();
//     }

//     public method1() {
//         return this.time + "aaaaa";
//     }
// }



// @Service()
// class SecondClassMock extends SecondClass {
    
//     public method1() {
//         return 'mocked';
//     }
// }

