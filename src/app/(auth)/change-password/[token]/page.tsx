'use client';

import { Alert, AlertIcon, AlertTitle, Box, Button, Heading } from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import { GraphQLFormattedError } from 'graphql/error';
import { useRouter } from 'next/navigation';
import React from 'react';

import styles from '@/app/(auth)/sign-in/page.module.scss';
import { FormField, Page } from '@/components';
import { Routes } from '@/consts';
import { useChangePasswordMutation } from '@/graphql/mutations';
import { ChangePasswordInput } from '@/graphql/types';

interface ChangePasswordProps {
    params: {
        token: string;
    };
}

interface ChangePasswordClientInput extends Omit<ChangePasswordInput, 'token'> {
    confirmPassword: string;
}

const initialValues: ChangePasswordClientInput = {
    password: '',
    confirmPassword: '',
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ params }) => {
    const [globalError, setGlobalError] = React.useState<GraphQLFormattedError | null>(null);
    const [, executeChangePassword] = useChangePasswordMutation();
    const router = useRouter();

    const validate = (values: ChangePasswordClientInput) => {
        const errors: FormikErrors<ChangePasswordClientInput> = {};
        if (!values.password.trim()) {
            errors.password = 'Required';
        }

        if (!values.confirmPassword.trim()) {
            errors.confirmPassword = 'Required';
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleSubmit = async (values: ChangePasswordClientInput) => {
        setGlobalError(null);
        const { data, error } = await executeChangePassword({
            options: {
                password: values.password,
                token: params.token,
            },
        });

        if (error) {
            setGlobalError(error);
            return;
        }

        if (data?.changePassword.user) {
            router.push(Routes.HOME);
            return;
        }

        if (data?.changePassword.errors) {
            setGlobalError(data.changePassword.errors[0]);
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
                <Heading textAlign={'center'}>Sign In to Your Account</Heading>
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {({
                        isSubmitting,
                    }: FormikState<ChangePasswordClientInput> & FormikHandlers) => (
                        <Form className={styles.form}>
                            <FormField
                                id={'password'}
                                name="password"
                                label="New Password"
                                placeholder="Enter new password"
                                type={'password'}
                            />
                            <FormField
                                id={'confirmPassword'}
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Confirm new password"
                                type={'password'}
                            />
                            <Button
                                width={'100%'}
                                mt={4}
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Change Password
                            </Button>
                            {globalError && (
                                <Alert status="error" borderRadius={8}>
                                    <AlertIcon />
                                    <AlertTitle as={'span'}>{globalError.message}</AlertTitle>
                                </Alert>
                            )}
                        </Form>
                    )}
                </Formik>
            </Box>
        </Page>
    );
};

export default ChangePassword;
