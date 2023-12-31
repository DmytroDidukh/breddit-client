'use client';

// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Routes } from '@/consts';
import { useSignOutMutation } from '@/graphql/mutations';
import { useMeQuery } from '@/graphql/queries';

function Header() {
    const [signOutResult, executeSignOut] = useSignOutMutation();
    const [meResult] = useMeQuery();
    const router = useRouter();
    const pathname = usePathname();
    // const { colorMode, toggleColorMode } = useColorMode();

    const redirectToSignIn = () => {
        router.push(Routes.SIGN_IN);
    };

    const redirectToCreatePost = () => {
        router.push(Routes.CREATE_POST);
    };

    const handleSignOut = async () => {
        await executeSignOut({});
        redirectToSignIn();
    };

    return (
        <Box
            height={'60px'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={'0 20px'}
            borderBottomWidth={'1px'}
            borderColor="gray.700"
            position={'sticky'}
            top={0}
        >
            {/* TODO: Fix color mode colors for text */}
            <Heading>Breddit</Heading>
            {/* TODO: Disabled due it requires setting up all used components */}
            {/* <IconButton */}
            {/*   aria-label="Color mode" */}
            {/*   colorScheme={'teal'} */}
            {/*   icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />} */}
            {/*   onClick={toggleColorMode} */}
            {/* /> */}
            {!meResult.fetching && (
                <>
                    {meResult.data?.me && (
                        <Flex gap={'24px'}>
                            {pathname !== Routes.SIGN_IN && pathname !== Routes.CREATE_POST && (
                                <Button
                                    size={'sm'}
                                    width={'120px'}
                                    colorScheme="orange"
                                    onClick={redirectToCreatePost}
                                >
                                    <PlusSquareIcon mr={1} />
                                    Create post
                                </Button>
                            )}

                            <Flex alignItems={'center'} gap={'12px'}>
                                <Text as={'b'}>{meResult.data.me.username}</Text>
                                <Button
                                    size={'sm'}
                                    width={'80px'}
                                    colorScheme="teal"
                                    variant={'outline'}
                                    onClick={handleSignOut}
                                    isLoading={signOutResult.fetching}
                                >
                                    Sign out
                                </Button>
                            </Flex>
                        </Flex>
                    )}
                    {!meResult.data?.me && (
                        <Button
                            size={'sm'}
                            width={'80px'}
                            colorScheme="teal"
                            variant={'outline'}
                            onClick={redirectToSignIn}
                        >
                            Sign in
                        </Button>
                    )}
                </>
            )}
        </Box>
    );
}

export default Header;
