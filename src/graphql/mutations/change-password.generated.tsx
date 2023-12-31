import { gql, useMutation } from '@urql/next';

import { UserBasicFragmentDoc } from '../fragments/user-basic.generated';
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
            username: string;
            email: string;
            createdAt: any;
            updatedAt: any;
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
                ...UserBasic
            }
        }
    }
    ${UserBasicFragmentDoc}
`;

export function useChangePasswordMutation() {
    return useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
        ChangePasswordDocument,
    );
}
