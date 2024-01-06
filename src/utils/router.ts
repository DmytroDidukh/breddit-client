import { PublicRoutes, Routes } from '@/consts';

const extractPathRoot = (pathname: string): string => {
    return pathname.split('/').filter(Boolean)[0];
};

export const isPublicRoute = (pathname: string): boolean => {
    const pathRoot = extractPathRoot(pathname);

    return PublicRoutes.some((publicRoute) => {
        return publicRoute.startsWith(`/${pathRoot}`);
    });
};

export const checkRouteMatch = (pathname: string): boolean => {
    const dynamicRouteRegex = /\[.*?\]/g; // Regex to identify dynamic parts in route

    for (const route in Routes) {
        const currentRoute = Routes[route as keyof typeof Routes];

        if (dynamicRouteRegex.test(currentRoute)) {
            // If the route is dynamic, replace the dynamic parts with a regex pattern
            const regexPattern = currentRoute.replace(dynamicRouteRegex, '.*');
            const regex = new RegExp(`^${regexPattern}$`);

            if (regex.test(pathname)) {
                return true;
            }
        } else if (pathname === currentRoute) {
            return true;
        }
    }

    return false;
};
