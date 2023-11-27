'use client';

import { Box, Button, Link as ChakraLink, Heading, Text } from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import Link from 'next/link';
import React from 'react';
import { useMutation } from 'urql';

import { FormField, Page } from '@/components';
import { SIGN_UP_MUTATION } from '@/graphql/mutations';

import styles from './page.module.scss';

interface ISignUpProps {}

interface IFormValues {
  username: string;
  password: string;
}

const initialValues: IFormValues = {
  username: '',
  password: '',
};

const SignUp: React.FC<ISignUpProps> = () => {
  const [result, executeMutation] = useMutation(SIGN_UP_MUTATION);

  const validate = (values: IFormValues) => {
    const errors: FormikErrors<IFormValues> = {};
    if (!values.username.trim()) {
      errors.username = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  const handleSubmit = async (values: IFormValues) => {
    console.log('SUBMIT', values);
    const { data } = await executeMutation({ user: values });
    console.log('data', data);
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
          {({ isSubmitting }: FormikState<IFormValues> & FormikHandlers) => (
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
                Sign Up
              </Button>
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
