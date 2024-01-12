'use client';

import { RequestCookie } from '@edge-runtime/cookies';
import { UrqlProvider } from '@urql/next';
import React from 'react';

import { createUrqlClient } from '@/lib';

import { AuthProvider } from './auth-provider';
import Header from './header';
import { ThemeProvider } from './theme-provider';

function Layout({ children, cookies }: { children: React.ReactNode; cookies: RequestCookie[] }) {
    const { client, ssr } = React.useMemo(() => createUrqlClient(cookies), []);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            <ThemeProvider>
                {/* TODO: Suspense breaks fetching posts and re-render page but with it  */}
                {/* not-found page and such is not working */}
                {/* <Suspense> */}
                <AuthProvider>
                    <Header />
                    {children}
                </AuthProvider>
                {/* </Suspense> */}
            </ThemeProvider>
        </UrqlProvider>
    );
}

export default Layout;
