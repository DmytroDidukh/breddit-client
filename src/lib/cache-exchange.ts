import { cacheExchange } from '@urql/exchange-graphcache';

import { ChangePasswordMutation, CreatePostMutation, SignUpMutation } from '@/graphql/mutations';
import { SignInMutation } from '@/graphql/mutations/sign-in.generated';
import { SignOutMutation } from '@/graphql/mutations/sign-out.generated';
import { PostsDocument, PostsQuery } from '@/graphql/queries';
import { MeDocument, MeQuery } from '@/graphql/queries/me.generated';
import { cursorPagination } from '@/lib/cursor-pagination';
import { cacheQueryUpdater } from '@/utils';

function createCacheExchange() {
    return cacheExchange({
        resolvers: {
            Query: {
                posts: cursorPagination({ mergeMode: 'before' }),
            },
        },
        updates: {
            Mutation: {
                signIn: (_result: SignInMutation, _, _cache) => {
                    cacheQueryUpdater<SignInMutation, MeQuery>(
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
                    cacheQueryUpdater<SignUpMutation, MeQuery>(
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
                    cacheQueryUpdater<SignOutMutation, MeQuery>(
                        _cache,
                        { query: MeDocument },
                        _result,
                        () => ({ me: null }),
                    );
                },
                changePassword: (_result: ChangePasswordMutation, _, _cache) => {
                    cacheQueryUpdater<ChangePasswordMutation, MeQuery>(
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
                    cacheQueryUpdater<CreatePostMutation, PostsQuery>(
                        _cache,
                        { query: PostsDocument },
                        _result,
                        (result, query) => {
                            if (result.createPost.errors) {
                                return query;
                            } else {
                                const newPost = result.createPost.post;
                                if (newPost) {
                                    return {
                                        __typename: 'Query',
                                        posts: [newPost, ...query.posts],
                                    };
                                }

                                return query;
                            }
                        },
                    );
                },
            },
        },
    });
}

export { createCacheExchange };
