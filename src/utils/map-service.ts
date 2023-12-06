import { FieldError } from '@/graphql/types';

class MapService {
    public toFormError(errors: FieldError[]) {
        return errors.reduce(
            (acc, error) => {
                acc[error.field] = error.message;
                return acc;
            },
            {} as Record<string, string>,
        );
    }
}

const mapService = new MapService();

export { mapService };
