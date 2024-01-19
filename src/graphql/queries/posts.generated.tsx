import { gql, useQuery, UseQueryArgs } from '@urql/next';

import {
    PageInfoBasicFragmentDoc,
    PostBasicSnippetFragmentDoc,
    UserBasicPublicFragmentDoc,
} from '../fragments';
import * as Types from '../types';
export type PostsQueryVariables = Types.Exact<{
    limit: Types.Scalars['Int']['input'];
    cursor?: Types.InputMaybe<Types.Scalars['DateTimeISO']['input']>;
}>;

export type PostsQuery = {
    __typename?: 'Query';
    posts: {
        __typename?: 'PostsResult';
        items: Array<{
            __typename?: 'Post';
            id: number;
            title: string;
            contentSnippet: string;
            points: number;
            createdAt: any;
            updatedAt: any;
            author: {
                __typename?: 'User';
                id: number;
                username: string;
                createdAt: any;
                updatedAt: any;
            };
        }>;
        pageInfo: {
            __typename?: 'PageInfo';
            startCursor?: string | null;
            endCursor?: string | null;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    };
};

export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: DateTimeISO) {
        posts(limit: $limit, cursor: $cursor) {
            items {
                ...PostBasicSnippet
                author {
                    ...UserBasicPublic
                }
            }
            pageInfo {
                ...PageInfoBasic
            }
        }
    }
    ${PostBasicSnippetFragmentDoc}
    ${UserBasicPublicFragmentDoc}
    ${PageInfoBasicFragmentDoc}
`;

export function usePostsQuery(options: Omit<UseQueryArgs<PostsQueryVariables>, 'query'>) {
    return useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
}
