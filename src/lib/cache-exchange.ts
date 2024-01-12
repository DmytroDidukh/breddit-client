import { cacheExchange } from '@urql/exchange-graphcache';

import {
    ChangePasswordMutation,
    CreatePostMutation,
    SignInMutation,
    SignOutMutation,
    SignUpMutation,
} from '@/graphql/mutations';
import { MeDocument, MeQuery } from '@/graphql/queries';
import { cacheQueryUpdater } from '@/utils';

import { cursorPagination } from './cursor-pagination';

function createCacheExchange() {
    return cacheExchange({
        keys: {
            PostsResult: () => null,
        },
        resolvers: {
            Query: {
                posts: cursorPagination({ mergeMode: 'after' }, 'PostsResult'),
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
                    const allFields = _cache.inspectFields('Query');
                    const fieldInfos = allFields.filter((info) => info.fieldName === 'posts');
                    fieldInfos.forEach((fi) => {
                        _cache.invalidate('Query', 'posts', fi.arguments || {});
                    });
                },
            },
        },
    });
}

export { createCacheExchange };
