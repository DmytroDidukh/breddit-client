import { gql, useQuery, UseQueryArgs } from '@urql/next';

import { RegularUserFragmentDoc } from '../fragments/regular-user.generated';
import * as Types from '../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
    __typename?: 'Query';
    me?: {
        __typename?: 'User';
        id: number;
        username: string;
        email: string;
        createdAt: any;
        updatedAt: any;
    } | null;
};

export const MeDocument = gql`
    query Me {
        me {
            ...RegularUser
        }
    }
    ${RegularUserFragmentDoc}
`;

export function useMeQuery(options?: Omit<UseQueryArgs<MeQueryVariables>, 'query'>) {
    return useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
}
