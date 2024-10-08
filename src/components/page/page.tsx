import { Box } from '@chakra-ui/react';
import React from 'react';

interface PageProps {
    variant?: 'small' | 'regular';
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ variant = 'regular', children }) => {
    return (
        <Box
            as={'main'}
            p={'50px'}
            margin={'auto'}
            width={'100%'}
            minHeight={'calc(100vh - 60px)'}
            maxW={variant === 'regular' ? '1000px' : '400px'}
            display={'flex'}
            flexDirection={'column'}
            borderLeftWidth="1px"
            borderRightWidth="1px"
            borderColor="gray.700"
        >
            {children}
        </Box>
    );
};

export default Page;
