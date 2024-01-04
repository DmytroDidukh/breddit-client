'use client';

import { Box, Link as ChakraLink, Flex, Heading, Text } from '@chakra-ui/react';
import { Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import Link from 'next/link';
import React from 'react';

import { Form, FormField, InfoAlert, Page } from '@/components';
import { Routes } from '@/consts';
import { useForgotPasswordMutation } from '@/graphql/mutations';

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
                alignItems={'center'}
                flexDirection={'column'}
                width={'500px'}
                margin={'0 auto'}
                flex={'1'}
            >
                <Heading textAlign={'center'}>Reset Password</Heading>
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {(formState: FormikState<ForgotPasswordInput> & FormikHandlers) => (
                        <Flex flexDirection={'column'} gap={'12px'} width={'100%'}>
                            <Form
                                formState={formState}
                                error={null}
                                submitLabel={'Send'}
                                showCancelAction={false}
                            >
                                <FormField
                                    id={'email'}
                                    name="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    type={'email'}
                                />
                            </Form>
                            <InfoAlert
                                message={'Email with the instructions sent.'}
                                show={showHint}
                            />
                        </Flex>
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
