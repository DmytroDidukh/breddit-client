import { gql } from '@urql/core';

export const SIGN_UP_MUTATION = gql`
    mutation SignUp($user: SignUpInput!) {
        signUp(user: $user) {
            user {
                id
                updatedAt
                username
                createdAt
            }
            errors {
                field
                message
            }
        }
    }
`;
