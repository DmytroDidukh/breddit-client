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
      mb={'50px'}
      mx={'auto'}
      width={'100%'}
      maxW={variant === 'regular' ? '1200px' : '400px'}
      borderLeftWidth="1px"
      borderRightWidth="1px"
      borderColor="gray.700"
    >
      {children}
    </Box>
  );
};

export default Page;
