/* eslint-disable no-console */
import { customToast } from '@/components/base/toast';
import {
  ApolloClient,
  ApolloLink,
  gql,
  HttpLink,
  InMemoryCache,
  Observable,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// ----------------- GraphQL Mutation -----------------
const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAccessToken {
    refreshAccessToken {
      accessToken
    }
  }
`;

// ----------------- Utility Functions -----------------
const getToken = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Could not access localStorage:', error);
    return null;
  }
};

const saveToken = (key: string, token: string) => {
  try {
    localStorage.setItem(key, token);
  } catch (error) {
    console.error('Could not save token:', error);
  }
};

const refreshAccessToken = async (
  client: ApolloClient<any>,
): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      context: {
        headers: { authorization: `Bearer ${refreshToken}` },
      },
    });

    if (data?.refreshAccessToken?.accessToken) {
      saveToken('token', data.refreshAccessToken.accessToken);
      return data.refreshAccessToken.accessToken;
    }

    throw new Error('Failed to refresh token');
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

// ----------------- Apollo Links -----------------
const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'INVALID_TOKEN') {
          return new Observable((observer) => {
            refreshAccessToken(socket)
              .then((newToken) => {
                if (newToken) {
                  operation.setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      authorization: `Bearer ${newToken}`,
                    },
                  }));

                  forward(operation).subscribe(observer);
                } else {
                  observer.error(new Error('Could not refresh token'));
                }
              })
              .catch((err) => observer.error(err));
          });
        }
      }
    }

    if (networkError) {
      handleNetworkError(networkError);
    }
  },
);

const handleNetworkError = (networkError: Error) => {
  if (networkError.message.includes('Failed to fetch')) {
    customToast('لطفا اینترنت خود را چک کنید', 'error');
  } else if (networkError.message.includes('timeout')) {
    customToast('اتصال به سرور تایم‌اوت شده است، دوباره تلاش کنید', 'error');
  } else {
    customToast('مشکلی در سرور پیش آمد، لطفا دوباره امتحان کنید', 'error');
  }
};

const responseMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const headers = operation.getContext().response?.headers;
    const newRefreshToken = headers?.get('x-refresh-token');

    if (newRefreshToken) {
      saveToken('refreshToken', newRefreshToken);
    }

    return response;
  });
});

// ----------------- GraphQL HTTP & WebSocket Links -----------------
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_SOCKET_URL, // HTTP endpoint
  fetchOptions: { timeout: 5000 },
});

// Pass authorization to WebSocket during the connection
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_APP_SOCKET_WS_URL, // WS endpoint
    connectionParams: () => {
      const token = getToken();
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  }),
);

// Split traffic: Use WS for subscriptions, HTTP for queries/mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, responseMiddleware, httpLink]),
);

// ----------------- Apollo Client Initialization -----------------
export const socket = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
