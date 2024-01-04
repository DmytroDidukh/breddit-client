import { PublicRoutes } from '@/consts';

export const isPublicRoute = (pathname: string): boolean => {
    const pathRoot = pathname.split('/')[0];
    return PublicRoutes.some((publicRoute) => {
        return publicRoute.startsWith(pathRoot);
    });
};
