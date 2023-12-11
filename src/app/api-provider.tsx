'use client';

import React from 'react';
import { Client, dedupExchange, fetchExchange, Provider } from 'urql';

import { getCacheExtenge } from '@/utils';

const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [dedupExchange, getCacheExtenge(), fetchExchange],
    fetchOptions: {
        credentials: 'include',
    },
});

interface ApiProps {
    children: React.ReactNode;
}

const ApiProvider: React.FC<ApiProps> = ({ children }: ApiProps) => {
    return <Provider value={client}>{children}</Provider>;
};

export default ApiProvider;
