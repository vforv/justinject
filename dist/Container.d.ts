import 'reflect-metadata';
import { IType, MockingType } from './Model';
export interface IContainer<T> {
    set(target: IType<any>, type?: string): any;
    clear(): void;
    resolve<T>(target: any): T;
    mock(mocks: MockingType): void;
}
export declare const Container: IContainer<any>;
