'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Routes } from '@/consts';
import { useMeQuery } from '@/graphql/queries';
import { User } from '@/graphql/types';
import { checkRouteMatch, isPublicRoute } from '@/utils';

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
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = !!data?.me;

    React.useEffect(() => {
        if (!checkRouteMatch(pathname)) {
            // Auto-redirect to not found page
            return;
        }

        if (!fetching && !isAuthenticated && !isPublicRoute(pathname)) {
            router.push(`${Routes.SIGN_IN}?returnTo=${pathname}`);
        } else if (isAuthenticated && isPublicRoute(pathname)) {
            router.push(Routes.HOME);
        }
    }, [fetching, isAuthenticated, router, pathname]);

    const authContextValue = React.useMemo(
        () => ({
            user: data?.me || null,
            isAuthenticated,
            fetching,
        }),
        [data?.me, fetching],
    );

    if (fetching) {
        return null;
    }

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
