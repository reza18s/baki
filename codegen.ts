import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Define both schemas for different servers
  schema: [
    { 'http://localhost:4000/graphql': {} },
    { 'http://localhost:4001/graphql': {} },
  ],
  documents: ['src/graphql/**/*.gql'], // Path to your queries/mutations
  generates: {
    // First endpoint: http://localhost:4000/graphql
    'src/graphql/generated/graphql.codegen.ts': {
      schema: 'http://localhost:4000/graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        skipTypename: true,
        withHOC: false,
        withComponent: false,
        verbose: true,
      },
    },
  },
};

export default config;
