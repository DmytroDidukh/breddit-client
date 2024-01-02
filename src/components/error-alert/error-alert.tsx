import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { CombinedError } from '@urql/core';
import { GraphQLFormattedError } from 'graphql/error';
import React from 'react';

import { formatGraphQLError } from '@/utils';

interface ErrorAlertProps {
    error: Error | CombinedError | GraphQLFormattedError | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error = null }) => {
    if (!error) return null;

    return (
        <Alert status="error" borderRadius={8}>
            <AlertIcon />
            <AlertTitle as={'span'}>{formatGraphQLError(error.message)}</AlertTitle>
        </Alert>
    );
};

export default ErrorAlert;
