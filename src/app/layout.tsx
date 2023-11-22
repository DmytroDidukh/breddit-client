import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';

import { theme, Theme } from '@/app/theme';

import type { Metadata } from 'next';
// import './globals.css';

export const metadata: Metadata = {
  title: 'Breddit',
  description: 'Like Reddit, but better.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
