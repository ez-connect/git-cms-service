export interface GitHubQueryParams {
    state?: 'open' | 'closed' | 'all';
    creator?: string;
    labels?: string;
    sort?: 'created' | 'updated';
    direction?: 'asc' | 'desc';
    since?: string;
    per_page?: number;
    page?: number;
}
export interface GitLabQueryParams {
    state?: 'opened' | 'closed' | 'all';
    author_username?: string;
    labels?: string;
    sort?: 'asc' | 'desc';
    order_by?: 'created_at' | 'updated_at';
    updated_after?: string;
    per_page?: number;
    page?: number;
}
export interface QueryParams {
    state?: 'opened' | 'closed' | 'all';
    author?: string;
    labels?: string;
    sort?: 'created' | 'updated';
    order?: 'asc' | 'desc';
    since?: string;
    size?: number;
    page?: number;
}
