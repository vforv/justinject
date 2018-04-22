import { Container } from '../src/Container';
import { ThirdClass } from './ThirdClass';

const third = Container.resolve<ThirdClass>(ThirdClass);

console.log(third.method1());