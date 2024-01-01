import { RequestCookie } from '@edge-runtime/cookies';
import { createClient, fetchExchange, ssrExchange } from '@urql/next';

import { isServerSide, Mapper } from '@/utils';

import { createCacheExchange } from './cache-exchange';

export function createUrqlClient(cookies: RequestCookie[]) {
    const ssr = ssrExchange({
        isClient: !isServerSide(),
    });
    const cacheExchange = createCacheExchange();
    // TODO: Uncomment this when we have a way to redirect to sign in page from server side
    // const errorExchange = createErrorExchange();

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
