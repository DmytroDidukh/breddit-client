import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';

import { SignUpMutation } from '@/graphql/mutations';
import { SignInMutation } from '@/graphql/mutations/sign-in.generated';
import { MeDocument, MeQuery } from '@/graphql/queries/me.generated';

function betterUpdateQuery<Result, Query>(
    cache: Cache,
    query: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query,
) {
    return cache.updateQuery(query, (data) => fn(result, data as any) as any);
}

function getCacheExchange() {
    return cacheExchange({
        updates: {
            Mutation: {
                signIn: (_result: SignInMutation, _, _cache) => {
                    betterUpdateQuery<SignInMutation, MeQuery>(
                        _cache,
                        { query: MeDocument },
                        _result,
                        (result, query) => {
                            if (result.signIn.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.signIn.user,
                                };
                            }
                        },
                    );
                },
                signUp: (_result: SignUpMutation, _, _cache) => {
                    betterUpdateQuery<SignUpMutation, MeQuery>(
                        _cache,
                        { query: MeDocument },
                        _result,
                        (result, query) => {
                            if (result.signUp.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.signUp.user,
                                };
                            }
                        },
                    );
                },
            },
        },
    });
}

export { getCacheExchange };
