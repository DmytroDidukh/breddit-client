import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
    __typename?: 'Query';
    me?: {
        __typename?: 'User';
        id: number;
        createdAt: any;
        updatedAt: any;
        username: string;
    } | null;
};

export const MeDocument = gql`
    query Me {
        me {
            id
            createdAt
            updatedAt
            username
        }
    }
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
    return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
}
