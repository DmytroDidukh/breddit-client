import { gql } from '@urql/core';

import { type IUser } from '@/types';

interface ISignUpInput {
    username: string;
    password: string;
}

interface IFieldError {
    field: string;
    message: string;
}

interface ISignUpResult {
    signUp: {
        user: IUser | null;
        errors: IFieldError[];
    };
}

interface ISignUpVariables {
    user: ISignUpInput;
}

export const SIGN_UP_MUTATION = gql(`
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
`);

export type { ISignUpInput, IFieldError, ISignUpResult, ISignUpVariables };
