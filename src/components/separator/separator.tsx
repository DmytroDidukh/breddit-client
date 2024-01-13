import { Box, Circle } from '@chakra-ui/react';
import React from 'react';

interface SeparatorProps {
    dimensions?: string | number;
    color?: string;
}

const Separator: React.FC<SeparatorProps> = ({ dimensions = '4px', color = 'gray.500' }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box flex="1" height="1px" bg={color} />
            <Circle size={dimensions} bg={color} mx={2} />
            <Box flex="1" height="1px" bg={color} />
        </Box>
    );
};

export default Separator;
