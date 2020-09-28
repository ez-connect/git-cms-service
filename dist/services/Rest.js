import Axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import LRUCache from 'lru-cache';
import { Logger } from '../utils';
const kCacheMaxAge = 1000 * 60 * 60 * 24 * 7;
const kCacheMax = 1000;
class Rest {
    init(config) {
        this._config = config;
        this._axios = Axios.create({
            ...config,
            adapter: cacheAdapterEnhancer(Axios.defaults.adapter, {
                defaultCache: new LRUCache({ maxAge: kCacheMaxAge, max: kCacheMax }),
            }),
        });
    }
    setAuthorization(token) {
        const { headers } = this._config;
        this._axios.defaults.headers = {
            ...headers,
            Authorization: `${token}`,
        };
    }
    onError(handler) {
        this._errorHandler = handler;
    }
    async get(url, cfg) {
        Logger.debug('GET', url);
        try {
            const res = await this._axios.get(url, cfg);
            return res.data;
        }
        catch (err) {
            if (this._errorHandler) {
                this._errorHandler(err);
            }
            throw err;
        }
    }
    async post(url, data, config) {
        const res = await this._axios.post(url, data, config);
        return res.data;
    }
}
const singleton = new Rest();
export { singleton as Rest };
