'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Routes } from '@/consts';
import { useMeQuery } from '@/graphql/queries';
import { User } from '@/graphql/types';
import { isPublicRoute } from '@/utils';

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
    const pathname = usePathname();

    React.useEffect(() => {
        if (!fetching && error && !isPublicRoute(pathname)) {
            router.push(Routes.SIGN_IN);
        }
    }, [fetching, error, router, pathname]);

    if (fetching) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{ user: data?.me || null, isAuthenticated: !!data?.me, fetching }}
        >
            {children}
        </AuthContext.Provider>
    );
}
