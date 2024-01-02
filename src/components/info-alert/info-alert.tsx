import { InfoIcon } from '@chakra-ui/icons';
import { Alert, AlertTitle } from '@chakra-ui/react';
import React from 'react';

interface ErrorAlertProps {
    message: string;
    show: boolean;
}

const InfoAlert: React.FC<ErrorAlertProps> = ({ message, show }) => {
    if (!show) return null;

    return (
        <Alert status="info" borderRadius={8}>
            <InfoIcon />
            <AlertTitle as={'span'}>{message}</AlertTitle>
        </Alert>
    );
};

export default InfoAlert;
