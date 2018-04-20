export interface Type<T> {
    name?: any;
    new(...arg: any[]): T
}
export interface GenericClass<T> {
    (target: T): void
}