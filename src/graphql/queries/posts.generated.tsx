import { gql, useQuery, UseQueryArgs } from '@urql/next';

import { PostBasicSnippetFragmentDoc } from '../fragments/post-basic.generated';
import { UserBasicFragmentDoc } from '../fragments/user-basic.generated';
import * as Types from '../types';

export type PostsQueryVariables = Types.Exact<{
    cursor?: Types.InputMaybe<Types.Scalars['DateTimeISO']['input']>;
    limit: Types.Scalars['Int']['input'];
}>;

export type PostsQuery = {
    __typename?: 'Query';
    posts: Array<{
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
            email: string;
            createdAt: any;
            updatedAt: any;
        };
    }>;
};

export const PostsDocument = gql`
    query Posts($cursor: DateTimeISO, $limit: Int!) {
        posts(cursor: $cursor, limit: $limit) {
            ...PostBasicSnippet
            author {
                ...UserBasic
            }
        }
    }
    ${PostBasicSnippetFragmentDoc}
    ${UserBasicFragmentDoc}
`;

export function usePostsQuery(options: Omit<UseQueryArgs<PostsQueryVariables>, 'query'>) {
    return useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
}
