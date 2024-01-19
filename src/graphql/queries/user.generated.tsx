import { gql, useQuery, UseQueryArgs } from '@urql/next';

import { UserBasicPublicFragmentDoc } from '../fragments';
import * as Types from '../types';

export type UserQueryVariables = Types.Exact<{
    userId: Types.Scalars['Int']['input'];
}>;

export type UserQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        id: number;
        username: string;
        createdAt: any;
        updatedAt: any;
    } | null;
};

export const UserDocument = gql`
    query User($userId: Int!) {
        user(id: $userId) {
            ...UserBasicPublic
        }
    }
    ${UserBasicPublicFragmentDoc}
`;

export function useUserQuery(options: Omit<UseQueryArgs<UserQueryVariables>, 'query'>) {
    return useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
}
