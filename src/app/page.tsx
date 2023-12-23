'use client';

import { Flex, Heading } from '@chakra-ui/react';

import { Page } from '@/components';
import { usePostsQuery } from '@/graphql/queries';

function Home() {
    const [postsResult] = usePostsQuery();

    return (
        <Page>
            <Heading>Posts</Heading>
            <Flex flexDirection={'column'} gap={24}>
                {postsResult.data?.posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.createdAt}</p>
                    </div>
                ))}
            </Flex>
        </Page>
    );
}

export default Home;
