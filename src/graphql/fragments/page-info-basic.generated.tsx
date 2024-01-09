import { gql } from '@urql/next';

export type PageInfoBasicFragment = {
    __typename?: 'PageInfo';
    startCursor?: string | null;
    endCursor?: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export const PageInfoBasicFragmentDoc = gql`
    fragment PageInfoBasic on PageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
    }
`;
