import { gql, useMutation } from '@urql/next';

import { PostBasicSnippetFragmentDoc, UserBasicFragmentDoc } from '../fragments';
import * as Types from '../types';
export type CreatePostMutationVariables = Types.Exact<{
    post: Types.CreatePostInput;
}>;

export type CreatePostMutation = {
    __typename?: 'Mutation';
    createPost: {
        __typename?: 'CreatePostResult';
        post?: {
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
        } | null;
        errors?: Array<{ __typename?: 'FieldError'; message: string; field: string }> | null;
    };
};

export const CreatePostDocument = gql`
    mutation CreatePost($post: CreatePostInput!) {
        createPost(post: $post) {
            post {
                ...PostBasicSnippet
                author {
                    ...UserBasic
                }
            }
            errors {
                message
                field
            }
        }
    }
    ${PostBasicSnippetFragmentDoc}
    ${UserBasicFragmentDoc}
`;

export function useCreatePostMutation() {
    return useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
}
