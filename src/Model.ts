export interface IType<T> {
    name?: any;
    new (...arg: any[]): T;
}

export type Mock = { service: any, mockWith: any, override: boolean, type: 'singleton' | 'default' };

export type MockingType = Array<Mock>;

export type IGenericClass<T> = (target: T) => void;
