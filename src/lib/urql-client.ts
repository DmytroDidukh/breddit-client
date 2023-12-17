import { RequestCookie } from '@edge-runtime/cookies';
import { createClient, fetchExchange, ssrExchange } from '@urql/next';

import { Mapper } from '@/utils';

import { getCacheExchange } from './cache';

export function createUrqlClient(cookies: RequestCookie[]) {
    const ssr = ssrExchange();
    const cacheExchange = getCacheExchange();
    const client = createClient({
        url: 'http://localhost:4000/graphql',
        exchanges: [cacheExchange, ssr, fetchExchange],
        suspense: true,
        fetchOptions: () => {
            const cookieString = Mapper.toCookieString(cookies);
            return {
                credentials: 'include',
                headers: {
                    cookie: cookieString,
                },
            };
        },
    });

    return {
        client,
        ssr,
    };
}
