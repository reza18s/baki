import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Define both schemas for different servers
  schema: [
    { 'http://localhost:4000/graphql': {} },
    { 'http://localhost:4001/graphql': {} },
    // { 'https://subs.baki.app/graphql': {} },
    // { 'https://api.baki.app/graphql': {} },
  ],
  documents: ['src/graphql/**/*.gql'], // Path to your queries/mutations
  generates: {
    // First endpoint: http://localhost:4000/graphql
    'src/graphql/generated/graphql.codegen.ts': {
      schema: 'http://localhost:4000/graphql',
      // schema: 'https://api.baki.app/graphql',
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
    // Second endpoint: http://localhost:4001/graphql
    'src/graphql/generated/graphql.codegen.socket.ts': {
      schema: 'http://localhost:4001/graphql',
      // schema: 'https://subs.baki.app/graphql',
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
        apolloClientInstanceImport: './src/graphql/apollo/socket.ts', // Path to the client file
        apolloClientInstanceExport: 'socket',
      },
    },
  },
};

export default config;
