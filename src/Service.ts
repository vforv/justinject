import { Container } from './Container';
import { IGenericClass, IType } from './Model';

export const Service = (type?: string): IGenericClass<IType<any>> => {
    return (target: IType<any>) => {
        Container.set(target, type);
    };
};
