'use client';
import { Button } from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import React from 'react';

import { FormField, Page } from '@/components';

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
      Register
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          console.log('SUBMIT', values);
        }}
      >
        {({ isSubmitting }: FormikState<FormValues> & FormikHandlers) => (
          <Form>
            <FormField<FormValues>
              id={'username'}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            <FormField<FormValues>
              id={'password'}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={'password'}
            />
            <Button width={'100%'} mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default SignUp;
