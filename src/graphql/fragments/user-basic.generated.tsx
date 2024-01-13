import { gql } from '@urql/next';

export type UserBasicFragment = {
    __typename?: 'User';
    id: number;
    username: string;
    email: string;
    createdAt: any;
    updatedAt: any;
};

export type UserBasicPrivateFragment = {
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
export const UserBasicPrivateFragmentDoc = gql`
    fragment UserBasicPrivate on User {
        id
        username
        createdAt
        updatedAt
    }
`;
