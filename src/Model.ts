export interface IType<T> {
    name?: any;
    new(...arg: any[]): T;
}

export interface IMock {
    service: any;
    mockWith: any;
    override: boolean;
    type: 'singleton' | 'default';
}

export type MockingType = [IMock];

export type IGenericClass<T> = (target: T) => void;
