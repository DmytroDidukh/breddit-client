'use client';

import { Alert, AlertIcon, AlertTitle, Box, Button, Heading } from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikHelpers, FormikState } from 'formik/dist/types';
import { GraphQLFormattedError } from 'graphql/error';
import { useRouter } from 'next/navigation';
import React from 'react';

import { FormField, FormTextarea, Page } from '@/components';
import { Routes } from '@/consts';
import { useCreatePostMutation } from '@/graphql/mutations';
import { CreatePostInput } from '@/graphql/types';
import { Mapper } from '@/utils';

import styles from './page.module.scss';

interface CreatePostProps {}

const initialValues: CreatePostInput = {
    title: '',
    content: '',
};

const CreatePost: React.FC<CreatePostProps> = () => {
    const [globalError, setGlobalError] = React.useState<GraphQLFormattedError | null>(null);
    const [, executeCreatePost] = useCreatePostMutation();
    const router = useRouter();

    const validate = (values: CreatePostInput) => {
        const errors: FormikErrors<CreatePostInput> = {};
        if (!values.title.trim()) {
            errors.title = 'Required';
        }

        if (!values.content) {
            errors.content = 'Required';
        }
        return errors;
    };

    const handleSubmit = async (
        values: CreatePostInput,
        { setErrors }: FormikHelpers<CreatePostInput>,
    ) => {
        setGlobalError(null);
        const { data, error } = await executeCreatePost({ post: values });

        if (data?.createPost.post) {
            router.push(Routes.HOME);
            return;
        } else if (data?.createPost.errors) {
            setErrors(Mapper.toFormError(data.createPost.errors));
            return;
        }

        if (error) {
            setGlobalError(error);
        }
    };
    return (
        <Page>
            <Box
                display={'flex'}
                justifyContent={'start'}
                alignItems={'stretch'}
                flexDirection={'column'}
                width={'80%'}
                height={'100%'}
                margin={'0 auto'}
            >
                <Heading textAlign={'center'}>New Post:</Heading>
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {({ isSubmitting }: FormikState<CreatePostInput> & FormikHandlers) => (
                        <Form className={styles.form}>
                            <FormField
                                id={'title'}
                                name="title"
                                label="Title"
                                placeholder="Enter post title"
                            />
                            <FormTextarea
                                id={'content'}
                                name="content"
                                label="Content"
                                placeholder="What is post about?"
                                height={'500px'}
                            />
                            <Button
                                width={'300px'}
                                mt={4}
                                ml={'auto'}
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Create
                            </Button>
                            {globalError && (
                                <Alert status="error" borderRadius={8}>
                                    <AlertIcon />
                                    <AlertTitle as={'span'}>{globalError.message}</AlertTitle>
                                </Alert>
                            )}
                        </Form>
                    )}
                </Formik>
            </Box>
        </Page>
    );
};

export default CreatePost;
