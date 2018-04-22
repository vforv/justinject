export interface IType<T> {
    name?: any;
    new (...arg: any[]): T;
}

export type MockingType = Array<{ dep: any, override?: boolean }>;

export type IGenericClass<T> = (target: T) => void;
