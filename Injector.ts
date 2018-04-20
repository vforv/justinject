import 'reflect-metadata';
import { Type } from "./Model";

export const Injector = new class {
    protected service: Map<string, Type<any>> = new Map<string, Type<any>>();
    
    public resolve<T>(target: Type<T>): T {
        // tokens are required dependencies, while injections are resolved tokens from the Injector
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        // console.log(tokens)
        const injections = tokens.map((token: any) => Injector.resolve<any>(token));
        console.log(new target(...injections))
        return new target(...injections);
    }

    public set(target: Type<any>) {
        this.service.set(target.name, target);
    }
}