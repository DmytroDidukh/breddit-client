'use client';

import { Link as ChakraLink, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { Page } from '@/components';
import { Routes } from '@/consts';

// TODO: Fix not found handling. Context: My AuthProvider is not working properly.
//  MeQuery breaks everything. Consider authExchange in urql use instead of AuthProvider.
const NotFound: React.FC = () => {
    return (
        <Page>
            <Flex
                flex={'1'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Heading>Page not found</Heading>
                <ChakraLink as={Link} href={Routes.HOME} color="teal.500">
                    Back to home
                </ChakraLink>
            </Flex>
        </Page>
    );
};

export default NotFound;
// import Link from 'next/link'
//
// export default function NotFound() {
//   console.log('NOT FOUND');
//   return (
//     <div>
//       <h2>Not Found</h2>
//       <p>Could not find requested resource</p>
//       <Link href="/">Return Home</Link>
//     </div>
//   )
// }
