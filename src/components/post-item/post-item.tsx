import { Avatar, Box, Link as ChakraLink, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { Separator } from '@/components';
import { Post } from '@/graphql/types';
import { DateUtils } from '@/utils';

interface PostItemProps {
    post: Omit<Post, 'content'>;
    includeAuthor?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post, includeAuthor = true }) => {
    return (
        <Box key={post.id} p={'24px'} shadow={'md'} borderWidth={'1px'} borderRadius={'4px'}>
            <Flex alignItems={'center'} gap={'2px'}>
                <Heading fontSize={'2xl'}>{post.title}</Heading>
                {includeAuthor && post.author && (
                    <ChakraLink
                        as={Link}
                        href={`/user/${post.author.id}`}
                        color={'gray.500'}
                        fontSize={'sm'}
                        marginLeft={'8px'}
                    >
                        <Flex alignItems={'center'} gap={'4px'}>
                            <Avatar name={post.author.username} size="2xs" />
                            <Text fontSize={'xs'}>{post.author.username}</Text>
                        </Flex>
                    </ChakraLink>
                )}
                <Separator />
                <Text fontSize={'xs'} color={'gray.500'}>
                    {DateUtils.formatToRelativeTime(post.createdAt)}{' '}
                </Text>
            </Flex>

            <Divider marginTop={'5px'} />
            <Text marginTop={'12px'}>{post.contentSnippet}</Text>
        </Box>
    );
};

export default PostItem;
