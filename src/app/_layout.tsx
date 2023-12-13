'use client';

import { UrqlProvider } from '@urql/next';
import React from 'react';

import { createUrqlClient } from '@/lib';

import Header from './header';
import { ThemeProvider } from './theme-provider';

function Layout({ children }: { children: React.ReactNode }) {
    const { client, ssr } = React.useMemo(() => createUrqlClient(), []);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            <ThemeProvider>
                <Header />
                {children}
            </ThemeProvider>
        </UrqlProvider>
    );
}

export default Layout;
