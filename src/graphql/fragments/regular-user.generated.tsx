import gql from 'graphql-tag';

export type RegularUserFragment = {
    __typename?: 'User';
    id: number;
    username: string;
    createdAt: any;
    updatedAt: any;
};

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
        id
        username
        createdAt
        updatedAt
    }
`;
