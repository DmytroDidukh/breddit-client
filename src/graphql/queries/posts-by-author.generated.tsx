import { gql, useQuery, UseQueryArgs } from '@urql/next';

import { PageInfoBasicFragmentDoc } from '../fragments/page-info-basic.generated';
import { PostBasicSnippetFragmentDoc } from '../fragments/post-basic.generated';
import * as Types from '../types';

export type PostsByAuthorQueryVariables = Types.Exact<{
    limit: Types.Scalars['Int']['input'];
    authorId: Types.Scalars['Int']['input'];
    cursor?: Types.InputMaybe<Types.Scalars['DateTimeISO']['input']>;
}>;

export type PostsByAuthorQuery = {
    __typename?: 'Query';
    postsByAuthor: {
        __typename?: 'PostsResult';
        items: Array<{
            __typename?: 'Post';
            id: number;
            title: string;
            contentSnippet: string;
            points: number;
            createdAt: any;
            updatedAt: any;
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

export const PostsByAuthorDocument = gql`
    query PostsByAuthor($limit: Int!, $authorId: Int!, $cursor: DateTimeISO) {
        postsByAuthor(limit: $limit, authorId: $authorId, cursor: $cursor) {
            items {
                ...PostBasicSnippet
            }
            pageInfo {
                ...PageInfoBasic
            }
        }
    }
    ${PostBasicSnippetFragmentDoc}
    ${PageInfoBasicFragmentDoc}
`;

export function usePostsByAuthorQuery(
    options: Omit<UseQueryArgs<PostsByAuthorQueryVariables>, 'query'>,
) {
    return useQuery<PostsByAuthorQuery, PostsByAuthorQueryVariables>({
        query: PostsByAuthorDocument,
        ...options,
    });
}
