import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

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
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Call the refresh token endpoint
    const response = await fetch('http://localhost:3000/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to refresh token');
    }

    // Save the new token and return it
    saveToken(data.accessToken);
    return data.accessToken;
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
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

// Error handling link to detect 401 errors and refresh the token
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          // Token is expired or invalid
          return new Observable((observer) => {
            refreshAccessToken()
              .then((newToken) => {
                if (newToken) {
                  // Update the operation with the new token
                  operation.setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      authorization: `Bearer ${newToken}`,
                    },
                  }));

                  // Retry the request
                  forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  });
                } else {
                  observer.error(new Error('Could not refresh token'));
                }
              })
              .catch((err) => {
                observer.error(err);
              });
          });
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  },
);

// HttpLink for the GraphQL endpoint
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:3000/graphql',
});

// Combine the links
const link = ApolloLink.from([errorLink, authLink, httpLink]);

// Initialize Apollo Client with the combined link
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
