import { Cache, QueryInput } from '@urql/exchange-graphcache';

export const cacheQueryUpdater = <Result, Query>(
    cache: Cache,
    query: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query,
) => {
    return cache.updateQuery(query, (data) => fn(result, data as any) as any);
};
