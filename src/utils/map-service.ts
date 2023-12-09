import { FieldError } from '@/graphql/types';

class MapService {
    static toFormError(errors: FieldError[]) {
        return errors.reduce(
            (acc, error) => {
                acc[error.field] = error.message;
                return acc;
            },
            {} as Record<string, string>,
        );
    }
}

export { MapService };
