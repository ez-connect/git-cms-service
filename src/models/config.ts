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

  // Addition query params as default
  queryParams?: { [name: string]: any };

  // Specific label for data type, can change to match your labels
  labels: {
    //
    // General tags
    //
    nav: string;
    header: string;
    footer: string;
    // Posts collection
    post: string;

    //
    // Blog
    //
    // Describe all available tags
    tags?: string;
    // Posts are pinned
    pin?: string;

    //
    // Documentation
    //
    // Table of contents
    toc?: string;
  };
}

export interface Config {
  // API service
  service: ServiceConfig;

  // Routes
  router: { [name: string]: string };

  // Google analytics
  trackingCode?: string;
}
