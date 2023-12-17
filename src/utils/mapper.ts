import { RequestCookie } from '@edge-runtime/cookies';

import { FieldError } from '@/graphql/types';

class Mapper {
    static toFormError(errors: FieldError[]) {
        return errors.reduce(
            (acc, error) => {
                acc[error.field] = error.message;
                return acc;
            },
            {} as Record<string, string>,
        );
    }

    static toCookieString(cookies: RequestCookie[]) {
        return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
    }
}

export { Mapper };
