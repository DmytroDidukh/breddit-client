import { cookies } from 'next/headers';
import React from 'react';

import type { Metadata } from 'next';

import Layout from './_layout';
import './global.css';

export const metadata: Metadata = {
    title: 'Breddit',
    description: 'Like Reddit, but better.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const cookiesStore = cookies();

    return (
        <html lang="en">
            <body>
                <Layout cookies={cookiesStore.getAll()}>{children}</Layout>
            </body>
        </html>
    );
}
