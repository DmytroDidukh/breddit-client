'use client';

import { Box, Heading } from '@chakra-ui/react';
import { Formik, FormikErrors, FormikHandlers } from 'formik';
import { FormikHelpers, FormikState } from 'formik/dist/types';
import { GraphQLFormattedError } from 'graphql/error';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Form, FormField, FormTextarea, Page } from '@/components';
import { Routes } from '@/consts';
import { useCreatePostMutation } from '@/graphql/mutations';
import { CreatePostInput } from '@/graphql/types';
import { Mapper } from '@/utils';

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
                flex={'1'}
                margin={'0 auto'}
            >
                <Heading textAlign={'center'}>New Post:</Heading>
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {(formState: FormikState<CreatePostInput> & FormikHandlers) => (
                        <Form
                            formState={formState}
                            error={globalError}
                            submitLabel={'Create'}
                            cancelLabel={'Back'}
                            submitBtnWidth={'200px'}
                            actionsAlignment={'flex-end'}
                            onCancel={() => router.back()}
                        >
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
                        </Form>
                    )}
                </Formik>
            </Box>
        </Page>
    );
};

export default CreatePost;
