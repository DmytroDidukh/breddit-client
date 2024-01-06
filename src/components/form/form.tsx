import { Button, Flex, ResponsiveValue } from '@chakra-ui/react';
import { CombinedError } from '@urql/core';
import { Property } from 'csstype';
import { Form as FormikForm, FormikHandlers } from 'formik';
import { FormikState } from 'formik/dist/types';
import { GraphQLFormattedError } from 'graphql/error';
import React from 'react';

import styles from './form.module.scss';

import { ErrorAlert } from '../index';

interface FormProps<T> {
    formState: FormikState<T> & FormikHandlers;
    error: Error | CombinedError | GraphQLFormattedError | null;
    submitLabel: string;
    cancelLabel?: string;
    submitBtnWidth?: string;
    showCancelAction?: boolean;
    actionsAlignment?: ResponsiveValue<Property.JustifyContent>;
    onCancel?: () => void;
    children: React.ReactNode;
}

const Form = <T,>({
    error,
    formState,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    submitBtnWidth = '100%',
    showCancelAction = true,
    actionsAlignment = 'center',
    onCancel,
    children,
}: FormProps<T>) => {
    const { isSubmitting } = formState;

    return (
        <FormikForm className={styles.root}>
            {children}
            <Flex justifyContent={actionsAlignment} gap={'12px'}>
                {showCancelAction && (
                    <Button colorScheme="gray" variant={'outline'} onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                )}
                <Button
                    width={submitBtnWidth}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    {submitLabel}
                </Button>
            </Flex>
            <ErrorAlert error={error} />
        </FormikForm>
    );
};

export default Form;
