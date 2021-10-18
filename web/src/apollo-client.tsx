import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { PaginatedPosts } from "./generated/graphql";
import { getAccessToken } from "./utils/token";

const API_URL = process.env.REACT_APP_PUBLIC_API;

// ? reference: https://www.apollographql.com/docs/react/v2/networking/authentication/#header
const httpLink = createHttpLink({
  uri: API_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getAccessToken(),
    },
  }));

  return forward(operation);
});

export const apolloClient = () =>
  new ApolloClient({
    link: concat(authMiddleware, httpLink),
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
