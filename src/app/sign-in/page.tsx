'use client';

import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Link as ChakraLink,
    Heading,
    Text,
} from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import { GraphQLFormattedError } from 'graphql/error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { FormField, Page } from '@/components';
import { Routes } from '@/consts';
import { useSignInMutation } from '@/graphql/mutations/sign-in.generated';
import { AuthenticationError, SignInInput } from '@/graphql/types';

import styles from './page.module.scss';

interface SignInProps {}

const initialValues: SignInInput = {
    username: '',
    password: '',
};

const SignIn: React.FC<SignInProps> = () => {
    const [globalError, setGlobalError] = React.useState<
        GraphQLFormattedError | AuthenticationError | null
    >(null);
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

        if (data?.signIn.user) {
            router.push(Routes.HOME);
            return;
        }

        if (data?.signIn.errors) {
            setGlobalError(data.signIn.errors[0]);
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
                            {globalError && (
                                <Alert status="error" borderRadius={8}>
                                    <AlertIcon />
                                    <AlertTitle as={'span'}>{globalError.message}</AlertTitle>
                                </Alert>
                            )}
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
            </Box>
        </Page>
    );
};

export default SignIn;
