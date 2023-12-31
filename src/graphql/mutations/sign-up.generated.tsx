import { gql, useMutation } from '@urql/next';

import { UserBasicFragmentDoc } from '../fragments/user-basic.generated';
import * as Types from '../types';
export type SignUpMutationVariables = Types.Exact<{
    user: Types.SignUpInput;
}>;

export type SignUpMutation = {
    __typename?: 'Mutation';
    signUp: {
        __typename?: 'SignUpResult';
        user?: {
            __typename?: 'User';
            id: number;
            username: string;
            email: string;
            createdAt: any;
            updatedAt: any;
        } | null;
        errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    };
};

export const SignUpDocument = gql`
    mutation SignUp($user: SignUpInput!) {
        signUp(user: $user) {
            user {
                ...UserBasic
            }
            errors {
                field
                message
            }
        }
    }
    ${UserBasicFragmentDoc}
`;

export function useSignUpMutation() {
    return useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
}
