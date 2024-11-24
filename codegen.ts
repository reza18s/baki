import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.baki.app/graphql',
  // schema: 'http://localhost:4000/graphql',
  documents: ['src/graphql/**/*.gql'],
  generates: {
    'src/graphql/generated/graphql.codegen.ts': {
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
