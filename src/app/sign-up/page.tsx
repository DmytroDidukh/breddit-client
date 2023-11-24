'use client';
import { Box, Button, Link as ChakraLink, Heading, Text } from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import Link from 'next/link';
import React from 'react';

import { FormField, Page } from '@/components';

import styles from './page.module.scss';

interface SignUpProps {}

interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: '',
  password: '',
};

const SignUp: React.FC<SignUpProps> = () => {
  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.username.trim()) {
      errors.username = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
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
        <Heading textAlign={'center'}>Sign Up</Heading>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values) => {
            console.log('SUBMIT', values);
          }}
        >
          {({ isSubmitting }: FormikState<FormValues> & FormikHandlers) => (
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
                Submit
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
