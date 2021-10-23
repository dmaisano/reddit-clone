import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { PaginatedPosts } from "./generated/graphql";
import { getAccessToken } from "./utils/token";

const API_URL = process.env.REACT_APP_PUBLIC_API;

// ? reference: https://www.apollographql.com/docs/react/v2/networking/authentication/#header
const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${getAccessToken()}`,
    },
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    alert(graphQLErrors[0].message);
    return window.location.reload();
  }

  if (networkError) {
    alert(networkError.message);
    return window.location.reload();
  }
});

export const apolloClient = new ApolloClient({
  // link: concat(authLink, httpLink),
  link: errorLink.concat(authLink.concat(httpLink) as any) as any,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(
              existing: PaginatedPosts | undefined,
              incoming: PaginatedPosts,
            ): PaginatedPosts {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
});
