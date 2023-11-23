import React from 'react';

import Header from '@/app/header';
import { Theme } from '@/app/theme';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breddit',
  description: 'Like Reddit, but better.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  );
}
