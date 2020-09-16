import { AxiosRequestConfig } from 'axios';
export interface ServiceConfig {
    name: 'GitHub' | 'GitLab';
    baseURL: string;
    webBaseURL: string;
    rest?: AxiosRequestConfig;
    authorization?: {
        clientId: string;
        clientSecret: string;
        directUri: string;
    };
    queryParams?: {
        [name: string]: any;
    };
    labels: {
        nav: string;
        header: string;
        footer: string;
        tags: string;
        post: string;
        pin: string;
    };
}
export interface Config {
    service: ServiceConfig;
    router: {
        [name: string]: string;
    };
}
