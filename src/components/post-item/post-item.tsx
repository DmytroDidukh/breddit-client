import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Link as ChakraLink,
    Divider,
    Flex,
    Heading,
    IconButton,
    Stack,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { Separator } from '@/components';
import { UserBasicPublicFragment } from '@/graphql/fragments';
import { Post } from '@/graphql/types';
import { DateUtils } from '@/utils';

interface PostItemProps {
    post: Omit<Post, 'content' | 'author'> & { author: UserBasicPublicFragment };
    includeVoting: boolean;
    includeAuthor: boolean;
    onVote?: (value: number, postId: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({
    post,
    includeAuthor = true,
    includeVoting,
    onVote,
}) => {
    return (
        <Box p={'24px'} shadow={'md'} borderWidth={'1px'} borderRadius={'4px'}>
            <Flex gap={'12px'}>
                {includeVoting && (
                    <Flex flexDirection={'column'} alignItems={'center'}>
                        <IconButton
                            isRound
                            aria-label="Vote up"
                            size={'sm'}
                            icon={<ChevronUpIcon width={'20px'} height={'20px'} />}
                            backgroundColor={'transparent'}
                            onClick={() => onVote?.(1, post.id)}
                        />
                        <Text fontSize={'xl'}>{post.points}</Text>
                        <IconButton
                            isRound
                            aria-label="Vote down"
                            size={'sm'}
                            icon={<ChevronDownIcon width={'25px'} height={'25px'} />}
                            backgroundColor={'transparent'}
                            onClick={() => onVote?.(1, post.id)}
                        />
                    </Flex>
                )}

                <Stack flex={'1'} divider={<Divider />}>
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
                    <Text>{post.contentSnippet}</Text>
                </Stack>
            </Flex>
        </Box>
    );
};

export default PostItem;
