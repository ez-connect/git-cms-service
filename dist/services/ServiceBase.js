import { QueryBuilder } from './QueryBuilder';
import { Rest } from './Rest';
export class ServiceBase {
    constructor() {
        this.issue = {};
        this.labels = [];
    }
    init(value) {
        this.issue = {};
        this.labels = [];
        Rest.init(value.rest);
        this.config = value;
    }
    getSignInURL() {
        const { clientId, directUri } = this.config.authorization;
        const url = this.config.name === 'GitHub'
            ? `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${directUri}`
            : `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${directUri}&response_type=code&scope=profile`;
        return url;
    }
    async getAccessToken(code) {
        const { clientId, clientSecret, directUri } = this.config.authorization;
        const params = {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: directUri,
        };
        try {
            const res = await Rest.post('https://gitlab.com/oauth/token', undefined, { params });
            return res.access_token;
        }
        catch (err) {
            localStorage.setItem('error', JSON.stringify(err));
            throw err;
        }
    }
    async findOneUser(username) {
        return await Rest.get(`https://api.github.com/users/${username}`);
    }
    async findLabels() {
        const { name, rest } = this.config;
        if (name === 'GitLab' && !rest.auth) {
            throw Error('Authorization required');
        }
        if (this.labels.length === 0) {
            const items = await Rest.get('labels');
            this.labels = this._removeSpecificLabel(items);
        }
        return this.labels;
    }
    async findOneLabel(value) {
        const { name, rest } = this.config;
        if (name === 'GitLab' && !rest.auth) {
            return { name: value };
        }
        return Rest.get(`labels/${value}`);
    }
    async findIssues(params) {
        Object.assign(params, this.config.queryParams);
        const items = await Rest.get('/issues', {
            params: this._buildParams(params),
        });
        for (const e of items) {
            this._convertToGitHubIssue(e);
            e.labels = this._removeSpecificLabel(e.labels);
        }
        return items;
    }
    async findIssuesByLabel(value, params) {
        params = { ...params, labels: value.join(',') };
        Object.assign(params, this.config.queryParams);
        return this.findIssues(params);
    }
    async findOneIssue(number) {
        const item = await Rest.get(`/issues/${number}`);
        this._convertToGitHubIssue(item);
        item.labels = this._removeSpecificLabel(item.labels);
        return item;
    }
    async findOneIssuesByLabel(value) {
        if (!this.issue.hasOwnProperty(value)) {
            const items = await this.findIssuesByLabel([value]);
            if (items.length > 0) {
                const item = items[0];
                this.issue[value] = item;
            }
            else {
                throw Error(`Not found: ${value}`);
            }
        }
        return this.issue[value];
    }
    _buildParams(params) {
        return this.config.name === 'GitHub'
            ? QueryBuilder.getGitHub(params)
            : QueryBuilder.getGitLab(params);
    }
    _convertToGitHubIssue(value) {
        var _a;
        value.id = (_a = value.number) !== null && _a !== void 0 ? _a : value.iid;
        if (this.config.name === 'GitLab') {
            value.body = value.description;
            value.user = value.author;
            const names = value.labels;
            value.labels = names.map((name) => {
                return { name };
            });
            value.body = value.description.replaceAll('(/uploads/', `(${this.config.webBaseURL}/uploads/`);
        }
        return value;
    }
    _removeSpecificLabel(value) {
        return value.filter((e) => !this.config.labels.hasOwnProperty(e.name));
    }
}
