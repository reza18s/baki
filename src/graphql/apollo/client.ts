import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

// Safely retrieve the token from localStorage
const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Could not access localStorage:", error);
    return null;
  }
};

// Middleware to set the Authorization header
const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

// HttpLink for the GraphQL endpoint
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

// Combine the authLink and httpLink
const link = ApolloLink.from([authLink, httpLink]);

// Initialize Apollo Client with the combined link
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
