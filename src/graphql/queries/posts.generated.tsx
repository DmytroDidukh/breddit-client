import { gql, useQuery, UseQueryArgs } from '@urql/next';

import * as Types from '../types';
export type PostsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PostsQuery = {
    __typename?: 'Query';
    posts: Array<{
        __typename?: 'Post';
        id: number;
        createdAt: any;
        updatedAt: any;
        title: string;
    }>;
};

export const PostsDocument = gql`
    query Posts {
        posts {
            ...PostBasic
        }
    }
`;

export function usePostsQuery(options?: Omit<UseQueryArgs<PostsQueryVariables>, 'query'>) {
    return useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
}
