import { customToast } from '@/components/base/toast';
import {
  ApolloClient,
  ApolloLink,
  gql,
  HttpLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAccessToken {
    refreshAccessToken {
      accessToken
    }
  }
`;
const DELETE_DEVICE_TOKEN = gql`
  mutation DeleteDeviceToken($deviceToken: String!) {
    deleteDeviceToken(deviceToken: $deviceToken)
  }
`;
// Utility to safely retrieve the token from localStorage
const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Could not access localStorage:', error);
    return null;
  }
};

// Utility to save tokens
const saveToken = (token: string) => {
  try {
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Could not save token:', error);
  }
};

// Function to refresh the access token
export const refreshAccessToken = async (client: ApolloClient<any>) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refreshToken },
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    });

    if (!data || !data.refreshAccessToken) {
      throw new Error('Failed to refresh token');
    }

    saveToken(data.refreshAccessToken.accessToken);
    return data.refreshAccessToken.accessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null;
  }
};

// Middleware to set the Authorization header
const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      ...headers,
    },
  }));

  return forward(operation);
});

// Error handling link
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // @ts-expect-error the
        if (err.code === 'INVALID_TOKEN') {
          return new Observable((observer) => {
            refreshAccessToken(client) // Pass client as argument
              .then((newToken) => {
                if (newToken) {
                  operation.setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      authorization: `Bearer ${newToken}`,
                    },
                  }));

                  forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  });
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

// Utility function for network errors
const handleNetworkError = (networkError: any) => {
  if (networkError.message === 'Failed to fetch') {
    customToast('لطفا اینترنت خود را چک کنید', 'error');
  } else if (networkError.message.includes('timeout')) {
    customToast('اتصال به سرور تایم‌اوت شده است، دوباره تلاش کنید', 'error');
  } else {
    customToast(`مشکلی در سرور پیش امد لطفا دوباره امتحان کنیید`, 'error');
  }
};

// HttpLink for the GraphQL endpoint
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_BASE_URL,
  fetchOptions: {
    timeout: 5000,
  },
});

// Response middleware to handle refresh token storage
const responseMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const headers = operation.getContext().response.headers;
    const authHeader = headers.get('x-refresh-token');
    if (authHeader) {
      localStorage.setItem('refreshToken', authHeader);
    }

    return response;
  });
});
export const clientLogout = () => {
  const token = getToken();
  const deviceToken = localStorage.getItem('deviceToken');
  if (deviceToken) {
    client.mutate({
      mutation: DELETE_DEVICE_TOKEN,
      variables: {
        deviceToken,
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  }
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.reload();
};

// Combine all ApolloLinks
const link = ApolloLink.from([
  errorLink,
  authLink,
  responseMiddleware,
  httpLink,
]);

// Initialize Apollo Client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
