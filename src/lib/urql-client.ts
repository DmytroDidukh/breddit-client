import { createClient, fetchExchange, ssrExchange } from '@urql/next';

import { getCacheExchange } from './cache';

export function createUrqlClient() {
    const ssr = ssrExchange();
    const cacheExchange = getCacheExchange();
    const client = createClient({
        url: 'http://localhost:4000/graphql',
        exchanges: [cacheExchange, ssr, fetchExchange],
        suspense: false,
        fetchOptions: {
            credentials: 'include',
        },
    });

    return {
        client,
        ssr,
    };
}
