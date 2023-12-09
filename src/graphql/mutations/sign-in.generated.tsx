import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SignInMutationVariables = Types.Exact<{
    user: Types.SignInInput;
}>;

export type SignInMutation = {
    __typename?: 'Mutation';
    signIn: {
        __typename?: 'SignInResult';
        user?: {
            __typename?: 'User';
            id: number;
            createdAt: any;
            updatedAt: any;
            username: string;
        } | null;
        errors?: Array<{ __typename?: 'AuthenticationError'; message: string }> | null;
    };
};

export const SignInDocument = gql`
    mutation SignIn($user: SignInInput!) {
        signIn(user: $user) {
            user {
                id
                createdAt
                updatedAt
                username
            }
            errors {
                message
            }
        }
    }
`;

export function useSignInMutation() {
    return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
}
