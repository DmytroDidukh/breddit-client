import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:4000/graphql',
    documents: 'src/graphql/**/*.graphql',
    generates: {
        'src/gql/graphql.ts': { plugins: ['typescript'] },
        'src/graphql': {
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.generated.tsx',
                baseTypesPath: '../gql/graphql.ts', // Adjust the relative path as necessary
            },
            plugins: ['typescript-operations', 'typescript-urql'],
        },
    },
};

export default config;
