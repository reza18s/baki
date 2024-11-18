import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

let authorizationHeader = (() => {
  try {
    return localStorage.getItem('token') || '';
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return '';
  }
})();

const saveAuthHeaderAsync = async () => {
  try {
    localStorage.setItem('token', authorizationHeader);
  } catch (error) {
    console.error('Error saving auth header to localStorage:', error);
  }
};

export const clientLogout = () => {
  authorizationHeader = '';
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing auth header from localStorage:', error);
  }
};

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: authorizationHeader ? `Bearer ${authorizationHeader}` : '',
    },
  }));
  return forward(operation);
});

const responseMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const headers = operation.getContext().response?.headers;
    const authHeader = headers?.get('authorization');
    if (authHeader) {
      authorizationHeader = authHeader;
      saveAuthHeaderAsync();
    }
    return response;
  });
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:3000/graphql',
});

const link = ApolloLink.from([
  middlewareAuthLink,
  responseMiddleware,
  httpLink,
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
