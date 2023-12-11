import gql from 'graphql-tag';
import * as Urql from 'urql';

import { RegularUserFragmentDoc } from '../fragments/regular-user.generated';
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
            username: string;
            createdAt: any;
            updatedAt: any;
        } | null;
        errors?: Array<{ __typename?: 'AuthenticationError'; message: string }> | null;
    };
};

export const SignInDocument = gql`
    mutation SignIn($user: SignInInput!) {
        signIn(user: $user) {
            user {
                ...RegularUser
            }
            errors {
                message
            }
        }
    }
    ${RegularUserFragmentDoc}
`;

export function useSignInMutation() {
    return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
}
