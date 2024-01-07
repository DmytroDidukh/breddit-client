'use client';

import { Flex, Heading } from '@chakra-ui/react';

import { Page } from '@/components';
import { usePostsQuery } from '@/graphql/queries';

function Home() {
    const [postsResult] = usePostsQuery();

    return (
        <Page>
            <Heading>Posts</Heading>
            <Flex flexDirection={'column'} gap={24} flex={'1'}>
                {postsResult.data?.posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <h4>{post.author.username}</h4>
                        <p>{post.createdAt}</p>
                    </div>
                ))}
            </Flex>
        </Page>
    );
}

export default Home;
