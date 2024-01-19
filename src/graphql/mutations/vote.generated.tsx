import { gql, useMutation } from '@urql/next';

import * as Types from '../types';

export type VoteMutationVariables = Types.Exact<{
    postId: Types.Scalars['Int']['input'];
    value: Types.Scalars['Int']['input'];
}>;

export type VoteMutation = { __typename?: 'Mutation'; vote: boolean };

export const VoteDocument = gql`
    mutation Vote($postId: Int!, $value: Int!) {
        vote(postId: $postId, value: $value)
    }
`;

export function useVoteMutation() {
    return useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
}
