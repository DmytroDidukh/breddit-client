import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
            id
            createdAt
            updatedAt
            title
        }
    }
`;

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
    return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
}
