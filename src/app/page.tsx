'use client';

import { Box, Button, Link as ChakraLink, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { Page } from '@/components';
import { usePostsQuery } from '@/graphql/queries';

function Home() {
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [{ data, fetching }, reExecuteQuery] = usePostsQuery({
        variables: {
            limit: 10,
            cursor,
        },
    });

    const handleLoadMore = () => {
        const posts = data?.posts.posts;
        if (!posts) return;

        setCursor(data.posts.pageInfo.endCursor || null);
        reExecuteQuery();
    };

    console.log('DATA', data);

    return (
        <Page>
            <Heading marginBottom={'36px'}>Recent posts</Heading>
            <Stack spacing={'24px'}>
                {data?.posts.posts.map((post) => (
                    <Box
                        key={post.id}
                        p={'24px'}
                        shadow={'md'}
                        borderWidth={'1px'}
                        borderRadius={'4px'}
                    >
                        <Heading fontSize={'xl'}>
                            {post.title} <b>{post.id}</b>
                        </Heading>
                        <ChakraLink
                            as={Link}
                            href={`/user/${post.author.id}`}
                            color={'gray.500'}
                            fontSize={'sm'}
                        >
                            {post.author.username}
                        </ChakraLink>
                        <Text marginTop={'12px'}>{post.contentSnippet}</Text>
                    </Box>
                ))}
                {data?.posts && (
                    <Button
                        margin={'0 auto'}
                        size={'sm'}
                        variant={'outline'}
                        colorScheme={'gray'}
                        isLoading={fetching}
                        onClick={handleLoadMore}
                    >
                        Load more
                    </Button>
                )}
            </Stack>
        </Page>
    );
}

export default Home;
