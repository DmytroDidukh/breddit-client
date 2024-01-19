'use client';

import { Button, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

import { Page, PostItem } from '@/components';
import { useVoteMutation } from '@/graphql/mutations';
import { usePostsQuery } from '@/graphql/queries';

function Home() {
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [{ data, fetching }, executeQuery] = usePostsQuery({
        variables: {
            limit: 10,
            cursor,
        },
    });
    const [, executeVote] = useVoteMutation();

    const handleLoadMore = () => {
        setCursor(data?.posts.pageInfo.endCursor || null);
        executeQuery();
    };

    const handleVote = async (postId: number, value: number) => {
        await executeVote({
            postId,
            value,
        });
    };

    return (
        <Page>
            <Heading marginBottom={'36px'}>Recent posts</Heading>
            <Stack spacing={'24px'} paddingBottom={'100px'}>
                {data?.posts.items.map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                        includeVoting
                        includeAuthor
                        onVote={handleVote}
                    />
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
