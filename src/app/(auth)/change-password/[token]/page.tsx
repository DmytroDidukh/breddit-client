'use client';

import { Box } from '@chakra-ui/react';
import { Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import { GraphQLFormattedError } from 'graphql/error';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Form, FormField, Page } from '@/components';
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
                alignItems={'center'}
                flexDirection={'column'}
                width={'500px'}
                margin={'0 auto'}
                flex={'1'}
            >
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {(formState: FormikState<ChangePasswordClientInput> & FormikHandlers) => (
                        <Form
                            formState={formState}
                            error={globalError}
                            submitLabel={'Change Password'}
                            showCancelAction={false}
                        >
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
                        </Form>
                    )}
                </Formik>
            </Box>
        </Page>
    );
};

export default ChangePassword;
