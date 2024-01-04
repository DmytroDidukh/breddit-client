export enum Routes {
    HOME = '/',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    FORGOT_PASSWORD = '/forgot-password',
    CHANGE_PASSWORD = '/change-password/[token]',
    CREATE_POST = '/create-post',
}

export const PublicRoutes = [
    Routes.SIGN_IN,
    Routes.SIGN_UP,
    Routes.FORGOT_PASSWORD,
    Routes.CHANGE_PASSWORD,
];
