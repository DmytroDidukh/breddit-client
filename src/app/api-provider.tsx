'use client';

import React from 'react';
import { cacheExchange, Client, fetchExchange, Provider } from 'urql';

const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [cacheExchange, fetchExchange],
});

interface ApiProps {
    children: React.ReactNode;
}

const ApiProvider: React.FC<ApiProps> = ({ children }: ApiProps) => {
    return <Provider value={client}>{children}</Provider>;
};

export default ApiProvider;
