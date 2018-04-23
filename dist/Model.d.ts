export interface IType<T> {
    name?: any;
    new (...arg: any[]): T;
}
export declare type Mock = {
    service: any;
    mockWith: any;
    override: boolean;
    type: 'singleton' | 'default';
};
export declare type MockingType = Array<Mock>;
export declare type IGenericClass<T> = (target: T) => void;
