'use client';

import { RequestCookie } from '@edge-runtime/cookies';
import { UrqlProvider } from '@urql/next';
import React, { Suspense } from 'react';

import { createUrqlClient } from '@/lib';

import Header from './header';
import { ThemeProvider } from './theme-provider';

function Layout({ children, cookies }: { children: React.ReactNode; cookies: RequestCookie[] }) {
    const { client, ssr } = React.useMemo(() => createUrqlClient(cookies), []);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            <ThemeProvider>
                <Suspense>
                    <Header />
                </Suspense>
                {children}
            </ThemeProvider>
        </UrqlProvider>
    );
}

export default Layout;
