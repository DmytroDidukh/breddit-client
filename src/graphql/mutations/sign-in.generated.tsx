import { gql, useMutation } from '@urql/next';

import { UserBasicFragmentDoc } from '../fragments/user-basic.generated';
import * as Types from '../types';
export type SignInMutationVariables = Types.Exact<{
    user: Types.SignInInput;
}>;

export type SignInMutation = {
    __typename?: 'Mutation';
    signIn: {
        __typename?: 'User';
        id: number;
        username: string;
        email: string;
        createdAt: any;
        updatedAt: any;
    };
};

export const SignInDocument = gql`
    mutation SignIn($user: SignInInput!) {
        signIn(user: $user) {
            ...UserBasic
        }
    }
    ${UserBasicFragmentDoc}
`;

export function useSignInMutation() {
    return useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
}
