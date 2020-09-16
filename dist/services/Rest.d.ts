/// <reference types="node" />
import { AxiosError, AxiosRequestConfig } from 'axios';
import { EventEmitter } from 'events';
declare class Rest extends EventEmitter {
    kOnUnauthorized: string;
    private _axios;
    private _config;
    init(config: AxiosRequestConfig): void;
    setAuthorization(token: string): void;
    get<T>(url: string, cfg?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    getCode(err: AxiosError): number;
    isUnauthorized(err: AxiosError): boolean;
}
declare const singleton: Rest;
export { singleton as Rest };
