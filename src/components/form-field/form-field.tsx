'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface FormFieldProps<V> {
  id: string;
  name: Extract<keyof V, string>;
  label: string;
  placeholder: string;
  type?: string;
}
// TODO: Fix console error
// app-index.js:32 Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed
function FormField<V>({ id, name, label, placeholder, type = 'text' }: FormFieldProps<V>) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string, V>) => (
        <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <Input {...field} id={id} placeholder={placeholder} type={type} />
          <FormErrorMessage>{String(form.errors[name])}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default FormField;
