import { AxiosError, AxiosRequestConfig } from 'axios';
export declare type ErrorHandler = (err: AxiosError) => void;
declare class Rest {
    private _axios;
    private _config;
    private _errorHandler;
    init(config: AxiosRequestConfig): void;
    setAuthorization(token: string): void;
    onError(handler?: ErrorHandler): void;
    get<T>(url: string, cfg?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
declare const singleton: Rest;
export { singleton as Rest };
