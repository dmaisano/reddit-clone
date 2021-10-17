import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { NextPageContext } from "next";
import { PaginatedPosts } from "../generated/graphql";
import { getAccessToken } from "./token";

// ? reference: https://www.apollographql.com/docs/react/v2/networking/authentication/#header
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: typeof window !== "undefined" && getAccessToken(),
    },
  }));

  return forward(operation);
});

export const apolloClient = (ctx: NextPageContext) =>
  new ApolloClient({
    // uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    // headers: {
    //   cookie:
    //     (typeof window === "undefined"
    //       ? ctx?.req?.headers.cookie
    //       : undefined) || "",
    // },
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
