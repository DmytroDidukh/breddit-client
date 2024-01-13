'use client';

import { Button, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

import { Page, PostItem } from '@/components';
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
                {data?.posts.items.map((post) => <PostItem key={post.id} post={post} />)}
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
