import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';

import { ChangePasswordMutation, CreatePostMutation, SignUpMutation } from '@/graphql/mutations';
import { SignInMutation } from '@/graphql/mutations/sign-in.generated';
import { SignOutMutation } from '@/graphql/mutations/sign-out.generated';
import { PostsDocument, PostsQuery } from '@/graphql/queries';
import { MeDocument, MeQuery } from '@/graphql/queries/me.generated';

function betterUpdateQuery<Result, Query>(
    cache: Cache,
    query: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query,
) {
    return cache.updateQuery(query, (data) => fn(result, data as any) as any);
}

function createCacheExchange() {
    return cacheExchange({
        updates: {
            Mutation: {
                signIn: (_result: SignInMutation, _, _cache) => {
                    betterUpdateQuery<SignInMutation, MeQuery>(
                        _cache,
                        { query: MeDocument },
                        _result,
                        (result, query) => {
                            if (result.signIn) {
                                return {
                                    me: result.signIn,
                                };
                            }

                            return query;
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
                signOut: (_result: SignOutMutation, _, _cache) => {
                    betterUpdateQuery<SignOutMutation, MeQuery>(
                        _cache,
                        { query: MeDocument },
                        _result,
                        () => ({ me: null }),
                    );
                },
                changePassword: (_result: ChangePasswordMutation, _, _cache) => {
                    betterUpdateQuery<ChangePasswordMutation, MeQuery>(
                        _cache,
                        { query: MeDocument },
                        _result,
                        (result, query) => {
                            if (result.changePassword.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.changePassword.user,
                                };
                            }
                        },
                    );
                },
                createPost: (_result: CreatePostMutation, _, _cache) => {
                    // _cache.invalidate('Posts', 'posts',
                    betterUpdateQuery<CreatePostMutation, PostsQuery>(
                        _cache,
                        { query: PostsDocument },
                        _result,
                        (result, query) => {
                            if (result.createPost.errors) {
                                return query;
                            } else {
                                console.log('createPost');
                                console.log(result.createPost.post);
                                console.log([...query.posts, result.createPost.post]);
                                return {
                                    posts: [...query.posts, result.createPost.post],
                                };
                            }
                        },
                    );
                },
            },
        },
    });
}

export { createCacheExchange };
