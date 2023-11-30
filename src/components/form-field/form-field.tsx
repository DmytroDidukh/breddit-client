'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}
// TODO: Fix console error
// app-index.js:32 Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed
const FormField = ({ id, name, label, placeholder, type = 'text' }: FormFieldProps) => {
    const [field, { error, touched }] = useField(name);

    return (
        <Field name={name}>
            {() => (
                <FormControl isInvalid={!!error && touched}>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <Input {...field} id={id} placeholder={placeholder} type={type} />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};

export default FormField;
