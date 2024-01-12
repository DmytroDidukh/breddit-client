'use client';

import {
    Avatar,
    Box,
    Button,
    Link as ChakraLink,
    Flex,
    Heading,
    Stack,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { Page } from '@/components';
import { usePostsQuery } from '@/graphql/queries';

function Home() {
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [{ data, fetching }, executeQuery] = usePostsQuery({
        variables: {
            limit: 10,
            cursor,
        },
    });

    const handleLoadMore = () => {
        setCursor(data?.posts.pageInfo.endCursor || null);
        executeQuery();
    };

    return (
        <Page>
            <Heading marginBottom={'36px'}>Recent posts</Heading>
            <Stack spacing={'24px'} paddingBottom={'100px'}>
                {data?.posts.items.map((post) => (
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
                            <Flex alignItems={'center'} gap={'4px'}>
                                <Avatar name={post.author.username} size="2xs" />
                                {post.author.username}
                            </Flex>
                        </ChakraLink>
                        <Text marginTop={'12px'}>{post.contentSnippet}</Text>
                    </Box>
                ))}
                {data?.posts.pageInfo.hasNextPage && (
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
