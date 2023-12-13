'use client';

// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Routes } from '@/consts';
import { useSignOutMutation } from '@/graphql/mutations/sign-out.generated';
import { useMeQuery } from '@/graphql/queries/me.generated';

function Header() {
    const [{ fetching }, executeSignOut] = useSignOutMutation();
    const [result] = useMeQuery();
    const router = useRouter();
    const pathname = usePathname();
    // const { colorMode, toggleColorMode } = useColorMode();

    const redirectToSignIn = () => {
        router.push(Routes.SIGN_IN);
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
            {result.data?.me && (
                <Flex alignItems={'center'} gap={'12px'}>
                    <Text as={'b'}>{result.data.me.username}</Text>
                    <Button
                        size={'sm'}
                        width={'80px'}
                        colorScheme="teal"
                        variant={'outline'}
                        onClick={handleSignOut}
                        isLoading={fetching}
                    >
                        Sign out
                    </Button>
                </Flex>
            )}
            {pathname !== Routes.SIGN_IN && !result.data?.me && (
                <Button
                    size={'sm'}
                    width={'80px'}
                    colorScheme="teal"
                    variant={'outline'}
                    onClick={redirectToSignIn}
                    isLoading={fetching}
                >
                    Sign in
                </Button>
            )}
        </Box>
    );
}

export default Header;
