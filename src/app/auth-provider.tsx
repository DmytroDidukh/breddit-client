'use client';

import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Routes } from '@/consts';
import { useMeQuery } from '@/graphql/queries';
import { User } from '@/graphql/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    fetching: boolean;
}

const defaultAuthContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    fetching: true,
};

export const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [{ data, fetching, error }] = useMeQuery();
    const router = useRouter();

    React.useEffect(() => {
        if (!fetching && error) {
            router.push(Routes.SIGN_IN);
        }
    }, [fetching, error, router]);

    if (fetching) {
        return (
            <Flex width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
                <Heading size={'lg'}>Loading...</Heading>
            </Flex>
        );
    }

    console.log('data', data);

    return (
        <AuthContext.Provider
            value={{ user: data?.me || null, isAuthenticated: !!data?.me, fetching }}
        >
            {children}
        </AuthContext.Provider>
    );
}
