import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../../gql/graphql';
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
            createdAt: any;
            updatedAt: any;
            username: string;
        } | null;
        errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    };
};

export const SignUpDocument = gql`
    mutation SignUp($user: SignUpInput!) {
        signUp(user: $user) {
            user {
                id
                createdAt
                updatedAt
                username
            }
            errors {
                field
                message
            }
        }
    }
`;

export function useSignUpMutation() {
    return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
}
