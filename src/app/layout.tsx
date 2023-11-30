import React from 'react';

import Header from '@/app/header';

import type { Metadata } from 'next';

import ApiProvider from './api-provider';
import { ThemeProvider } from './theme-provider';

export const metadata: Metadata = {
    title: 'Breddit',
    description: 'Like Reddit, but better.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ApiProvider>
                    <ThemeProvider>
                        <Header />
                        {children}
                    </ThemeProvider>
                </ApiProvider>
            </body>
        </html>
    );
}
