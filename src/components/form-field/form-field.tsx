'use client';

import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}
// TODO: Fix console error
// app-index.js:32 Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed
const FormField = ({ id, name, label, placeholder, type = 'text' }: FormFieldProps) => {
    const [show, setShow] = React.useState(false);
    const [field, { error, touched }] = useField(name);

    const handleClick = () => setShow(!show);

    return (
        <Field name={name}>
            {() => (
                <FormControl isInvalid={!!error && touched}>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <InputGroup size="md">
                        <Input
                            {...field}
                            id={id}
                            placeholder={placeholder}
                            type={show ? 'text' : type}
                        />
                        {type === 'password' && (
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        )}
                    </InputGroup>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};

export default FormField;
