import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import LRUCache from 'lru-cache';

import { Logger } from '../utils';

export type ErrorHandler = (err: AxiosError) => void;

const kCacheMaxAge = 1000 * 60 * 60 * 24 * 7; // 1 week
const kCacheMax = 1000;

class Rest {
  private _axios: AxiosInstance;
  private _config: AxiosRequestConfig;

  private _errorHandler: ErrorHandler;

  public init(config: AxiosRequestConfig) {
    this._config = config;
    this._axios = Axios.create({
      ...config,
      adapter: cacheAdapterEnhancer(Axios.defaults.adapter, {
        defaultCache: new LRUCache({ maxAge: kCacheMaxAge, max: kCacheMax }),
      }),
    });
  }

  ///////////////////////////////////////////////////////////////////

  /**
   * Set Authorization for the default fetch config
   * @param token
   */
  public setAuthorization(token: string) {
    const { headers } = this._config;
    this._axios.defaults.headers = {
      ...headers,
      // Authorization: `Bearer ${token}`,
      Authorization: `${token}`,
    };
  }

  public onError(handler?: ErrorHandler) {
    this._errorHandler = handler;
  }

  ///////////////////////////////////////////////////////////////////

  public async get<T>(url: string, cfg?: AxiosRequestConfig): Promise<T> {
    Logger.debug('GET', url);
    try {
      const res = await this._axios.get<T>(url, cfg);
      return res.data;
    } catch (err) {
      if (this._errorHandler) {
        this._errorHandler(err);
      }
      throw err;
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this._axios.post<T>(url, data, config);
    return res.data;
  }
}

const singleton = new Rest();
export { singleton as Rest };
