class QueryBuilder {
    getGitHub(params) {
        const { state, author, labels, sort, order, since, size, page } = params;
        return {
            state: state === 'opened' ? 'open' : state,
            creator: author,
            labels,
            sort,
            direction: order,
            since,
            per_page: size,
            page,
        };
    }
    getGitLab(params) {
        const { state, author, labels, sort, order, since, size, page } = params;
        return {
            state: state,
            author_username: author,
            labels,
            sort: order,
            order_by: sort === 'updated'
                ? 'updated_at'
                : sort === 'created'
                    ? 'created_at'
                    : undefined,
            updated_after: since,
            per_page: size,
            page,
        };
    }
}
const singleton = new QueryBuilder();
export { singleton as QueryBuilder };
