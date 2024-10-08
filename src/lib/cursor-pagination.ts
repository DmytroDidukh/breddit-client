import { stringifyVariables } from '@urql/core';
import { NullArray, Resolver, Variables } from '@urql/exchange-graphcache';

import { PageInfo } from '@/graphql/types';

interface PaginationParams {
    cursorArgument?: string;
    limitArgument?: string;
    mergeMode?: 'after' | 'before';
}

function compareArgs(
    fieldArgs: Variables,
    connectionArgs: Variables,
    { cursorArgument = 'cursor', limitArgument = 'limit' }: PaginationParams,
): boolean {
    for (const key in connectionArgs) {
        if (key === cursorArgument || key === limitArgument) {
            continue;
        } else if (!(key in fieldArgs)) {
            return false;
        }

        const argA = fieldArgs[key];
        const argB = connectionArgs[key];

        if (
            typeof argA !== typeof argB || typeof argA !== 'object'
                ? argA !== argB
                : stringifyVariables(argA) !== stringifyVariables(argB)
        ) {
            return false;
        }
    }

    for (const key in fieldArgs) {
        if (key === cursorArgument || key === limitArgument) {
            continue;
        }
        if (!(key in connectionArgs)) return false;
    }

    return true;
}

const cursorPagination = (
    paginationParams: PaginationParams,
    resultTypename: string,
): Resolver<any, any, any> => {
    const { mergeMode = 'after' } = paginationParams;

    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((_info) => _info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }

        const visited = new Set();
        let result: NullArray<string> = [];
        let pageInfo: PageInfo | null = null;

        for (let i = 0; i < size; i++) {
            const { fieldKey, arguments: args } = fieldInfos[i];
            if (args === null || !compareArgs(fieldArgs, args, paginationParams)) {
                continue;
            }

            const data = cache.resolve(entityKey, fieldKey) as {
                __typename: string;
                items: string[];
                pageInfo: PageInfo;
            };
            if (!data) {
                continue;
            }

            pageInfo = cache.resolve(data, 'pageInfo') as PageInfo;
            // Extract the "items" array from the data
            const links = cache.resolve(data, 'items') as string[];
            if (links === null || links.length === 0) {
                continue;
            }

            const tempResult: NullArray<string> = [];

            for (let j = 0; j < links.length; j++) {
                const link = links[j];
                if (visited.has(link)) continue;
                tempResult.push(link);
                visited.add(link);
            }

            if (mergeMode === 'after') {
                result = [...result, ...tempResult];
            } else {
                result = [...tempResult, ...result];
            }
        }

        const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
        if (!hasCurrentPage) {
            if (!(info as any).store.schema) {
                return undefined;
            } else {
                info.partial = true;
            }
        }

        return {
            __typename: resultTypename,
            items: result,
            pageInfo: {
                __typename: 'PageInfo',
                ...(pageInfo || null),
            },
        };
    };
};

export { cursorPagination };
