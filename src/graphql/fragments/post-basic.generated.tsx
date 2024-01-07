import { gql } from '@urql/next';

export type PostBasicFragment = {
    __typename?: 'Post';
    id: number;
    title: string;
    content: string;
    points: number;
    createdAt: any;
    updatedAt: any;
};

export type PostBasicSnippetFragment = {
    __typename?: 'Post';
    id: number;
    title: string;
    contentSnippet: string;
    points: number;
    createdAt: any;
    updatedAt: any;
};

export const PostBasicFragmentDoc = gql`
    fragment PostBasic on Post {
        id
        title
        content
        points
        createdAt
        updatedAt
    }
`;
export const PostBasicSnippetFragmentDoc = gql`
    fragment PostBasicSnippet on Post {
        id
        title
        contentSnippet
        points
        createdAt
        updatedAt
    }
`;
