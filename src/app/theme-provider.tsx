'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import {
    ChakraProvider,
    ColorModeScript,
    extendTheme,
    StyleFunctionProps,
    type ThemeConfig,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import React from 'react';
// Supports weights 100-900
import '@fontsource-variable/raleway';

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('white', 'grey.800')(props),
        },
    }),
};

const fonts = {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
};

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

export const theme = extendTheme({ styles, fonts, config });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            {/* TODO: Add color mode toggle and fix script error */}
            {/* https://chakra-ui.com/docs/styled-system/color-mode */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} type={'cookie'} />
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
    );
}
