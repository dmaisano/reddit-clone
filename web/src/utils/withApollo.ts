import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedPosts } from "../generated/graphql";
import { NextPageContext } from "next";
import { apolloClient } from "./apolloClient";

export default createWithApollo(apolloClient as any);
