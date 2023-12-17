import { gql, useMutation } from '@urql/next';

import * as Types from '../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SignOutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation'; signOut: boolean };

export const SignOutDocument = gql`
    mutation SignOut {
        signOut
    }
`;

export function useSignOutMutation() {
    return useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument);
}
