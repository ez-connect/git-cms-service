import Axios from 'axios';
import { EventEmitter } from 'events';
import { Logger } from '../utils';
class Rest extends EventEmitter {
    constructor() {
        super(...arguments);
        this.kOnUnauthorized = 'onUnauthorized';
    }
    init(config) {
        this._config = config;
        this._axios = Axios.create(config);
    }
    setAuthorization(token) {
        const { headers } = this._config;
        this._axios.defaults.headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }
    async get(url, cfg) {
        Logger.debug('GET', url);
        try {
            const res = await this._axios.get(url, cfg);
            return res.data;
        }
        catch (err) {
            if (this.isUnauthorized(err)) {
                this.emit(this.kOnUnauthorized);
            }
            throw err;
        }
    }
    async post(url, data, config) {
        const res = await this._axios.post(url, data, config);
        return res.data;
    }
    getCode(err) {
        var _a;
        if (err.code) {
            return Number.parseInt(err.code, 10);
        }
        if ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) {
            return err.response.status;
        }
        const matches = err.message.match(/.*(\d+)$/);
        if (matches && matches.length > 0) {
            return Number.parseInt(matches[1], 10);
        }
        return 200;
    }
    isUnauthorized(err) {
        if (this.getCode(err) === 401) {
            return true;
        }
        return false;
    }
}
const singleton = new Rest();
export { singleton as Rest };
