import React from 'react';

import type { Metadata } from 'next';

import Layout from './_layout';

export const metadata: Metadata = {
    title: 'Breddit',
    description: 'Like Reddit, but better.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
