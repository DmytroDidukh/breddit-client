import { Box } from '@chakra-ui/react';
import React, { Suspense } from 'react';

interface PageProps {
    variant?: 'small' | 'regular';
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ variant = 'regular', children }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box
                as={'main'}
                p={'50px'}
                margin={'auto'}
                width={'100%'}
                minHeight={'calc(100% - 60px)'}
                maxW={variant === 'regular' ? '1200px' : '400px'}
                display={'flex'}
                flexDirection={'column'}
                borderLeftWidth="1px"
                borderRightWidth="1px"
                borderColor="gray.700"
            >
                {children}
            </Box>
        </Suspense>
    );
};

export default Page;
