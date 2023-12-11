import gql from 'graphql-tag';
import * as Urql from 'urql';

import { RegularUserFragmentDoc } from '../fragments/regular-user.generated';
import * as Types from '../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
                ...RegularUser
            }
            errors {
                field
                message
            }
        }
    }
    ${RegularUserFragmentDoc}
`;

export function useSignUpMutation() {
    return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
}
