import { gql, useMutation } from '@urql/next';

import * as Types from '../types';
export type ForgotPasswordMutationVariables = Types.Exact<{
    email: Types.Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword: boolean };

export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;

export function useForgotPasswordMutation() {
    return useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
        ForgotPasswordDocument,
    );
}
