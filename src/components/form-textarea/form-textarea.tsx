'use client';

import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';

interface FormTextareaProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    height?: string;
}
// TODO: Fix console error
// app-index.js:32 Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed
const FormTextarea = ({
    id,
    name,
    label,
    placeholder,
    resize = 'none',
    height = '100%',
}: FormTextareaProps) => {
    const [field, { error, touched }] = useField(name);

    return (
        <Field name={name}>
            {() => (
                <FormControl isInvalid={!!error && touched}>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <Textarea
                        {...field}
                        id={id}
                        placeholder={placeholder}
                        resize={resize}
                        height={height}
                    />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};

export default FormTextarea;
