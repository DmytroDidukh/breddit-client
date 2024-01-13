'use client';

import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import React from 'react';

import { InfoAlert, Page, PostItem } from '@/components';
import { usePostsByAuthorQuery } from '@/graphql/queries/posts-by-author.generated';
import { useUserQuery } from '@/graphql/queries/user.generated';
import { Post } from '@/graphql/types';
import { useAuth } from '@/hooks';
import { DateUtils } from '@/utils';

enum TABS {
    ABOUT,
    USER_POSTS,
}

interface UserDetailsProps {
    params: {
        id: string;
    };
}

const UserDetails: React.FC<UserDetailsProps> = ({ params }) => {
    const [tabIndex, setTabIndex] = React.useState(TABS.ABOUT);
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [{ data: userData }] = useUserQuery({
        variables: {
            userId: parseInt(params.id),
        },
    });
    const [{ data: postsData, fetching }, executePostsQuery] = usePostsByAuthorQuery({
        variables: {
            limit: 10,
            cursor,
            authorId: parseInt(params.id),
        },
        pause: tabIndex !== TABS.USER_POSTS,
    });
    const { user: me } = useAuth();

    if (!userData?.user) {
        return <InfoAlert message={'User not found'} show />;
    }

    const handleTabsChange = (index: TABS) => {
        setTabIndex(index);
    };

    const handleLoadMore = () => {
        setCursor(postsData?.postsByAuthor.pageInfo.endCursor || null);
        executePostsQuery();
    };

    return (
        <Page>
            <Flex alignItems={'center'} gap={'12px'}>
                <Avatar size={'lg'} name={userData.user.username} />
                <Flex flexDirection={'column'} gap={0}>
                    <Heading margin={0}>{userData.user.username}</Heading>
                    {me?.id === userData.user.id && (
                        <Text fontSize="md" color={'gray.500'}>
                            {me.email}
                        </Text>
                    )}
                    <Flex flexDirection={'row'} gap={'2px'}>
                        <Text color={'gray.500'} fontSize="xs">
                            Joined:
                        </Text>
                        <Text display={'inline'} color={'gray.100'} fontSize="xs">
                            {DateUtils.formatToLongDate(userData.user.createdAt)}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Tabs
                marginTop={'24px'}
                colorScheme={'orange'}
                index={tabIndex}
                onChange={handleTabsChange}
            >
                <TabList>
                    <Tab>About</Tab>
                    <Tab>Posts</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Text>About me: NOT IMPLEMENTED</Text>
                    </TabPanel>
                    <TabPanel>
                        {!!postsData?.postsByAuthor.items.length && (
                            <Stack spacing={'24px'} paddingBottom={'100px'}>
                                {postsData.postsByAuthor.items.map((p) => {
                                    const post = {
                                        ...p,
                                        author: userData.user,
                                    } as Post;

                                    return (
                                        <PostItem key={p.id} post={post} includeAuthor={false} />
                                    );
                                })}
                                {postsData?.postsByAuthor.pageInfo.hasNextPage && (
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
                        )}

                        {postsData?.postsByAuthor.items.length === 0 && (
                            <Box width={'300px'} margin={'100px auto'}>
                                <InfoAlert message={'No posts yet'} show />
                            </Box>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Page>
    );
};

export default UserDetails;
