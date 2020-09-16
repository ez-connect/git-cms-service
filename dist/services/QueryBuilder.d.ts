import { GitHubQueryParams, GitLabQueryParams, QueryParams } from './query';
declare class QueryBuilder {
    getGitHub(params?: QueryParams): GitHubQueryParams;
    getGitLab(params?: QueryParams): GitLabQueryParams;
}
declare const singleton: QueryBuilder;
export { singleton as QueryBuilder };
