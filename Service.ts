import { GenericClass, Type } from "./Model";
import { Injector } from "./Injector";

export const Service = (): GenericClass<Type<any>> => {
    return (target: Type<any>) => {
        Injector.set(target);
    }
}