import { gql } from '@urql/next';

export type UserBasicFragment = {
    __typename?: 'User';
    id: number;
    username: string;
    email: string;
    createdAt: any;
    updatedAt: any;
};

export type UserBasicPublicFragment = {
    __typename?: 'User';
    id: number;
    username: string;
    createdAt: any;
    updatedAt: any;
};

export const UserBasicFragmentDoc = gql`
    fragment UserBasic on User {
        id
        username
        email
        createdAt
        updatedAt
    }
`;
export const UserBasicPublicFragmentDoc = gql`
    fragment UserBasicPublic on User {
        id
        username
        createdAt
        updatedAt
    }
`;
