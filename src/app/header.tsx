'use client';

// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Routes } from '@/consts';

function Header() {
    const router = useRouter();
    // const { colorMode, toggleColorMode } = useColorMode();
    const handleSignOut = () => {
        router.push(Routes.SIGN_IN);
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
            <Button
                size={'sm'}
                width={'80px'}
                colorScheme="teal"
                variant={'outline'}
                onClick={handleSignOut}
            >
                Sign out
            </Button>
        </Box>
    );
}

export default Header;
