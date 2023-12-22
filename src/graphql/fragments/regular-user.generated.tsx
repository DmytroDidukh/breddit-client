import { gql } from '@urql/next';

export type RegularUserFragment = {
    __typename?: 'User';
    id: number;
    username: string;
    email: string;
    createdAt: any;
    updatedAt: any;
};

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
        id
        username
        email
        createdAt
        updatedAt
    }
`;
