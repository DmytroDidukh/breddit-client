import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MutationMutationVariables = Types.Exact<{ [key: string]: never }>;

export type MutationMutation = { __typename?: 'Mutation'; signOut: boolean };

export const MutationDocument = gql`
    mutation Mutation {
        signOut
    }
`;

export function useMutationMutation() {
    return Urql.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument);
}
