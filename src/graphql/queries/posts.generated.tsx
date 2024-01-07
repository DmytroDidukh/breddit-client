import { gql, useQuery, UseQueryArgs } from '@urql/next';

import { PostBasicFragmentDoc } from '../fragments/post-basic.generated';
import { UserBasicFragmentDoc } from '../fragments/user-basic.generated';
import * as Types from '../types';

export type PostsQueryVariables = Types.Exact<{
    limit: Types.Scalars['Int']['input'];
    cursor?: Types.InputMaybe<Types.Scalars['DateTimeISO']['input']>;
}>;

export type PostsQuery = {
    __typename?: 'Query';
    posts: Array<{
        __typename?: 'Post';
        id: number;
        title: string;
        content: string;
        points: number;
        createdAt: any;
        updatedAt: any;
        author: {
            __typename?: 'User';
            id: number;
            username: string;
            email: string;
            createdAt: any;
            updatedAt: any;
        };
    }>;
};

export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: DateTimeISO) {
        posts(limit: $limit, cursor: $cursor) {
            ...PostBasic
            author {
                ...UserBasic
            }
        }
    }
    ${PostBasicFragmentDoc}
    ${UserBasicFragmentDoc}
`;

export function usePostsQuery(options: Omit<UseQueryArgs<PostsQueryVariables>, 'query'>) {
    return useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
}
