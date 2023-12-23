import { gql, useMutation } from '@urql/next';

import * as Types from '../types';
export type ChangePasswordMutationVariables = Types.Exact<{
    options: Types.ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
    __typename?: 'Mutation';
    changePassword: {
        __typename?: 'ChangePasswordResult';
        errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
        user?: {
            __typename?: 'User';
            id: number;
            createdAt: any;
            updatedAt: any;
            username: string;
            email: string;
        } | null;
    };
};

export const ChangePasswordDocument = gql`
    mutation ChangePassword($options: ChangePasswordInput!) {
        changePassword(options: $options) {
            errors {
                field
                message
            }
            user {
                id
                createdAt
                updatedAt
                username
                email
            }
        }
    }
`;

export function useChangePasswordMutation() {
    return useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
        ChangePasswordDocument,
    );
}
