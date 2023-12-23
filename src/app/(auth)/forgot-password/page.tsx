'use client';

import { InfoIcon } from '@chakra-ui/icons';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Link as ChakraLink,
    Heading,
    Text,
} from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import Link from 'next/link';
import React from 'react';

import { FormField, Page } from '@/components';
import { Routes } from '@/consts';
import { useForgotPasswordMutation } from '@/graphql/mutations';

import styles from './page.module.scss';

interface ForgotPasswordProps {}

interface ForgotPasswordInput {
    email: string;
}

const initialValues: ForgotPasswordInput = {
    email: '',
};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const [showHint, setShowHint] = React.useState(false);
    const [, executeForgotPassword] = useForgotPasswordMutation();

    const validate = (values: ForgotPasswordInput) => {
        const errors: FormikErrors<ForgotPasswordInput> = {};
        if (!values.email.trim()) {
            errors.email = 'Required';
        }
        return errors;
    };

    const handleSubmit = async (values: ForgotPasswordInput) => {
        const { data } = await executeForgotPassword({ email: values.email });

        if (data?.forgotPassword) {
            setShowHint(true);
            return;
        }
    };

    return (
        <Page>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'stretch'}
                flexDirection={'column'}
                width={'500px'}
                height={'100%'}
                margin={'0 auto'}
            >
                <Heading textAlign={'center'}>Reset Password</Heading>
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {({ isSubmitting }: FormikState<ForgotPasswordInput> & FormikHandlers) => (
                        // TODO: Move this to a separate shared component
                        <Form className={styles.form}>
                            <FormField
                                id={'email'}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <Button
                                width={'100%'}
                                mt={4}
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Send
                            </Button>
                            {showHint && (
                                <Alert status="info" borderRadius={8}>
                                    <InfoIcon />
                                    <AlertTitle as={'span'}>
                                        Email with the instructions sent.
                                    </AlertTitle>
                                </Alert>
                            )}
                        </Form>
                    )}
                </Formik>
                <Text textAlign={'center'} mt={'10px'}>
                    Back to{' '}
                    <ChakraLink as={Link} href={Routes.SIGN_IN} color="teal.500">
                        sign-in
                    </ChakraLink>
                </Text>
            </Box>
        </Page>
    );
};

export default ForgotPassword;
