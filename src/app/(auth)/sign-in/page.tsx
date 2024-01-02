'use client';

import { Box, Button, Link as ChakraLink, Heading, Text } from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import { GraphQLFormattedError } from 'graphql/error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ErrorAlert, FormField, Page } from '@/components';
import { Routes } from '@/consts';
import { useSignInMutation } from '@/graphql/mutations';
import { SignInInput } from '@/graphql/types';

import styles from './page.module.scss';

interface SignInProps {}

const initialValues: SignInInput = {
    username: '',
    password: '',
};

const SignIn: React.FC<SignInProps> = () => {
    const [globalError, setGlobalError] = React.useState<GraphQLFormattedError | null>(null);
    const [, executeSignIn] = useSignInMutation();
    const router = useRouter();

    const validate = (values: SignInInput) => {
        const errors: FormikErrors<SignInInput> = {};
        if (!values.username.trim()) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    };

    const handleSubmit = async (values: SignInInput) => {
        setGlobalError(null);
        const { data, error } = await executeSignIn({ user: values });

        if (error) {
            setGlobalError(error);
            return;
        }

        if (data?.signIn) {
            router.push(Routes.HOME);
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
                    {({ isSubmitting }: FormikState<SignInInput> & FormikHandlers) => (
                        <Form className={styles.form}>
                            <FormField
                                id={'username'}
                                name="username"
                                label="Username"
                                placeholder="Enter your username"
                            />
                            <FormField
                                id={'password'}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type={'password'}
                            />
                            <Button
                                width={'100%'}
                                mt={4}
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Sign in
                            </Button>
                            <ErrorAlert error={globalError} />
                        </Form>
                    )}
                </Formik>
                <Text textAlign={'center'} mt={'10px'}>
                    Haven&apos;t an account? Please{' '}
                    <ChakraLink as={Link} href={Routes.SIGN_UP} color="teal.500">
                        sign-up
                    </ChakraLink>
                    .
                </Text>
                <Text textAlign={'center'} mt={'10px'}>
                    <ChakraLink as={Link} href={Routes.FORGOT_PASSWORD} color="teal.500">
                        Forgot Password
                    </ChakraLink>
                </Text>
            </Box>
        </Page>
    );
};

export default SignIn;
