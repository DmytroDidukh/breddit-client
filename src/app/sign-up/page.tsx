'use client';

import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Link as ChakraLink,
    Heading,
    Text,
} from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikHelpers, FormikState } from 'formik/dist/types';
import Link from 'next/link';
import React from 'react';

import { FormField, Page } from '@/components';
import { useSignUpMutation } from '@/graphql/mutations';
import { SignUpInput } from '@/graphql/types';
import { mapService } from '@/utils';

import styles from './page.module.scss';

interface ISignUpProps {}

const initialValues: SignUpInput = {
    username: '',
    password: '',
};

const SignUp: React.FC<ISignUpProps> = () => {
    const [globalError, setGlobalError] = React.useState<Error | null>(null);
    const [result, executeSignUp] = useSignUpMutation();

    const validate = (values: SignUpInput) => {
        const errors: FormikErrors<SignUpInput> = {};
        if (!values.username.trim()) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    };

    const handleSubmit = async (values: SignUpInput, { setErrors }: FormikHelpers<SignUpInput>) => {
        setGlobalError(null);
        const { data, error } = await executeSignUp({ user: values });

        if (data?.signUp.errors?.length) {
            setErrors(mapService.toFormError(data.signUp.errors));
            return;
        }

        if (error) {
            setGlobalError(error);
        }
    };
    console.log('result', result);
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
                <Heading textAlign={'center'}>Welcome!</Heading>
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {({ isSubmitting }: FormikState<SignUpInput> & FormikHandlers) => (
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
                                Sign up
                            </Button>
                            {globalError && (
                                <Alert
                                    status="error"
                                    borderRadius={8}
                                    flexDirection={'column'}
                                    alignItems={'start'}
                                >
                                    <Box display={'inline-flex'} alignItems={'center'}>
                                        <AlertIcon />
                                        <AlertTitle as={'span'}>
                                            Something unexpected happen.
                                        </AlertTitle>
                                    </Box>
                                    <AlertDescription as={'span'} paddingLeft={'33px'}>
                                        {globalError.message}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </Form>
                    )}
                </Formik>
                <Text textAlign={'center'} mt={'10px'}>
                    Have an account? Please{' '}
                    <ChakraLink as={Link} href="/sign-in" color="teal.500">
                        sign-in
                    </ChakraLink>
                    .
                </Text>
            </Box>
        </Page>
    );
};

export default SignUp;
