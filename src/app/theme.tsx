'use client';

import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react';
import React from 'react';
// Supports weights 100-900
import '@fontsource-variable/raleway';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Raleway', sans-serif`,
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({ colors, fonts, config });

export function Theme({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
