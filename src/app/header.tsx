'use client';

// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Routes } from '@/consts';
import { useSignOutMutation } from '@/graphql/mutations';
import { useAuth } from '@/hooks';

function Header() {
    const [signOutResult, executeSignOut] = useSignOutMutation();
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, fetching } = useAuth();
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
            backgroundColor={'#121212'}
            position={'sticky'}
            top={0}
            as={'header'}
            zIndex={1}
        >
            <Link href={Routes.HOME}>
                {/* TODO: Fix color mode colors for text */}
                <Heading>Breddit</Heading>
            </Link>
            {/* TODO: Disabled due it requires setting up all used components */}
            {/* <IconButton */}
            {/*   aria-label="Color mode" */}
            {/*   colorScheme={'teal'} */}
            {/*   icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />} */}
            {/*   onClick={toggleColorMode} */}
            {/* /> */}
            {!fetching && (
                <>
                    {user && (
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
                                <Link href={`/user/${user.id}`}>
                                    <Avatar name={user.username} size="sm" />
                                </Link>
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
                    {!isAuthenticated && pathname !== Routes.SIGN_IN && (
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
