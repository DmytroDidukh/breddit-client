import { PublicRoutes } from '@/consts';

const extractPathRoot = (pathname: string): string => {
    return pathname.split('/').filter(Boolean)[0];
};

export const isPublicRoute = (pathname: string): boolean => {
    const pathRoot = extractPathRoot(pathname);

    return PublicRoutes.some((publicRoute) => {
        return publicRoute.startsWith(`/${pathRoot}`);
    });
};
